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

// Get the JSON data from the request body
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Code to execute when the request method is POST
    
    $sql = "SELECT H_id, H_name, H_location, H_description, H_pic1 FROM hospital";
$result = $conn->query($sql);

// Array to hold the rows
$hospitals = array();

// Fetch the data and store it in the array
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Create a nested array for each row
        $hospital = array(
            "H_id" => $row["H_id"],
            "H_name" => $row["H_name"],
            "H_location" => $row["H_location"],
            "H_description" => $row["H_description"],
            "H_pic1" => "https://siddhantrkokate.tech/doctor-desk-backend/images/hospitals/".$row["H_pic1"]
        );
        
        // Append this hospital data to the main array
        $hospitals[] = $hospital;
    }
} else {
    echo "0 results";
}

// Close the connection
$conn->close();

// Encode the array as JSON and send it
echo json_encode($hospitals, JSON_PRETTY_PRINT);
    
}