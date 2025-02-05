const tableMapping = ["datum", "popisTrasy", "dopravniProstredek", "tachometr",
    "ujetoKmSluzebne", "ujetoKmSoukrome", "cerpaniPhLi", "cerpaniPhKc",
    "ostatniVydaje", "trvaniOd", "trvaniDo", "poskytnutaJidla",
    "poskytnutaSnidane", "poskytnutyObed", "poskytnutaVecere", "type"]

function initialize() {
    bindMenuActions()
    bindMenuShortcuts()
    bindTableActions()
    changeTable()
}

function bindMenuActions() {
    $(window).resize(() => resizeAction())
    $("#logo-action").click(() => logoAction())
    $("#selection-mo").click(() => changeTable())
    $("#top-panel-item-2>a").click(() => vehiclesData())
    $("#selection-rp").click(() => changeTable())
    $("#selection-name").click(() => dbLogout())

    $("#nav-panel-item-2").click(editData)
    $("#nav-panel-item-3").click(deleteData)
    $("#nav-panel-item-4").click(tankData)
    $("#nav-panel-item-6").click(costsData)
    $("#nav-panel-item-7").click(dataSummary)

    selectFavoritesAcFromDb()
}

function bindMenuShortcuts() {
    addShortcut(69, editData)
    addShortcut(68, deleteData)
    addShortcut(70, tankData)
}

function bindTableActions() {
    $(document).on("dblclick", ".table-item", (e) => editRow(e.target.id))
    $(document).on("click", ".table-check", () => checkRow())
    $(document).on("click", ".table-edit", (e) => editRow(e.target.id))
}

function currentSelections() {
    var user = $("#selection-name-select").val()
    var vehicle = $("#selection-rp-select").val()
    var [month, year] = $("#selection-mo-select").val().split("-")
    return [user, vehicle, month, year]
}

function currentUser() {
    var sub = $("#selection-name-select").val()
    var name = $("#selection-name-select option[value=" + sub + "]").text()
    return { sub: sub, name: name }
}

function resizeAction() {
    var width = document.documentElement.clientWidth
    if (width <= 999) {
        //$("#top-panel").hide()
    }
    else {
        $("#top-panel").show()
    }
}

function logoAction() {
    var width = document.documentElement.clientWidth
    if (width <= 999) {
        $("#top-panel").slideToggle()
    }
    else {
        location.reload()
    }
}

function changeTable() {
    $("#table .table-item").remove()
    generateTable()
    selectTravelsFromDb()
}

function generateTable() {
    var [month, year] = $("#selection-mo-select").val().split("-")
    month = month - 1
    var date = new Date(year, month, 1)
    
    var dayOfWeek = date.getDay() == 0 ? 7 : date.getDay()
    for (var day = 1; day < dayOfWeek; day++) generateTableRowHidden()

    var daysOfMonth = getDaysOfMonth(year, month + 1)
    for (var day = 1; day <= daysOfMonth; day++) generateTableRow(year, month, day)

    $(".table-item .table-column-0").toArray().forEach(e => appendCheckbox($("#" + e.id + "-check"), "checkbox-" + e.id, "no-color", ""))
}

function generateTableRowHidden() {
    $("#table").append('<div id="table-item" class="table-row table-item hidden"></div>')
}

function generateTableRow(year, month, day) {
    $("#table").append('<div id="table-item-' + day + '" class="table-row table-item' + generateTableRowClasses(new Date(year, month, day)) + '"></div>')
    $("#table-item-" + day).append('<div id="table-item-' + day + '-prop-0" class="table-column table-column-0">\
                                        <span id="table-item-' + day + '-prop-0-check" class="table-check"></span>\
                                        <i id="table-item-' + day + '-prop-0-edit" class="fa-solid fa-pen-to-square table-edit"></i>\
                                    </div>')
    $("#table-item-" + day).append('<div id="table-item-' + day + '-prop-1" class="table-column table-column-1">' + addLeadingZero(day) + '. ' + addLeadingZero(month + 1) + '.</div>')
    for (var i = 2; i <= 16; i++) $("#table-item-" + day).append('<div id="table-item-' + day + '-prop-' + i + '" class="table-column table-column-' + i + (i >= 13 ? " hidden" : "") + '"></div>')
    $("#table-item-" + day + "-prop-16").text("-1")
}

function generateTableRowClasses(date) {
    var classes = ""
    if (isWeekend(date)) classes += " weekend"
    if (isToday(date)) classes += " active"
    return classes
}

