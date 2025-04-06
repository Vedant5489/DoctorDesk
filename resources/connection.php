<?php


// defining basic sever details
$server = "localhost";
$user = "root";
$password = "";
$database = "doctordesk";

$conn = mysqli_connect($server, $user, $password, $database);

if(!$conn){
    echo "The database is not connected!";
    exit();
}

?>