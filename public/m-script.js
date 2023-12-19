// การอ้างถึงอิลิเมนต์ใน DOM
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

// ตัวแปรสำหรับเก็บวันที่ปัจจุบัน, วันที่เลือก, เดือน, และปี
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// อาร์เรย์ของชื่อเดือน
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const holidays =
[
  {"day": 1, "month": 1, "year": 2023, "name": "New Year's Day"},
  {"day": 3, "month": 1, "year": 2023, "name": "Day off New Year's Day"},
  {"day": 8, "month": 1, "year": 2023, "name": "National Children's Day"},
  {"day": 16, "month": 1, "year": 2023, "name": "Teachers' Day"},
  {"day": 1, "month": 2, "year": 2023, "name": "Lunar New Year's Day"},
  {"day": 2, "month": 2, "year": 2023, "name": "Second Lunar New Year's Day"},
  {"day": 3, "month": 2, "year": 2023, "name": "Third Lunar New Year's Day"},
  {"day": 14, "month": 2, "year": 2023, "name": "Valentine's Day"},
  {"day": 16, "month": 2, "year": 2023, "name": "Makha Bucha"},
  {"day": 20, "month": 3, "year": 2023, "name": "March Equinox"},
  {"day": 6, "month": 4, "year": 2023, "name": "Chakri Day"},
  {"day": 13, "month": 4, "year": 2023, "name": "Songkran"},
  {"day": 14, "month": 4, "year": 2023, "name": "Songkran"},
  {"day": 15, "month": 4, "year": 2023, "name": "Songkran"},
  {"day": 4, "month": 5, "year": 2023, "name": "Coronation Day"},
  {"day": 13, "month": 5, "year": 2023, "name": "Royal Ploughing Ceremony Day"},
  {"day": 15, "month": 5, "year": 2023, "name": "Visakha Bucha"},
  {"day": 16, "month": 5, "year": 2023, "name": "Day off Visakha Bucha"},
  {"day": 3, "month": 6, "year": 2023, "name": "Queen Suthida's Birthday"},
  {"day": 13, "month": 7, "year": 2023, "name": "Asalha Bucha"},
  {"day": 14, "month": 7, "year": 2023, "name": "Buddhist Lent Day"},
  {"day": 12, "month": 8, "year": 2023, "name": "Mother's Day"},
  {"day": 13, "month": 10, "year": 2023, "name": "Anniversary of the Death of King Bhumibol"},
  {"day": 23, "month": 10, "year": 2023, "name": "Chulalongkorn Day"},
  {"day": 31, "month": 10, "year": 2023, "name": "Halloween"},
  {"day": 5, "month": 12, "year": 2023, "name": "Father's Day"},
  {"day": 24, "month": 12, "year": 2023, "name": "Christmas Eve"},
  {"day": 25, "month": 12, "year": 2023, "name": "Christmas Day"},
  {"day": 31, "month": 12, "year": 2023, "name": "New Year's Eve"}
];

// อาร์เรย์เพื่อเก็บเหตุการณ์
const eventsArr = [];
getEvents();   // ดึงเหตุการณ์จาก local storage
console.log(eventsArr);

