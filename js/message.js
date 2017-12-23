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