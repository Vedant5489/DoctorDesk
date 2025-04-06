<?php
// Allow all origins
header("Access-Control-Allow-Origin: *");

// Allow specific methods (e.g., POST, GET, OPTIONS)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow specific headers (e.g., Content-Type, Authorization)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle pre-flight requests (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include the connection file
include('../resources/connection.php');

// Set the content type to application/json
header("Content-Type: application/json");

// Get the JSON data from the request body
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

function generateDoctorId($lastId, $conn) {
    // Extract the letters and numbers from the last ID
    $letters = substr($lastId, 0, 4);  // The first 4 characters (letters)
    $numbers = substr($lastId, 4);  // The last 4 characters (numbers)

    // Check if the number part is 9999
    if ($numbers == '9999') {
        // Increment the letters part (e.g., AAAAA -> BBBBB)
        $letters = incrementLetters($letters);
        // Reset the number part to 0000
        $numbers = '0000';
    } else {
        // Increment the numbers by 1 and pad to 4 digits (e.g., 0001, 0002, ...)
        $numbers = str_pad((int)$numbers + 1, 4, '0', STR_PAD_LEFT);
    }

    // Generate the new ID
    $newId = $letters . $numbers;

    // Check if the new ID already exists in the database
    $query = "SELECT * FROM doctors WHERE D_id = '$newId'";
    $result = mysqli_query($conn, $query);

    // If the new ID already exists, generate a new one
    if (mysqli_num_rows($result) > 0) {
        return generateDoctorId($newId, $conn);
    } else {
        // Return the new ID
        return $newId;
    }
}

function incrementLetters($letters) {
    $lastChar = substr($letters, -1);
    $newChar = chr(ord($lastChar) + 1);
    return substr($letters, 0, -1) . $newChar;
}

// Check if all required fields are provided
if (empty($_POST["firstName"]) || empty($_POST["lastName"]) || empty($_POST["specialization"]) || empty($_POST["phoneNumber"]) || empty($_POST["gender"]) || empty($_POST["email"]) || empty($_POST["password"]) || empty($_POST["description"]) || empty($_POST["H_id"]) || !isset($_FILES["profile_image"])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$specialization = $_POST["specialization"];
$phoneNumber = $_POST["phoneNumber"];
$email = $_POST["email"];
$password = $_POST["password"];
$description = $_POST["description"];
$gender = $_POST["gender"];
$h_id = $_POST["H_id"];

// Handle image upload
$image = $_FILES["profile_image"];
$imageName = uniqid('doc_') . '_' . time() . '.' . pathinfo($image["name"], PATHINFO_EXTENSION);  // Unique name for the image

// Validate if the file is an image
$imageType = mime_content_type($image["tmp_name"]);
if (strpos($imageType, 'image') === false) {
    echo json_encode(["status" => "error", "message" => "Uploaded file is not an image"]);
    exit();
}

// Check file size (limit to 5MB)
if ($image["size"] > 5000000) {
    echo json_encode(["status" => "error", "message" => "Image size exceeds the 5MB limit"]);
    exit();
}

// Check for existing doctor entries
$select_last_id = "SELECT D_id FROM doctors ORDER BY D_id DESC LIMIT 1";
$query_last_id = mysqli_query($conn, $select_last_id);

// Handle if there are no records in the table
if (mysqli_num_rows($query_last_id) == 0) {
    $last_id = "AAAA0000";  // Default first ID like "AAAA0000"
} else {
    $last_id_fetch = mysqli_fetch_assoc($query_last_id);
    $last_id = $last_id_fetch["D_id"];
}

// Generate the new doctor ID
$newId = generateDoctorId($last_id, $conn);

$targetDirectory = '../images/doctors/';
$targetFile = $targetDirectory . $imageName;

// Move the uploaded image to the target directory
if (move_uploaded_file($image["tmp_name"], $targetFile)) {
    // Image uploaded successfully, save the information to the database
    $query = "INSERT INTO doctors (D_id, D_FName, D_LName, D_specialize, D_phonenum, D_email, D_password, D_desc, D_profile, gender) VALUES ('$newId','$firstName', '$lastName', '$specialization', '$phoneNumber', '$email', '$password', '$description', '$imageName', '$gender')";
    $hos_to_doc = "INSERT INTO `doctor_hospital`(`D_id`, `H_id`) VALUES ('$newId','$h_id')";

    if (mysqli_query($conn, $query) and mysqli_query($conn, $hos_to_doc)) {
        // Prepare response data
        $response = [
            "status" => "success",
            "message" => "Doctor added successfully",
            "doctor" => [
                "D_id" => $newId,
                "D_FName" => $firstName,
                "D_LName" => $lastName,
                "D_specialize" => $specialization,
                "D_phonenum" => $phoneNumber,
                "D_email" => $email,
                "D_desc" => $description,
                "D_profile" => $imageName,
                "gender" => $gender,
                "H_id" => $h_id,
            ],
            "profile_image" => $imageName
        ];

        echo json_encode($response);

        // Send email to the doctor
        $sendEmailUrl = "https://siddhantrkokate.tech/doctor-desk-backend/emails/send.php";

        // Prepare the data for sending the email
        $emailData = [
            'email' => $email,
            'userID' => $newId,
            'password' => $password,
            'firstName' => $firstName,
            'lastName' => $lastName
        ];

        // Initialize cURL for sending email
        $ch = curl_init($sendEmailUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($emailData));

        // Execute the cURL request
        $emailResponse = curl_exec($ch);

        // Check if there is any error in sending the email
        if (curl_errno($ch)) {
            echo json_encode(["status" => "error", "message" => "Error sending email", "error" => curl_error($ch)]);
        }

        // Close the cURL session
        curl_close($ch);

    } else {
        echo json_encode(["status" => "error", "message" => "Failed to insert doctor into the database", "error" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Failed to upload image"]);
}
?>
