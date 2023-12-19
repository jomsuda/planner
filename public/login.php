<?php
// สร้างการเชื่อมต่อกับฐานข้อมูล
$host = "localhost";
$username = "ratcham1_cpe101_b5";
$password = "CPE101_b5";
$dbname = "ratcham1_cpe101_b5";

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // รับข้อมูลจากฟอร์ม
    $email = $_POST['email'];
    $password = $_POST['password'];

    // สร้างคำสั่ง SQL เพื่อตรวจสอบว่ามีผู้ใช้ในฐานข้อมูลหรือไม่
    $sql_check = "SELECT * FROM register WHERE email='$email'";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
        // ถ้ามีข้อมูล
        $row = $result_check->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // ถ้ารหัสผ่านถูกต้อง
            echo "Login successful.";
            // ทำการเปลี่ยนหน้าไปที่ calendar.html
            header("Location: calendar.html");
            exit();
        } else {
            // ถ้ารหัสผ่านไม่ถูกต้อง
            echo "Invalid email or password. Please try again.";
        }
    } else {
        // ถ้าไม่มีข้อมูล
        echo "Invalid email or password. Please try again.";
    }
}

$conn->close();
?>