function vehiclesData() {
    selectVehiclesFromDb()
}

function editData() {
    if (!checkEnabled()) {
        return
    }

    var rows = getCheckedRows()
    var ids = rows.map(r => extractNumber(r.id, "item-", ""))
    var records = readRows(ids)

    setFormMore(records)
    showForm()
}

function deleteData() {
    if (!checkEnabled()) {
        return
    }

    var rows = getCheckedRows()
    var ids = rows.map(r => extractNumber(r.id, "item-", ""))
    var record = getEmpty()
    record["datum"] = ids.join(", ")

    writeRows(record)
}

function tankData() {
    selectTanksFromDb()
}

function costsData() {
    selectCostsFromDb()
}

function dataSummary() {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbSelectTravelsSummary(user, vehicle, year, month, (data) => {
        dbSelectTanks(user, vehicle, year, month, (tanks) => {
            dbSelectCosts(user, vehicle, year, month, (costs) => {
                setSummary(data, tanks, costs)
                hideLoading()
                showSummary()
            })
        })
    })
}

function getCheckedRows() {
    return $(".table-item:has(.checkbox :checked)").toArray()
}

function checkEnabled() {
    return getCheckedRows().length > 0
}

function checkRow() {
    if (checkEnabled()) {
        $("#nav-panel-item-2, #nav-panel-item-3").removeClass("disabled")
    }
    else {
        $("#nav-panel-item-2, #nav-panel-item-3").addClass("disabled")
    }
}

function editRow(originalId) {
    var id = extractNumber(originalId, "item-", "")
    var record = readRow(id)

    setFormOne(record)
    showForm()
}

function readRows(ids) {
    return ids.map(i => readRow(i))
}

function readRow(id) {
    var output = {}

    $.each(tableMapping, function(index, prop) {
        var value = $("#table-item-" + id + "-prop-" + (index + 1)).text()
        output[prop] = value
    })

    return output
}

function getEmpties(ids) {
    return ids.map(i => getEmpty(i))
}

function getEmpty(datum) {
    var output = {}

    tableMapping.forEach(m => {
        output[m] = ""
    })

    output["type"] = -2
    output["datum"] = datum

    return output
}

function cancelForm() {
    return true
}

function saveForm() {
    if (!formSubmitEnabled()) {
        return false
    }

    var data = getForm()
    writeRows(data)
    return true
}

function writeRows(data) {
    var dates = data.datum.split(", ")
    dates.forEach(d => writeRow(d, data))
    recalculateRows()
    insertTravelsIntoDb()
}

function writeRow(d, data) {
    if (typeof d !== "number") {
        d = d.split(".")[0]
    }

    var id = removeLeadingZeros(d)

    $.each(tableMapping, function(index, prop) {
        var value

        switch (prop) {
            case "datum":
                return
            
            case "poskytnutaJidla":
                value = poskytnutaJidla(data)
                break

            case "poskytnutaSnidane":
            case "poskytnutyObed":
            case "poskytnutaVecere":
                value = data[prop] == true || data[prop] == "ano" ? "ano" : "ne"
                break
            
            default:
                value = data[prop]
                break
        }

        $("#table-item-" + id + "-prop-" + (index + 1)).text(value)
    })
}

function poskytnutaJidla(data) {
    var x = parseInt(data["poskytnutaSnidane"] == true || data["poskytnutaSnidane"] == "ano" ? 1 : 0)
           + parseInt(data["poskytnutyObed"] == true || data["poskytnutyObed"] == "ano" ? 1 : 0)
           + parseInt(data["poskytnutaVecere"] == true || data["poskytnutaVecere"] == "ano" ? 1 : 0)
    return x == 0 && data["popisTrasy"] == "" ? "" : x
}

