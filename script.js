function addStudent() {
    let name = document.getElementById("studentName").value.trim();
    if (!name) {
        alert("Please enter a student name.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    if (students.includes(name)) {
        alert("Student already exists.");
        return;
    }

    students.push(name);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    populateStudentDropdown();
    document.getElementById("studentName").value = "";
}

function displayStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let list = document.getElementById("studentList");
    if (!list) return;

    list.innerHTML = "";
    students.forEach(function (student) {
        list.innerHTML += "<li>" + student + "</li>";
    });
}

function populateStudentDropdown() {
    let select = document.getElementById("attendanceName");
    if (!select) return;

    let students = JSON.parse(localStorage.getItem("students")) || [];
    select.innerHTML = '<option value="">Select student</option>';

    students.forEach(function (student) {
        select.innerHTML += '<option value="' + student + '">' + student + '</option>';
    });
}

function populateSessionDropdown() {
    let select = document.getElementById("attendanceSession");
    if (!select) return;

    let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    select.innerHTML = '<option value="">General session</option>';

    sessions.forEach(function (session) {
        select.innerHTML += '<option value="' + session + '">' + session + '</option>';
    });
}

function markAttendance(status) {
    let select = document.getElementById("attendanceName");
    let name = select ? select.value : document.getElementById("attendanceName").value.trim();
    if (!name) {
        alert("Please select a student.");
        return;
    }

    let session = document.getElementById("attendanceSession")?.value || "General";

    let records = JSON.parse(localStorage.getItem("attendance")) || [];
    records.push({
        student: name,
        status: status,
        session: session,
        timestamp: new Date().toLocaleString()
    });

    localStorage.setItem("attendance", JSON.stringify(records));
    displayAttendance();
}

function displayAttendance() {
    let records = JSON.parse(localStorage.getItem("attendance")) || [];
    let list = document.getElementById("attendanceList");
    if (!list) return;

    list.innerHTML = "";
    if (records.length === 0) {
        list.innerHTML = "<li>No attendance records yet.</li>";
    } else {
        records.slice().reverse().forEach(function (record) {
            list.innerHTML += "<li><strong>" + record.student + "</strong> - " + record.status + "<span class=\"small\">(" + record.session + ", " + record.timestamp + ")</span></li>";
        });
    }

    let presentCount = records.filter(function (record) {
        return record.status === "Present";
    }).length;
    let absentCount = records.filter(function (record) {
        return record.status === "Absent";
    }).length;

    let recordCount = document.getElementById("recordCount");
    if (recordCount) {
        recordCount.innerText = records.length;
    }
    let presentCountEl = document.getElementById("presentCount");
    if (presentCountEl) {
        presentCountEl.innerText = presentCount;
    }
    let absentCountEl = document.getElementById("absentCount");
    if (absentCountEl) {
        absentCountEl.innerText = absentCount;
    }
}

function showTime() {
    let now = new Date();
    let clock = document.getElementById("clock");
    if (clock) {
        clock.innerHTML = "🕒 Current Time: " + now.toLocaleString();
    }
}

window.addEventListener("load", function () {
    displayStudents();
    populateStudentDropdown();
    populateSessionDropdown();
    displayAttendance();
    showTime();
    if (document.getElementById("clock")) {
        setInterval(showTime, 1000);
    }
});