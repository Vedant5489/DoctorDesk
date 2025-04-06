<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer classes
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Check for POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['email']) && isset($_POST['userID']) && isset($_POST['password']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $email = $_POST['email'];
        $userID = $_POST['userID'];
        $password = $_POST['password'];
        
        // Create PHPMailer instance
        $mail = new PHPMailer(true);

        // Enable verbose debug output
        $mail->SMTPDebug = 2;

        try {
            // SMTP configuration
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'doctordeskad25@gmail.com'; // Your SMTP username
            $mail->Password = 'etoxniwmbkhfljsk'; // Your SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS encryption
            $mail->Port = 587; // Gmail SMTP port

            // Email content
            $mail->setFrom('siddhantrkokate@gmail.com', 'DoctorDesk');
            $mail->addAddress($email); // Use the email from the POST request
            $mail->isHTML(true);

            // Subject and body of the email
            $mail->Subject = 'Greetings from DoctorDesk';
            $mail->Body = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Account Login Credentials</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; background-color: #f9f9f9;">
        <h2 style="color: #007BFF;">Welcome to DoctorDesk!</h2>
        <p>Dear,</p>
        <p>Thank you for registering with us. We are excited to have you onboard. Below, you will find your login credentials for accessing your account:</p>
        
        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">User ID:</td>
                <td style="padding: 10px; background-color: #f9f9f9;">' . htmlspecialchars($userID) . '</td>
            </tr>
            <tr>
                <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">Password:</td>
                <td style="padding: 10px; background-color: #f9f9f9;">' . htmlspecialchars($password) . '</td>
            </tr>
        </table>
    </div>
</body>
</html>
';

            // Send the email
            if ($mail->send()) {
                echo "Email sent successfully!";
            } else {
                echo "Failed to send email!";
            }
        } catch (Exception $e) {
            echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    } else {
        echo "Invalid email address!";
    }
}
?>
