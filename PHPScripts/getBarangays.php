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

// Get the municipality_id from the JavaScript parameter
if (isset($_GET['municipality_id'])) {
    $municipality_id = $_GET['municipality_id'];

    // SQL query to select barangays for the specified municipality_id
    $sql = "SELECT * FROM barangays WHERE municipality_id = $municipality_id";

    // Execute the SQL query
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        // Initialize an array to store barangay data
        $barangays = array();

        // Fetch and add data for each selected barangay to the array
        while ($row = $result->fetch_assoc()) {
            $barangays[] = $row;
        }

        // Return the barangay data as JSON
        echo json_encode($barangays);
    } else {
        echo json_encode(array("message" => "No barangays found for municipality_id $municipality_id"));
    }
} else {
    echo json_encode(array("message" => "Invalid request. Missing municipality_id parameter."));
}

// Close the database connection
$mysqli->close();
?>
