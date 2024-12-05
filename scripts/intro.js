dbSession((data) => loggedIn(data), noSession)

function dbSession(callback, error) {
    $.ajax({
        url: apiUrl + apiLogin,
        type: "GET",
        dataType: "json",
        success: function(data) {
            callback(data)
        },
        error: function() {
            error()
        }
    })
}

function loggedIn(data) {
    appendSelection($("#top-panel-name"), "selection-name", "inline", 150, [{ value: data.user, label: data.name }, { value: 0, label: "odhlásit se" }])
    dbSelectVehicles(data.user, (vData) => {
        if (vData.length < 1) {
            showVehicles(true)
            return;
        }
        var vehicles = [{ value: 0, label: "zvolte RZ" }]
        vData.forEach((v) => vehicles.push({ value: v.vId, label: v.vRZ }))
        appendSelection($("#top-panel-rp"), "selection-rp", "inline", 120, vehicles, vehicles[1].label)
        $("footer").hide()
        $("header, nav, main").fadeIn(500)
        initialize()
    })
}

function noSession() {
    $("header, nav, main").hide()
    $("head").append('<script src="https://accounts.google.com/gsi/client" async defer></script>')
    $("footer").show()
}

function handleCredentialResponse(response) {
    const token = response.credential
    const userInfo = parseJwt(token)

    dbLogin(userInfo, (data) => loggedIn(data), showError)
}

function parseJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
}

function dbLogin(user, callback, error) {
    $.ajax({
        url: apiUrl + apiLogin,
        type: "POST",
        data: user,
        credentials: 'include',
        contentType: "application/x-www-form-urlencoded",
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (error) error()
        }
    })
}

function dbLogout() {
    $("header, nav, main").fadeOut(500)
    $.ajax({
        url: apiUrl + apiLogin,
        type: "POST",
        credentials: 'include',
        success: function() {
            loggedOut()
        },
        error: function() {
            showError()
        }
    })
}

function loggedOut() {
    location.reload()
}
