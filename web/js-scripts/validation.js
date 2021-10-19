let X, R, Y;

function validateX() {
    if (document.querySelector('input[name="coordinateX"]:checked') !== null) {
        X = document.querySelector('input[name="coordinateX"]:checked').value;
    } else {
        showErrorToLog("Input X<br>");
        return false;

    }
    return true;
}

function validateY() {
    Y = document.querySelector("input[id=coordinateY]").value.replace(",", ".");
    if (Y === undefined) {
        showErrorToLog("Введите Y");
        return false;
    }
    if (!(!isNaN(parseFloat(Y)) && isFinite(Y))) {
        showErrorToLog("Y не является числом");
        return false;
    }
    if (!((Y > -5) && (Y < 3))) {
        showErrorToLog("Y должен быть от -5 до 3");
        return false;
    }
    return true;
}

function validateR() {
    R = document.getElementById("coordinateR")[document.getElementById("coordinateR").selectedIndex].value;
    showErrorToLog("R = " + R);
    return true;
}

function showErrorToLog(message) {
    document.getElementById("logs-request").append(message)
}

function submit() {
    $('#logs-request').empty();

    if (validateX() & validateY() & validateR()) {
        $.post("/filter", {
            'x': X,
            'y': Y,
            'r': R,
            'timezone': new Date().getTimezoneOffset()
        }).done(function (data) {
            arr = JSON.parse(data);
            row = '<tr>';
            row += '<td><b>' + parseFloat(arr.x.toFixed(8)) + '</b></td>';
            row += '<td><b>' + parseFloat(arr.y.toFixed(8)) + '</b></td>';
            row += '<td><b>' + parseFloat(arr.r.toFixed(8)) + '</b></td>';
            row += '<td><b>' + parseFloat(arr.execTime.toFixed(8)) + '</b></td>';
            row += '<td><b>' + arr.currentTime + '</b></td>';
            row += '<td><b>' + arr.isHit + '</b></td>';
            row += '</tr>';
            $('#tableWithResults tr:first').after(row);
        }).fail(function (err) {
            alert(err);
        });
    }
}

function submit_clear() {
    $('#logs-request').empty();
    showErrorToLog("Удаляю данные");

    $.post("filter", {
        'clear': true
    }).done(function (data) {
        $('#logs-request').empty();
        showErrorToLog("Data has been deleted");
    }).fail(function (err) {
        $('#logs-request').empty();
        showErrorToLog(err);
    })
}