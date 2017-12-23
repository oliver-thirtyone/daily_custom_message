var messageElement = $('#message');

function displayEntry(entry) {
    var type = entry['type'],
        value = entry['entry'];

    var template = _.template($('#' + type + '-template').html());
    messageElement.append(template({
        value: value
    }));
}

function displayMessage(entries) {
    entries.forEach(displayEntry);
    messageElement.show();
}

function displayPatienceMessage() {
    var weekday = new Date().getDay();
    var entries = [{type: "image", entry: "img/patience-" + weekday + ".jpg"}];
    displayMessage(entries);
}

function displayLastMessage() {
    var year = new Date().getFullYear();
    var entries = [
        {type: "image", entry: "img/last_message.jpg"},
        {type: "youtube", entry: "OUyfQLd3bCs"},
        {type: "text", entry: "&copy; " + year + " r3zn1k.ch"}];
    displayMessage(entries);
}

function handleResult(result) {
    if (result['error']) {
        var nextDate = result['next_date'];
        if (nextDate != null) {
            displayPatienceMessage();
            startCountdown(nextDate);
        } else {
            displayLastMessage();
        }
    } else {
        displayMessage(result);
    }
}