<?php

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data from the request
    $activity = $_POST["activity"];
    $description = $_POST["description"];
    $timeFrom = $_POST["time_from"];
    $timeTo = $_POST["time_to"];

    // Create a PDO connection (update the database credentials)
    $host = "localhost";
    $username = "ratcham1_cpe101_b5";
    $password = "CPE101_b5";
    $database = "ratcham1_cpe101_b5";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and execute the SQL query to insert data into the database
        $stmt = $pdo->prepare("INSERT INTO events (activity, description, time_from, time_to) VALUES (:activity, :description, :time_from, :time_to)");
        $stmt->bindParam(":activity", $activity);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":time_from", $timeFrom);
        $stmt->bindParam(":time_to", $timeTo);
        $stmt->execute();

        // Respond with success message (you can customize the response as needed)
        echo "Event added successfully";
    } catch (PDOException $e) {
        // Handle database connection or query errors
        echo "Error: " . $e->getMessage();
    }
} else {
    // Respond with an error message if the request method is not POST
    echo "Invalid request method";
}

?>