// ฟังก์ชันเพื่อเพิ่มวันในวิวที่มีคลาส day และ prev-date next-date บนวันของเดือนก่อนหน้าและเดือนถัดไป และ active ในวันนี้
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  // อัปเดตเดือนและปีที่แสดงใน UI
  date.innerHTML = months[month] + " " + year;

  // สร้าง HTML สำหรับวัน แบ่งแยกวันของเดือนที่ผ่านมา ปัจจุบัน และวันของเดือนถัดไป
  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    // ตรวจสอบว่ามีเหตุการณ์ในวันนั้นหรือไม่
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    // ตรวจสอบว่าวันนี้เป็นวันปัจจุบันหรือไม่
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      // เพิ่มคลาสพิเศษสำหรับวันที่เลือก วันนี้ และเหตุการณ์
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      // เพิ่มคลาสพิเศษสำหรับวันอื่น ๆ
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }

    // Create a container for the date and holiday name
    let dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");

    // Create a div for the date
    let dateDiv = document.createElement("div");
    dateDiv.classList.add("date-number");
    dateDiv.textContent = i;

    // Create a div for the holiday name
    let holidayNameDiv = document.createElement("div");
    holidayNameDiv.classList.add("holiday-name");

    // Check if the day is a holiday
    let isHoliday = holidays.some(holiday => holiday.day === i && holiday.month === month + 1 && holiday.year === year);

    if (isHoliday) {
        let holidayInfo = holidays.find(holiday => holiday.day === i && holiday.month === month + 1 && holiday.year === year);
        holidayNameDiv.textContent = holidayInfo.name;
    }

    // Append the date and holiday name divs to the day container
    dayContainer.appendChild(dateDiv);
    dayContainer.appendChild(holidayNameDiv);

    // Append the day container to the days container
    daysContainer.appendChild(dayContainer);

  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  // อัปเดตคอนเทนเนอร์วันด้วย HTML ที่สร้างขึ้น
  daysContainer.innerHTML = days;
  // เพิ่มตัวฟังก์ชันเสริมที่จะฟังก์ชัน
  addListner();
}

// ฟังก์ชันเพื่อเพิ่มเดือนและปีในปุ่ม prev และ next
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
  addHolidaysToCalendar();
}
// ฟังก์ชันเพื่อเปลี่ยนเดือนถัดไป
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
  addHolidaysToCalendar();
}

// ตัวฟังก์ชันสำหรับปุ่มก่อนหน้าและถัดไป
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// ====== กำหนดค่าปฏิทินในขณะที่โหลดหน้า =======
initCalendar();

function addHolidaysToCalendar() {
  console.log("Adding holidays to calendar");

  const dayElements = document.querySelectorAll(".day");

  holidays.forEach((holiday) => {
    // Check if the holiday is in the current month and year
    if (month === holiday.month - 1 && year === holiday.year) {
      // Find the day element corresponding to the holiday
      const dayElement = Array.from(dayElements).find(
        (element) => parseInt(element.textContent) === holiday.day
      );

      if (dayElement) {
        dayElement.classList.add("holiday");

        // Check if the day element already has a holiday name
        const existingHolidayName = dayElement.querySelector(".holiday-name");
        if (!existingHolidayName) {
          // If not, create a new holiday name element
          const holidayName = document.createElement("div");
          holidayName.classList.add("holiday-name");
          holidayName.textContent = holiday.name;
          dayElement.appendChild(holidayName);
        }
      }
    }
  });

  console.log("Holidays added to calendar");
}

addHolidaysToCalendar();

// ฟังก์ชันเพื่อเพิ่ม active ในวัน
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      // ลบ active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      // ถ้าคลิก prev-date หรือ next-date เปลี่ยนไปยังเดือนนั้น
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        // เพิ่ม active ในวันที่คลิกหลังจากเปลี่ยนเดือน
        setTimeout(() => {
          // เพิ่ม active ที่ไม่ใช่ prev-date หรือ next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        // เพิ่ม active ในวันที่คลิกหลังจากเปลี่ยนเดือน
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// ตั้งค่าการเรียกฟังก์ชัน initCalendar เมื่อปุ่ม "Today" ถูกคลิก
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
  addHolidaysToCalendar();
});

// ตั้งค่าการตรวจสอบข้อมูลที่ป้อนใน input dateInput เพื่อให้เป็นรูปแบบที่ถูกต้อง
dateInput.addEventListener("input", (e) => {
  // แทนที่ทุกตัวอักษรที่ไม่ใช่ตัวเลขหรือเครื่องหมาย / ด้วยช่องว่าง
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  
  // เพิ่มเครื่องหมาย / หลังจากที่ป้อน 2 ตัวอักษร
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  
  // จำกัดความยาวของ input เพื่อไม่ให้เกิน 7 ตัวอักษร
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  
  // ถ้ามีการลบข้อมูลทางถอยหลังแล้วเหลือตัวอักษรที่เหลือเพียง 1 ตัว
  if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
    // ลบตัวหลังที่เพิ่มไป
    dateInput.value = dateInput.value.slice(0, 2);
  }
});

