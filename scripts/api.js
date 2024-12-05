const apiUrl = "https://petr.starozitnostiartek.cz/api/"
//const apiUrl = "http://localhost/api/"
const apiVehicles = "vehicles"
const apiLogin = "login"
const apiTravels = "travels"
const apiTravelsSummary = "travels_vypocty_summary"
const apiTanks = "tanks"
const apiCosts = "costs"
const apiFavorites = "favorites"



function dbSelectVehicles(user, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiVehicles,
        type: "GET",
        dataType: "json",
        credentials: 'include',
        success: function(data) {
            if (callback) callback(data)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbSelectVehicles(user, callback, false), showError)
            else showError()
        }
    })
}

function dbInsertVehicles(vehicles, callback) {
    vehicles.forEach(v => dbInsertVehicle(v, callback))
}

function dbInsertVehicle(vehicle, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiVehicles,
        type: "POST",
        data: vehicle,
        contentType: "application/x-www-form-urlencoded",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbInsertVehicle(vehicle, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}



function dbSelectTravels(user, vehicle, year, month, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiTravels + "?vehicle=" + vehicle + "&year=" + year + "&month=" + month,
        type: "GET",
        dataType: "json",
        credentials: 'include',
        success: function(data) {
            if (callback) callback(data)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbSelectTravels(user, vehicle, year, month, callback, false), showError)
            else showError()
        }
    })
}

function dbSelectTravelsSummary(user, vehicle, year, month, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiTravelsSummary + "?vehicle=" + vehicle + "&year=" + year + "&month=" + month,
        type: "GET",
        dataType: "json",
        credentials: 'include',
        success: function(data) {
            if (callback) callback(data)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbSelectTravelsSummary(user, vehicle, year, month, callback, false), showError)
            else showError()
        }
    })
}

function dbDeleteTravel(user, vehicle, year, month, day, callback, firstAttempt = false) {
    $.ajax({
        url: apiUrl + apiTravels + "?vehicle=" + vehicle + "&year=" + year + "&month=" + month + "&day=" + day,
        type: "DELETE",
        dataType: "json",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbDeleteTravel(user, vehicle, year, month, day, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}

function dbInsertTravels(travels, callback) {
    travels.forEach(t => dbInsertTravel(t, callback))
}

function dbInsertTravel(travel, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiTravels,
        type: "POST",
        data: travel,
        contentType: "application/x-www-form-urlencoded",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbInsertTravel(travel, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}



function dbSelectTanks(user, vehicle, year, month, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiTanks + "?vehicle=" + vehicle + "&year=" + year + "&month=" + month,
        type: "GET",
        dataType: "json",
        credentials: 'include',
        success: function(data) {
            if (callback) callback(data)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbSelectTanks(user, vehicle, year, month, callback, false), showError)
            else showError()
        }
    })
}

function dbInsertTanks(tanks, callback) {
    tanks.forEach(t => dbInsertTank(t, callback))
}

function dbInsertTank(tank, callback, firstAttempt) {
    $.ajax({
        url: apiUrl + apiTanks,
        type: "POST",
        data: tank,
        contentType: "application/x-www-form-urlencoded",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbInsertTank(tank, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}



function dbSelectCosts(user, vehicle, year, month, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiCosts + "?vehicle=" + vehicle + "&year=" + year + "&month=" + month,
        type: "GET",
        dataType: "json",
        credentials: 'include',
        success: function(data) {
            if (callback) callback(data)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbSelectCosts(user, vehicle, year, month, callback, false), showError)
            else showError()
        }
    })
}

function dbClearCosts(user, vehicle, year, month, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiCosts + "?vehicle=" + vehicle + "&year=" + year + "&month=" + month,
        type: "POST",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbClearCosts(user, vehicle, year, month, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}

function dbInsertCosts(costs, callback) {
    costs.forEach(c => dbInsertCost(c, callback))
}

function dbInsertCost(cost, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiCosts,
        type: "POST",
        data: cost,
        contentType: "application/x-www-form-urlencoded",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbInsertCost(cost, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}



function dbSelectFavorites(user, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiFavorites,
        type: "GET",
        dataType: "json",
        credentials: 'include',
        success: function(data) {
            if (callback) callback(data)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbSelectFavorites(user, callback, false), showError)
            else showError()
        }
    })
}

function dbSelectFavoritesAc(user, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiFavorites + "_ac",
        type: "GET",
        dataType: "json",
        credentials: 'include',
        success: function(data) {
            if (callback) callback(data)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbSelectFavoritesAc(user, callback, false), showError)
            else callback([])
        }
    })
}

function dbClearFavorites(user, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiFavorites,
        type: "POST",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbClearFavorites(user, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}

function dbInsertFavorite(favorite, callback, firstAttempt = true) {
    $.ajax({
        url: apiUrl + apiFavorites,
        type: "POST",
        data: favorite,
        contentType: "application/x-www-form-urlencoded",
        credentials: 'include',
        success: function(response) {
            if (callback) callback(response)
        },
        error: function() {
            if (firstAttempt) dbLogin(currentUser(), () => dbInsertFavorite(favorite, callback, false), showError)
            else if (callback) callback(-1)
        }
    })
}
