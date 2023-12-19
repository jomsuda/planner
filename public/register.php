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
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // ตรวจสอบว่าชื่อผู้ใช้หรืออีเมลนั้นมีอยู่แล้วหรือไม่
    $sql_check = "SELECT * FROM register WHERE username='$username' OR email='$email'";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
        // ถ้ามีข้อมูลแสดงว่าชื่อผู้ใช้หรืออีเมลนี้มีอยู่แล้ว
        echo "Username or email already exists. Please choose another one.";
    } else {
        // สร้างคำสั่ง SQL เพื่อเพิ่มข้อมูลในฐานข้อมูล
        $sql_insert = "INSERT INTO register (username, email, password) VALUES ('$username', '$email', '$password')";

        if ($conn->query($sql_insert) === TRUE) {
            echo "Registration successful.";
        } else {
            echo "Error: " . $sql_insert . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
