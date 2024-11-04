const tableMapping = ["datum", "popisTrasy", "dopravniProstredek", "tachometr",
    "ujetoKmSluzebne", "ujetoKmSoukrome", "cerpaniPhLi", "cerpaniPhKc",
    "ostatniVydaje", "trvaniOd", "trvaniDo", "poskytnutaJidla",
    "poskytnutaSnidane", "poskytnutyObed", "poskytnutaVecere", "type"]

bindMenuActions()
bindMenuShortcuts()
bindTableActions()

function bindMenuActions() {
    $("#nav-panel-item-2").click(editData)
    $("#nav-panel-item-3").click(deleteData)
    $("#nav-panel-item-4").click(tankData)
    $("#nav-panel-item-6").click(costsData)
    $("#nav-panel-item-7").click(dataSummary)
}

function bindMenuShortcuts() {
    addShortcut(69, editData)
    addShortcut(68, deleteData)
    addShortcut(70, tankData)
}

function bindTableActions() {
    //$(document).on("dblclick", ".table-item", (e) => editRow(e.target.id))
    $(document).on("click", ".table-check", () => checkRow())
    $(document).on("click", ".table-edit", (e) => editRow(e.target.id))
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
    setTank({ zacatek: 100, konec: 20 })
    showTank()
}

function costsData() {
    setCostsMore([{ datum: "5. 10.", obsah: "Náklad A", castka: "1 000"}, { datum: "7. 10.", obsah: "Náklad B", castka: "2 000"}])
    showCosts()
}

function dataSummary() {
    showSummary()
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
    var id = extractNumber(originalId, "item-", "-prop")
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

        if (prop.replace(" ", "") === "number") {
            output[prop] = parseInt(value.replace(/\s+/g, ''), 10)
        } else {
            output[prop] = value
        }
    })

    return output
}

function getEmpties(ids) {
    return ids.map(i => getEmpty(i))
}

function getEmpty(id) {
    var output = {}

    tableMapping.forEach(m => {
        output[m] = ""
    })

    output["datum"] = addLeadingZero(id) + ". 11."
    output["dopravniProstredek"] = "AUS"
    output["type"] = 1
    output["poskytnutaJidla"] = 0

    return output
}

function cancelForm() {
    return true
}

function saveForm() {
    if (!submitEnabled()) {
        return false
    }

    var data = getForm()
    writeRows(data)
    return true
}

function writeRows(data) {
    var dates = data.datum.split(", ")
    dates.forEach(d => writeRow(d, data))
}

function writeRow(d, data) {
    var day = d.split(".")[0]
    var id = removeLeadingZeros(day)

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
                value = data[prop] ? "ano" : "ne"
                break
            
            default:
                value = data[prop]
                break
        }

        $("#table-item-" + id + "-prop-" + (index + 1)).text(value)
    })
}

function poskytnutaJidla(data) {
    return parseInt(data["poskytnutaSnidane"] ? 1 : 0)
           + parseInt(data["poskytnutyObed"] ? 1 : 0)
           + parseInt(data["poskytnutaVecere"] ? 1 : 0)
}

function cancelTank() {
    return true
}

function saveTank() {
    return true
}

function cancelCosts() {
    return true
}

function saveCosts() {
    return true
}

function cancelSummary() {
    return true
}

function saveSummary() {
    return true
}
