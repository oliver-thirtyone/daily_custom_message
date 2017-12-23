var currentDate = new Date().toISOString().slice(0, 10);

$(document).ready(function() {
    $('title').text(currentDate);

    $.ajax({
        url: "http://daily.r3zn1k.ch/rest/read",
        data: {
            instance: 'irina',
            date: currentDate
        },
        success: handleResult
    });
});
