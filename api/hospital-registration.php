<?php
// Allow all origins, which is okay for development
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

// Check if all required fields are provided
if (empty($_POST["H_name"]) || empty($_POST["H_location"]) || empty($_POST["H_description"]) || empty($_POST["NIN_id"]) || empty($_POST["H_password"]) || !isset($_FILES["H_pic1"]) || !isset($_FILES["H_pic2"]) || !isset($_FILES["H_pic3"]) || !isset($_FILES["H_pic4"]) || !isset($_FILES["H_pic5"]) || empty($_POST['H_email'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

$H_name = $_POST["H_name"];
$H_location = $_POST["H_location"];
$H_description = $_POST["H_description"];
$NIN_id = $_POST["NIN_id"];
$H_password = $_POST["H_password"];
$email = $_POST['H_email'];

// Handle image uploads
$uploadedImages = [];
$imageFields = ["H_pic1", "H_pic2", "H_pic3", "H_pic4", "H_pic5"];

foreach ($imageFields as $imageField) {
    if (isset($_FILES[$imageField])) {
        $image = $_FILES[$imageField];
        $imageName = uniqid($imageField . '_') . '_' . time() . '.' . pathinfo($image["name"], PATHINFO_EXTENSION);  // Unique name for the image

        // Validate if the file is an image
        $imageType = mime_content_type($image["tmp_name"]);
        if (strpos($imageType, 'image') === false) {
            echo json_encode(["status" => "error", "message" => "Uploaded file for $imageField is not an image"]);
            exit();
        }

        // Check file size (limit to 5MB)
        if ($image["size"] > 5000000) {
            echo json_encode(["status" => "error", "message" => "Image size for $imageField exceeds the 5MB limit"]);
            exit();
        }

        // Define the directory where images will be stored
        $targetDirectory = '../images/hospitals/';
        $targetFile = $targetDirectory . $imageName;

        // Move the uploaded image to the target directory
        if (move_uploaded_file($image["tmp_name"], $targetFile)) {
            $uploadedImages[$imageField] = $imageName;
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload image for $imageField"]);
            exit();
        }
    }
}

// Generate a unique hospital ID
function generateHospitalId($lastId, $conn) {
    $letters = substr($lastId, 0, 2);  // The first 2 characters (letters)
    $numbers = substr($lastId, 2);  // The last 4 characters (numbers)

    if ($numbers == '9999') {
        $letters = incrementLetters($letters);
        $numbers = '0000';
    } else {
        $numbers = str_pad((int)$numbers + 1, 4, '0', STR_PAD_LEFT);
    }

    $newId = $letters . $numbers;

    // Check if the new ID already exists in the database
    $query = "SELECT * FROM hospital WHERE H_id = '$newId'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        return generateHospitalId($newId, $conn);
    } else {
        return $newId;
    }
}

// Get the last inserted hospital ID to generate the new one
$select_last_id = "SELECT H_id FROM hospital ORDER BY H_id DESC LIMIT 1";
$query_last_id = mysqli_query($conn, $select_last_id);

// Handle if there are no records in the table
if (mysqli_num_rows($query_last_id) == 0) {
    $last_id = "HA0000";  // Default first ID like "HA0000"
} else {
    $last_id_fetch = mysqli_fetch_assoc($query_last_id);
    $last_id = $last_id_fetch["H_id"];
}

// Generate the new hospital ID
$newHospitalId = generateHospitalId($last_id, $conn);

// Insert the hospital data into the database
$query = "INSERT INTO hospital (H_id, H_name, H_location, H_description, NIN_id, H_password, H_pic1, H_pic2, H_pic3, H_pic4, H_pic5) 
          VALUES ('$newHospitalId', '$H_name', '$H_location', '$H_description', '$NIN_id', '$H_password', 
                  '" . $uploadedImages['H_pic1'] . "', '" . $uploadedImages['H_pic2'] . "', 
                  '" . $uploadedImages['H_pic3'] . "', '" . $uploadedImages['H_pic4'] . "', 
                  '" . $uploadedImages['H_pic5'] . "')";

if (mysqli_query($conn, $query)) {
    // Prepare response data including all the hospital details
    $response = [
        "status" => "success",
        "message" => "Hospital added successfully",
        "hospital" => [
            "H_id" => $newHospitalId,
            "H_name" => $H_name,
            "H_location" => $H_location,
            "H_description" => $H_description,
            "NIN_id" => $NIN_id,
            "H_password" => $H_password,
            "H_pic1" => $uploadedImages['H_pic1'],
            "H_pic2" => $uploadedImages['H_pic2'],
            "H_pic3" => $uploadedImages['H_pic3'],
            "H_pic4" => $uploadedImages['H_pic4'],
            "H_pic5" => $uploadedImages['H_pic5']
        ]
    ];

    echo json_encode($response);

    // Send email to the hospital
    $sendEmailUrl = "https://siddhantrkokate.tech/hospital-email/send.php";  // Replace with actual email sending URL

    // Prepare the data for sending the email
    $emailData = [
        'email' => $email,  // Hospital email to send confirmation
        'hospitalID' => $newHospitalId,
        'hospitalName' => $H_name,
        'password' => $H_password
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
    echo json_encode(["status" => "error", "message" => "Failed to insert hospital into the database", "error" => mysqli_error($conn)]);
}
?>
