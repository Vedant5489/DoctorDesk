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

// Check if the userID and password are provided in the POST data
if (isset($_POST['userID']) && isset($_POST['password'])) {
    $userID = $_POST["userID"];
    $password = $_POST["password"];
    
    // First, check in doctors table
    $check_doc = "SELECT * FROM doctors WHERE D_id='$userID' AND D_password='$password'";
    $query_doc = mysqli_query($conn, $check_doc);

    // If user is found in doctors table
    if (mysqli_num_rows($query_doc) > 0) {
        $row_doc = mysqli_fetch_assoc($query_doc);
        // Uniform response with label and ID
        echo json_encode([
            "status" => "success",
            "label" => "doctor", 
            "userID" => $row_doc['D_id'],
            "firstName" => $row_doc['D_FName'],
            "lastName" => $row_doc['D_LName'],
            "specialize" => $row_doc['D_specialize'],
            "phone" => $row_doc['D_phonenum'],
            "email" => $row_doc['D_email'],
            "description" => $row_doc['D_desc'],
            "profile" => $row_doc['D_profile']
        ]);
    } else {
        // If not found in doctors, check in hospital table
        $check_hosp = "SELECT * FROM hospital WHERE H_id='$userID' AND H_password='$password'";
        $query_hosp = mysqli_query($conn, $check_hosp);
        
        // If user is found in hospital table
        if (mysqli_num_rows($query_hosp) > 0) {
            $row_hosp = mysqli_fetch_assoc($query_hosp);
            // Uniform response with label and ID
            echo json_encode([
                "status" => "success",
                "label" => "hospital", 
                "userID" => $row_hosp['H_id'],
                "name" => $row_hosp['H_name'],
                "location" => $row_hosp['H_location'],
                "description" => $row_hosp['H_description'],
                "contact" => $row_hosp['NIN_id'],
                "profilePictures" => [
                    $row_hosp['H_pic1'],
                    $row_hosp['H_pic2'],
                    $row_hosp['H_pic3'],
                    $row_hosp['H_pic4'],
                    $row_hosp['H_pic5']
                ]
            ]);
        } else {
            // If not found in hospital, check in patients table
            $check_pat = "SELECT * FROM patients WHERE P_id='$userID' AND P_password='$password'";
            $query_pat = mysqli_query($conn, $check_pat);
            
            // If user is found in patients table
            if (mysqli_num_rows($query_pat) > 0) {
                $row_pat = mysqli_fetch_assoc($query_pat);
                // Uniform response with label and ID
                echo json_encode([
                    "status" => "success",
                    "label" => "patient", 
                    "userID" => $row_pat['P_id'],
                    "firstName" => $row_pat['P_FName'],
                    "lastName" => $row_pat['P_LName'],
                    "birthDate" => $row_pat['P_Bdate'],
                    "address" => $row_pat['P_Address'],
                    "phone" => $row_pat['P_phonenum'],
                    "email" => $row_pat['P_email'],
                    "gender" => $row_pat['gender']
                ]);
            } else {
                // If user is not found in any table
                echo json_encode(["status" => "fail", "message" => "Invalid userID or password."]);
            }
        }
    }
} else {
    // Return failure response if parameters are missing
    echo json_encode(["status" => "fail", "message" => "userID and password are required."]);
}
?>
