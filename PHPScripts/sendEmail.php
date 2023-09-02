<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Check if the 'email' query parameter is set
if (isset($_GET['email'])) {
    $recipientEmail = $_GET['email'];

    require 'path/to/PHPMailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;

    $mail->isSMTP(); // Set mailer to use SMTP
    $mail->Host = 'smtp.example.com'; // Specify SMTP server
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = 'dadmalicegaming@gmail.com'; // SMTP username
    $mail->Password = 'Marializacelestine08'; // SMTP password
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption (optional)
    $mail->Port = 587; // TCP port to connect to

    $mail->setFrom('dadmalicegaming@gmail.com', 'Brent');
    $mail->addAddress($recipientEmail, 'Recipient Name'); // Add the recipient using the provided email address

    $mail->Subject = 'Hello, World!';
    $mail->Body = 'This is a test email from PHPMailer.';

    if ($mail->send()) {
        echo 'Message has been sent';
    } else {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
} else {
    echo 'Recipient email not provided.';
}
?>
