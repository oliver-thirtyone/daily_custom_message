function displayEntry(entry) {
    $( "#test" ).append( entry['entry'] + " <-> ");
}

function displayMessage(entries) {
    entries.forEach(displayEntry);
}

function handleResult(result) {
    if (result['error']) {
        var nextDate = result['next_date'];
        if (nextDate != null) {
            startCountdown(nextDate);
        } else {
            // TODO: implement the end
            alert("this is the end");
        }
    } else {
        displayMessage(result);
    }
}