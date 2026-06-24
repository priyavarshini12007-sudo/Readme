let students = JSON.parse(localStorage.getItem("students")) || [];
let records = JSON.parse(localStorage.getItem("attendance")) || [];

let presentCount = records.filter(function (record) {
    return record.status === "Present";
}).length;
let absentCount = records.filter(function (record) {
    return record.status === "Absent";
}).length;

let percentage = 0;
if (records.length > 0) {
    percentage = (presentCount / records.length) * 100;
}

let studentCountEl = document.getElementById("studentCount");
if (studentCountEl) studentCountEl.innerText = students.length;
let attendanceCountEl = document.getElementById("attendanceCount");
if (attendanceCountEl) attendanceCountEl.innerText = records.length;
let presentCountEl = document.getElementById("presentCount");
if (presentCountEl) presentCountEl.innerText = presentCount;
let absentCountEl = document.getElementById("absentCount");
if (absentCountEl) absentCountEl.innerText = absentCount;
let attendancePercentageEl = document.getElementById("attendancePercentage");
if (attendancePercentageEl) attendancePercentageEl.innerText = percentage.toFixed(1) + "%";

let recentList = document.getElementById("recentAttendanceList");
if (recentList) {
    recentList.innerHTML = "";
    if (records.length === 0) {
        recentList.innerHTML = "<li>No attendance records yet.</li>";
    } else {
        records.slice(-5).reverse().forEach(function (record) {
            recentList.innerHTML += "<li><strong>" + record.student + "</strong> - " + record.status + " <span class=\"small\">(" + record.session + ", " + record.timestamp + ")</span></li>";
        });
    }
}