// ตั้งค่าการเรียกฟังก์ชัน gotoDate เมื่อปุ่ม "Goto" ถูกคลิก
gotoBtn.addEventListener("click", gotoDate);

// ฟังก์ชันเพื่อเลือกวันที่ตามที่ระบุใน input dateInput
function gotoDate() {
  console.log("here");
  // แยกส่วนวันและเดือน-ปี จากค่าที่ป้อนใน input dateInput
  const dateArr = dateInput.value.split("/");
  
  // ตรวจสอบว่าสามารถแยกได้เป็นสองส่วนหรือไม่
  if (dateArr.length === 2) {
    // ตรวจสอบว่าวันที่อยู่ในช่วงที่ถูกต้องหรือไม่
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      // กำหนดค่าเดือนและปีตามที่ระบุ
      month = dateArr[0] - 1;
      year = dateArr[1];
      
      // เรียกฟังก์ชัน initCalendar เพื่อแสดงปฏิทินใหม่
      initCalendar();
      addHolidaysToCalendar();
      return;
    }
  }
  
  // แสดงแจ้งเตือนถ้ารูปแบบวันที่ไม่ถูกต้อง
  alert("Invalid Date");
}

// ฟังก์ชันเพื่อแสดงวันที่กำลังเลือก (Active Day) ใน eventDay และ eventDate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// ฟังก์ชันเพื่ออัปเดตรายการกิจกรรมเมื่อวันได้รับการเลือก
function updateEvents(date) {
  let events = "";
  // วนลูปผ่านกิจกรรมทั้งหมดที่มีใน eventsArr
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      // วนลูปผ่านแต่ละกิจกรรมและสร้าง HTML สำหรับแสดงผล
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });

  // หากไม่มีกิจกรรมในวันที่ระบุ
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }

  // แสดงรายการกิจกรรมทั้งหมดใน eventsContainer
  eventsContainer.innerHTML = events;

  // บันทึกการเปลี่ยนแปลงใน local storage
  saveEvents();
}

// เรียกใช้ฟังก์ชัน addEventForm เมื่อปุ่ม "Add Event" ถูกคลิก
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

// เรียกใช้ฟังก์ชันปิดฟอร์มเพิ่มกิจกรรมเมื่อปุ่ม "Close" ถูกคลิก
addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

// กำหนด event listener เพื่อปิดฟอร์มเพิ่มกิจกรรมเมื่อคลิกนอกฟอร์ม
document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

// ทำให้สามารถป้อนได้เฉพาะ 50 ตัวอักษรใน input eventTitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});


function defineProperty() {
  var osccred = document.createElement("div");
  /*
  osccred.innerHTML =
    "A Project By Group B5 ";
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
  */
}

defineProperty();

// ให้ผู้ใช้ป้อนได้เฉพาะเลขและเครื่องหมาย ':' ใน input addEventFrom
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

// ให้ผู้ใช้ป้อนได้เฉพาะเลขและเครื่องหมาย ':' ใน input addEventTo
addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// กำหนดการทำงานของปุ่ม "Add Event" เมื่อถูกคลิก
addEventSubmit.addEventListener("click", () => {
  // ดึงข้อมูลจากฟอร์มการเพิ่มกิจกรรม
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  // ตรวจสอบว่าข้อมูลถูกป้อนหรือไม่
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  // ตรวจสอบรูปแบบเวลาที่ถูกต้อง (24 ชั่วโมง)
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  // แปลงรูปแบบเวลา
  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  // ตรวจสอบว่ากิจกรรมได้ถูกเพิ่มไว้แล้วหรือไม่
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }

  // สร้างกิจกรรมใหม่
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };

  // ตรวจสอบว่ากิจกรรมได้ถูกเพิ่มไว้แล้วหรือไม่
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  // ถ้ายังไม่ได้เพิ่มกิจกรรมในวันนี้
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  // ปิดหน้าต่างเพิ่มกิจกรรม
  addEventWrapper.classList.remove("active");
  // ล้างข้อมูลในฟอร์ม
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  // อัปเดตกิจกรรมที่แสดงในปฏิทิน
  updateEvents(activeDay);

  // เลือกวันที่กำลังใช้งานและเพิ่มคลาส event ถ้ายังไม่ได้เพิ่ม
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});


