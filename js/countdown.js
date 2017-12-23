var countdownLabels = ['weeks', 'days', 'hours', 'minutes', 'seconds'],
    countdownTemplate = _.template($('#countdown-template').html()),
    countdownElement = $('#countdown'),
    currDate = '00:00:00:00:00',
    nextDate = '00:00:00:00:00',
    parser = /([0-9]{2})/gi;

// Parse countdown string to an object
function strfobj(str) {
    var parsed = str.match(parser),
        obj = {};
    countdownLabels.forEach(function (label, i) {
        obj[label] = parsed[i]
    });
    return obj;
}

// Return the time components that diffs
function diff(obj1, obj2) {
    var diff = [];
    countdownLabels.forEach(function (key) {
        if (obj1[key] !== obj2[key]) {
            diff.push(key);
        }
    });
    return diff;
}

function updateCountdown(event) {
    var newDate = event.strftime('%w:%d:%H:%M:%S'),
        data;

    if (newDate !== nextDate) {
        currDate = nextDate;
        nextDate = newDate;

        // Setup the data
        data = {
            'curr': strfobj(currDate),
            'next': strfobj(nextDate)
        };

        // Apply the new values to each node that changed
        diff(data.curr, data.next).forEach(function (label) {
            var selector = '.%s'.replace(/%s/, label),
                $node = countdownElement.find(selector);

            // Update the node
            $node.removeClass('flip');
            $node.find('.curr').text(data.curr[label]);
            $node.find('.next').text(data.next[label]);

            // Wait for a repaint to then flip
            _.delay(function ($node) {
                $node.addClass('flip');
            }, 50, $node);
        });
    }
}

function finishCountdown(event) {
    window.location.reload(true);
}

function startCountdown(finalDate) {
    // Convert the date to the required format
    finalDate = finalDate.replace(/-/g, '/');

    // Build the layout
    var initData = strfobj(currDate);
    countdownLabels.forEach(function (label, i) {
        countdownElement.append(countdownTemplate({
            curr: initData[label],
            next: initData[label],
            label: label
        }));
    });

    countdownElement.show();

    // Start the countdown
    countdownElement.countdown(finalDate)
        .on('update.countdown', updateCountdown)
        .on('finish.countdown', finishCountdown);
}
