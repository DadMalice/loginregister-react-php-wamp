<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
// Replace these with your actual MySQL database credentials
$host = "localhost";
$username = "root";
$password = "";
$database = "tatersdb";

// Create a connection to the MySQL database
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the POST data from the React application
$data = json_decode(file_get_contents("php://input"));

// Extract the username and password from the POST data
$username = $data->username;
$password = $data->password;

// Query to check if the username and password match a record in your database
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Login successful
    $response = array(
        'success' => true,
        'message' => 'Login successful',
    );
} else {
    // Login failed
    $response = array(
        'success' => false,
        'message' => 'Invalid username or password',
    );
}

// Close the database connection
$conn->close();

// Send the JSON response back to the React application
header('Content-Type: application/json');
echo json_encode($response);
?>
