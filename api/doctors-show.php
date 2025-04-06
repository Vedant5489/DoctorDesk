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

// Get raw POST data (JSON)
$input_data = json_decode(file_get_contents("php://input"), true);

// Check if hospitalID is set in the JSON input
if(isset($input_data['hospitalID'])){
    
    $hospitalID = $input_data['hospitalID'];
    
    // Query to get doctor IDs associated with the hospital
    $select_from_hos_for_doc = "SELECT D_id FROM doctor_hospital WHERE H_id='$hospitalID'";
    $query_to_doc = mysqli_query($conn, $select_from_hos_for_doc);
    
    // Check if the query was successful
    if(!$query_to_doc){
        echo json_encode(["error" => "Error occurred at the selection level"]);
        exit();
    }
    
    // Initialize an array to hold the response data
    $doctors_data = [];
    
    // Loop through the doctor IDs and fetch their details from the doctors table
    while($row = mysqli_fetch_assoc($query_to_doc)) {
        $doctorID = $row['D_id'];
        
        // Query to get the doctor details
        $select_doctor_details = "SELECT D_id, D_FName, D_LName, D_specialize, D_phonenum, D_email, D_password, D_desc, D_profile, gender FROM doctors WHERE D_id='$doctorID'";
        $query_to_details = mysqli_query($conn, $select_doctor_details);
        
        // Check if the query was successful
        if ($query_to_details && $doctor_details = mysqli_fetch_assoc($query_to_details)) {
            // Add doctor data to the response array
            $doctors_data[] = $doctor_details;
        }
    }
    
    // Return the doctor data as JSON response
    echo json_encode(["doctors" => $doctors_data]);

}else{
    echo json_encode(["error" => "hospitalID is required"]);
}
?>
