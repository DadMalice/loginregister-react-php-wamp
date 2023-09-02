<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$servername = "localhost"; // Change to your MySQL server hostname if different
$username = "root"; // MySQL username (default is often "root")
$password = ""; // MySQL password (leave empty if you haven't set one)
$dbname = "tatersdb"; // Your database name

// Connect to your MySQL database
$mysqli = new mysqli($servername, $username, "", $dbname);

// Check for connection errors
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Fetch municipalities data from your database
$query = "SELECT id, name FROM municipalities";
$result = $mysqli->query($query);

if ($result) {
    $municipalities = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($municipalities);
} else {
    echo json_encode([]);
}

// Close the database connection
$mysqli->close();
?>