// ฟังก์ชันที่ใช้ในการลบกิจกรรมเมื่อคลิกที่กิจกรรม
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    // ถ้าผู้ใช้ตกลงที่จะลบกิจกรรม
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      // วนลูป eventsArr เพื่อหาและลบกิจกรรมที่ตรงกับ eventTitle
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          // ถ้าไม่มีกิจกรรมอื่นเหลือในวันนั้น ให้ลบวันนั้นออกจาก eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            // ลบคลาส event จากวันที่เป็นวันที่กำลังใช้งาน
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      // อัปเดตกิจกรรมที่แสดงในปฏิทิน
      updateEvents(activeDay);
    }
  }
});

// ฟังก์ชันในการบันทึกกิจกรรมลงใน localStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// ฟังก์ชันในการดึงกิจกรรมจาก localStorage
function getEvents() {
  // ตรวจสอบว่ากิจกรรมได้ถูกบันทึกใน localStorage หรือไม่
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

// ฟังก์ชันในการแปลงรูปแบบเวลา
function convertTime(time) {
  // แปลงเวลาเป็นรูปแบบ 24 ชั่วโมง
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

// ===== ฟังก์ชันการทำงานใน Dark mode =====
const darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};

const container = document.querySelector(".container");

container.appendChild(darkModeIcon);

// ===== Color Switch Mode ===== //
// make color-box enable or disable
document.addEventListener('DOMContentLoaded', function () {
  const colorThemeIcon = document.querySelector('.colorTheme-icon');

  // Toggle color box visibility
  colorThemeIcon.addEventListener('click', function () {
    colorThemeIcon.classList.toggle('open');
  });
});

// color mode getting button in console
let buttons = document.querySelectorAll(".btn");

for (var button of buttons) {
  button.addEventListener("click", (e)=>{

    let target = e.target;

    let open = document.querySelector(".open");
    if(open) open.classList.remove("open");

    document.querySelector(".active").classList.remove("active");
    target.classList.add("active");

    // to switch colors //
    let root = document.querySelector(":root")
    let dataColor = target.getAttribute("data-color"); //getting data-color value of clicked button
    color = dataColor.split(" "); //splitting each color form space and make them try

    root.style.setProperty("--primary-clr", color[0]);
    root.style.setProperty("--todo-color", color[1]);
    root.style.setProperty("--darkmode", color[2]);
    root.style.setProperty("--bg-color", color[3]);
    
    console.log(color)
  })
}

// ฟังก์ชันแสดงฟอร์มการเพิ่มกิจกรรม
function showAddEventForm() {
  document.querySelector('.add-event-wrapper').style.display = 'block';
}

// =======  ฟังก์ชันที่ถูกเรียกเมื่อ DOM โหลดเสร็จ ================
document.addEventListener('DOMContentLoaded', function() {
  // เพิ่ม Event Listener สำหรับปุ่ม "Add Event"
  document.querySelector('.add-event-btn').addEventListener('click', function() {
    // ดึงข้อมูลจากฟอร์มการเพิ่มกิจกรรม
    var eventName = document.querySelector('.event-name').value;
    var eventDescription = document.querySelector('.event-description').value;
    var eventTimeFrom = document.querySelector('.event-time-from').value;
    var eventTimeTo = document.querySelector('.event-time-to').value;

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์ผ่าน XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        // โหลดหน้าเว็บใหม่หลังจากบันทึกกิจกรรมเสร็จ
        window.location.reload();
      }
    };
    xhr.open("POST", "save_activity.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // ส่งข้อมูลผ่านสตริงแบบ URL-encoded
    xhr.send(
      "activity=" + encodeURIComponent(eventName) +
      "&description=" + encodeURIComponent(eventDescription) +
      "&time_from=" + encodeURIComponent(eventTimeFrom) +
      "&time_to=" + encodeURIComponent(eventTimeTo)
    );
  });
});


