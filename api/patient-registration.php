<?php

header("Access-Control-Allow-Origin: *"); // Allow all origins. You can replace '*' with a specific origin like 'http://localhost'.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include the connection file
include('../resources/connection.php');

if (mysqli_connect_errno()) {
    echo json_encode(["response" => "Database connection failed: " . mysqli_connect_error()]);
    exit();
}


// Set the content type to application/json
header("Content-Type: application/json");

// Get the JSON data from the request body
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

function generatePatientId($lastId, $conn) {
    // Extract the letters and numbers from the last ID
    $letters = substr($lastId, 0, 5);  // The first 5 characters (letters)
    $numbers = substr($lastId, 5);  // The last 4 characters (numbers)

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
    $query = "SELECT * FROM patients WHERE P_id = '$newId'";
    $result = mysqli_query($conn, $query);

    // If the new ID already exists, generate a new one
    if (mysqli_num_rows($result) > 0) {
        return generatePatientId($newId, $conn);
    } else {
        // Return the new ID
        return $newId;
    }
}

// Function to increment the letters part (e.g., AAAAA -> BBBBB)
function incrementLetters($letters) {
    $lettersArray = str_split($letters);
    
    // Start from the last letter and increment
    for ($i = 4; $i >= 0; $i--) {
        if ($lettersArray[$i] == 'Z') {
            $lettersArray[$i] = 'A'; // Reset to 'A'
        } else {
            $lettersArray[$i] = chr(ord($lettersArray[$i]) + 1); // Increment the letter
            break;
        }
    }

    return implode('', $lettersArray);
}

// Check if the required fields are set
if (isset($obj["firstName"]) && isset($obj["lastName"]) && isset($obj["birthDate"]) && isset($obj["address"]) && isset($obj["phoneNumber"]) && isset($obj["password"]) && isset($obj["email"]) && isset($obj["gender"])) {
    // Get the values from the JSON data
    $firstName = $obj["firstName"];
    $lastName = $obj["lastName"];
    $birthDate = $obj["birthDate"];
    $address = $obj["address"];
    $phoneNumber = $obj["phoneNumber"];
    $password = $obj["password"];
    $email = $obj["email"];
    $gender = $obj["gender"];

    // Get the last ID from the patients table
    $select_last_id = "SELECT P_id FROM patients ORDER BY P_id DESC LIMIT 1";
    $query_last_id = mysqli_query($conn, $select_last_id);

    // Check if there are no records in the table
    if (mysqli_num_rows($query_last_id) == 0) {
        // If no records, set a default first ID like "AAAAA0000"
        $last_id = "AAAAA0000";
    } else {
        $last_id_fetch = mysqli_fetch_assoc($query_last_id);
        $last_id = $last_id_fetch["P_id"];
    }

    // Generate the new ID
    $newId = generatePatientId($last_id, $conn);

    // Insert data into the database
    $insert_new = "INSERT INTO patients (P_id, P_FName, P_LName, P_Bdate, P_Address, P_phonenum, P_password, P_email, gender)
    VALUES ('$newId', '$firstName', '$lastName', '$birthDate', '$address', '$phoneNumber', '$password', '$email', '$gender')";

    $query_insert_new = mysqli_query($conn, $insert_new);

    if (!$query_insert_new) {
        // Return failure response
        echo json_encode(["response" => "Insertion Failed! Try Again!"]);
    } else {
        // Return success response with the new patient ID and all the user's data
        $responseData = [
            "response" => "done",
            "new_id" => $newId,
            "user_data" => [
                "firstName" => $firstName,
                "lastName" => $lastName,
                "birthDate" => $birthDate,
                "address" => $address,
                "phoneNumber" => $phoneNumber,
                "email" => $email,
                "gender" => $gender,
                "P_id" => $newId
            ]
        ];
        echo json_encode($responseData);

        // Now, call the external API to send the email
        $sendEmailUrl = "https://siddhantrkokate.tech/doctor-desk-backend/emails/send.php";

        // Prepare the data to send
        $emailData = [
            'email' => $email,
            'userID' => $newId,
            'password'=> $password,
        ];

        // Initialize cURL
        $ch = curl_init($sendEmailUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($emailData));

        // Execute the cURL request
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
            echo json_encode(["response" => "Error sending email", "error" => curl_error($ch)]);
        }

        // Close the cURL session
        curl_close($ch);
    }

} else {
    // Return a JSON response with an error message if fields are missing
    echo json_encode(["response" => "not done", "error" => "Missing required fields"]);
}
?>