function recalculateRows() {
    var [month, year] = $("#selection-mo-select").val().split("-")
    var daysOfMonth = getDaysOfMonth(year, month)

    for (var i = 2; i <= daysOfMonth; i++) {
        var dopravniProstredek = $("#table-item-" + i + "-prop-3").text()
        var tachometrPrev = $("#table-item-" + (i - 1) + "-prop-4").text()

        if (dopravniProstredek != "AUS") {
            $("#table-item-" + i + "-prop-4").text(tachometrPrev)
            continue
        }

        var kmSluzebneCurr = $("#table-item-" + i + "-prop-5").text()
        var kmSoukromeCurr = $("#table-item-" + i + "-prop-6").text()

        tachometrPrev = tachometrPrev == "" ? 0 : parseInt(deformatNumber(tachometrPrev))
        kmSluzebneCurr = kmSluzebneCurr == "" ? 0 : parseInt(deformatNumber(kmSluzebneCurr))
        kmSoukromeCurr = kmSoukromeCurr == "" ? 0 : parseInt(deformatNumber(kmSoukromeCurr))

        var tachometrCurr = tachometrPrev + kmSluzebneCurr + kmSoukromeCurr
        $("#table-item-" + i + "-prop-4").text(formatNumber(tachometrCurr))
    }
}

function cancelTank() {
    return true
}

function saveTank() {
    if (!tankSubmitEnabled()) {
        return false
    }

    var data = getTank()
    insertTankIntoDb(data)
    return true
}

function cancelCosts() {
    return true
}

function saveCosts() {
    if (!costsSubmitEnabled()) {
        return false
    }

    var data = getCosts()
    insertCostsIntoDb(data)
    return true
}

function cancelSummary() {
    return true
}

function saveSummary() {
    generateSummary()
    return false
}

function saveExport() {
    generateExport()
    return false
}

function cancelVehicles() {
    return true
}

function saveVehicles() {
    if (!vehiclesSubmitEnabled()) {
        return false
    }

    var data = getVehicles()
    insertVehiclesIntoDb(data)
    location.reload()
    return true
}



function selectTravelsFromDb(random = false) {
    if (random) {
        generateRandomData()
        return
    }

    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbSelectTravels(user, vehicle, year, month, (data) => {
        $("#table-item-1-prop-4").text(formatNumber(tachometrPocatek(data)))
        data.forEach(d => writeRow(d.day_num, d))
        recalculateRows()
        hideLoading()
    })
}

function insertTravelsIntoDb() {
    showLoading()
    var [month, year] = $("#selection-mo-select").val().split("-")
    var daysOfMonth = getDaysOfMonth(year, month)
    for (var i = 1; i <= daysOfMonth; i++) insertTravelIntoDb(i)
    hideLoading()
}

function insertTravelIntoDb(i) {
    var data = readRow(i)

    var [user, vehicle, month, year] = currentSelections()
    data.day = data.datum.split(".")[0]
    
    if (data.type == -2) {
        dbDeleteTravel(user, vehicle, year, month, data.day)
    }
    else if (data.type >= 0) {
        data.user = user
        data.vehicle = vehicle
        data.year = year
        data.month = month
        dbInsertTravel(data)
    }
}

function selectTanksFromDb() {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbSelectTanks(user, vehicle, year, month, (data) => {
        setTank(data[0])
        hideLoading()
        showTank()
    })
}

function insertTankIntoDb(data) {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    data.user = user
    data.vehicle = vehicle
    data.year = year
    data.month = month
    data.tank_eom = data.konec
    dbInsertTank(data)
    hideLoading()
}

function selectCostsFromDb() {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbSelectCosts(user, vehicle, year, month, (data) => {
        setCostsMore(data)
        hideLoading()
        showCosts()
    })
}

function insertCostsIntoDb(data) {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbClearCosts(user, vehicle, year, month, () => {
        data.forEach(d => insertCostIntoDb(d))
    })
    hideLoading()
}

function insertCostIntoDb(data) {
    var [user, vehicle, month, year] = currentSelections()
    data.user = user
    data.vehicle = vehicle
    data.year = year
    data.month = month
    data.day = data.datum
    data.nazev = data.obsah
    dbInsertCost(data)
}

function selectFavoritesAcFromDb() {
    var [user, vehicle, month, year] = currentSelections()
    dbSelectFavoritesAc(user, (data) => {
        autocompleteChangeSource("form-popis-trasy", data)
    })
}

function selectVehiclesFromDb() {
    showLoading()
    var [user] = currentSelections()
    dbSelectVehicles(user, (data) => {
        setVehiclesMore(data)
        hideLoading()
        showVehicles()
    })
}

function insertVehiclesIntoDb(data) {
    showLoading()
    var [user] = currentSelections()
    data.forEach(d => insertVehicleIntoDb(d))
    hideLoading()
}

function insertVehicleIntoDb(data) {
    var [user] = currentSelections()
    data.user = user
    data.vDatumTachometru = "2024-12-01"
    dbInsertVehicle(data)
}
