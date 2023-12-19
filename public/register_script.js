function registerUser() {
  const username = document.querySelector(".username").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;

  // สร้างอ็อบเจ็กต์ XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // กำหนดวิธีการเชื่อมต่อและ URL ที่จะส่งคำขอไป
  xhr.open("POST", "register.php", true);

  // กำหนดหัวข้อ Content-Type ในการส่งข้อมูล
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // กำหนดฟังก์ชันที่จะทำงานเมื่อคำขอสำเร็จ
  xhr.onload = function () {
      if (xhr.status === 200) {
          const response = xhr.responseText;
          document.getElementById("registration-message").textContent = response;
      }
  };

  // ส่งข้อมูลผู้ใช้ไปยังเซิร์ฟเวอร์
  const data = `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  xhr.send(data);
}

// ============= Dark mode ====================
const darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};
