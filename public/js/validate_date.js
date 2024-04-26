function validateDate() {
    var inputDate = document.getElementById('date').value;
    var minDate = new Date('2024-04-26');
    var maxDate = new Date('2025-04-26');
    var selectedDate = new Date(inputDate);
    var dateParts = inputDate.split('-');
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]);
    var day = parseInt(dateParts[2]);
    var thirty_months = [4, 6, 9, 11];

    if (month < 1 || month > 12) {
        alert('Please enter a valid month (1-12).');
        return false;
    }

    if (day < 1 || day > 31){
        alert("Please enter a valid day (1-31)");
        return false;
    }

    if (month === 2 && day > 29){
        alert("Please enter a valid day (1-29)")
        return false;
    }
    
    for (i = 0; i < thirty_months.length; i++){
        if (month === thirty_months[i]){
            if (day > 30){
                alert("Please enter a valid day (1-30)");
                return false;
            }
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

    return true;
}
