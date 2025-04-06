<?php

// Include the connection file
include('../resources/connection.php');

// Allow all origins to access the API (you can restrict to specific domains later for security purposes)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow headers in the request (you might want to modify this based on the client’s needs)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set the content type to application/json
header("Content-Type: application/json");

// Get the JSON data from the request body
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

// Check the request method
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // SQL query to select hospital names and IDs
    $sql = "SELECT H_name, H_id FROM hospital"; // example table "hospital"

    // Execute the query
    $result = $conn->query($sql);

    // Check if any data is returned
    if ($result->num_rows > 0) {
        // Create an empty array to store the results
        $data = [];

        // Fetch data and store it in the array
        while ($row = $result->fetch_assoc()) {
            // Add each record as an array [hospitalName, hospitalId]
            $data[] = [$row['H_name'], $row['H_id']];
        }

        // Send the result as a JSON array
        echo json_encode($data);
    } else {
        // Return an empty array if no records are found
        echo json_encode([]);
    }
}
?>
