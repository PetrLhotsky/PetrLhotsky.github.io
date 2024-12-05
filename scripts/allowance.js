const allowanceMapping = [
    { type: "textbox", allowanceName: "day_num", recordName: "day_num", format: "number" },
    { type: "textbox", allowanceName: "pocetHodin", recordName: "pocetHodin", format: "number" },
    { type: "textbox", allowanceName: "poskytnutaJidla", recordName: "poskytnutaJidla", format: "number" },
    { type: "textbox", allowanceName: "vyhlaskaMAX", recordName: "vyhlaskaMAX", format: "number" },
    { type: "textbox", allowanceName: "karcher", recordName: "karcher", format: "number" },
    { type: "textbox", allowanceName: "stravneVyhlaskaMAX", recordName: "stravneVyhlaskaMAX", format: "number" },
    { type: "textbox", allowanceName: "stravneKarcher", recordName: "stravneKarcher", format: "number" },
    { type: "textbox", allowanceName: "hodiny_kategorie", recordName: "hodiny_kategorie" }
]

function setAllowanceMore(data) {
    $("#allowance-rows").empty()
    data.forEach(r => setAllowanceOne(r))
}

function setAllowanceOne(data) {
    data.hodiny_kategorie = data.hodiny_od == null ? "" : Math.round(data.hodiny_od) + "-" + Math.round(data.hodiny_do)
    var id = allowanceRowsCount()
    $("#allowance-rows").append(allowanceHtmlRecord(id))
    
    allowanceMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                allowanceSetTextbox(m.allowanceName, data[m.recordName] != null ? data[m.recordName] : "", id)
                break
        }
    })
}

function showAllowance() {
    showDialog("allowance")
}

function allowanceSetTextbox(id, value, recordId) {
    if (allowanceGetFormat(id) == "number") {
        value = deformatNumber(value)
        value = value.includes(".") ? Number(value).toFixed(2) : value
        value = formatNumber(value)
    }

    $("#allowance-" + id + "-" + recordId).val(value)
}

function allowanceGetFormat(id) {
    return allowanceMapping.find(i => i.allowanceName == id).format
}

function allowanceRowsCount() {
    var rows = $("#allowance .dialog-row[id]").toArray()
    var max = 0
    rows.forEach(row => {
        var id = parseInt(row.id.split('-').pop())
        if (id > max) {
            max = id
        }
    })
    return max + 1
}

function allowanceHtmlRecord(id) {
    return '\
    <div id="allowance-row-' + id + '" class="dialog-row">\
        <div class="dialog-column">\
            <input type="text" name="allowance-day_num-' + id + '" id="allowance-day_num-' + id + '" class="allowance-day_num" disabled>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="allowance-pocetHodin-' + id + '" id="allowance-pocetHodin-' + id + '" class="allowance-pocetHodin" disabled>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="allowance-poskytnutaJidla-' + id + '" id="allowance-poskytnutaJidla-' + id + '" class="allowance-poskytnutaJidla" disabled>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="allowance-vyhlaskaMAX-' + id + '" id="allowance-vyhlaskaMAX-' + id + '" class="allowance-vyhlaskaMAX" disabled>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="allowance-karcher-' + id + '" id="allowance-karcher-' + id + '" class="allowance-karcher" disabled>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="allowance-stravneVyhlaskaMAX-' + id + '" id="allowance-stravneVyhlaskaMAX-' + id + '" class="allowance-stravneVyhlaskaMAX" disabled>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="allowance-stravneKarcher-' + id + '" id="allowance-stravneKarcher-' + id + '" class="allowance-stravneKarcher" disabled>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="allowance-hodiny_kategorie-' + id + '" id="allowance-hodiny_kategorie-' + id + '" class="allowance-hodiny_kategorie" disabled>\
        </div>\
    </div>'
}
