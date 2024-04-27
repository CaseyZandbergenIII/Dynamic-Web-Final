function validateDate() {
    var inputDate = document.getElementById('date').value;
    var inputTime = document.getElementById("time").value;
    var minDate = new Date('2024-04-26');
    var maxDate = new Date('2025-04-26');
    var selectedDate = new Date(inputDate);
    var dateParts = inputDate.split('-');
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]);
    var day = parseInt(dateParts[2]);
    var thirtyMonths = [4, 6, 9, 11];

    var currentTime = new Date();

    if (month < 1 || month > 12) {
        alert('Please enter a valid month (1-12).');
        return false;
    }

    if (day < 1 || day > 31) {
        alert("Please enter a valid day (1-31)");
        return false;
    }

    if (month === 2 && day > 29) {
        alert("Please enter a valid day (1-29)");
        return false;
    }

    for (var i = 0; i < thirtyMonths.length; i++) {
        if (month === thirtyMonths[i] && day > 30) {
            alert("Please enter a valid day (1-30)");
            return false;
        }
    }

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        alert('Please enter a valid date.');
        return false;
    }

    if (selectedDate < minDate || selectedDate > maxDate) {
        alert('Please select a date within the range: 2024-04-26 to 2025-04-26');
        return false;
    }

    var selectedTime = new Date(inputDate + 'T' + inputTime);
    // Check if the selected time is in the past
    if (selectedTime < currentTime) {
        alert("Please select a time in the future.");
        return false;
    }

    return true;
}
