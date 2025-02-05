const vehiclesMapping = [
    { type: "textbox", vehiclesName: "rz", recordName: "vRZ", enabled: true, validation: "^.+$" },
    { type: "textbox", vehiclesName: "model", recordName: "vModel", enabled: true, validation: "^.+$" },
    { type: "textbox", vehiclesName: "tachometr", recordName: "vTachometr", enabled: true, validation: "^(?:[0-9]\\d{0,6})$", format: "number" },
    { type: "textbox", vehiclesName: "costCenter", recordName: "vCostCenter", enabled: true, validation: "^\\d{6}$", format: "number" },
]

bindVehiclesActions()
bindVehiclesValidations()

function bindVehiclesActions() {
    $(document).on("click", ".vehicles-delete", (e) => deleteVehiclesRecord(e.target.id))
    $(document).on("click", "#vehicles-insert", () => insertVehiclesRecord())
}

function bindVehiclesValidations() {
    vehiclesMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                $(document).on("input", ".vehicles-" + m.vehiclesName, (e) => vehiclesValidateTextbox(e.target))
                break
        }
    })
}

function setVehiclesMore(records) {
    $("#vehicles-rows").empty()
    records.forEach(r => setVehiclesOne(r, false))
}

function setVehiclesOne(record, del = true) {
    var id = vehiclesRowsCount()
    $("#vehicles-rows").append(vehiclesHtmlRecord(id, del))

    if (record == null) {
        return
    }
    
    vehiclesMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                vehiclesSetTextbox(m.vehiclesName, record[m.recordName], id)
                break
        }
    })
}

function showVehicles(firstVisit = false) {
    if (vehiclesRowsCount() <= 1) {
        insertVehiclesRecord()
    }

    if (firstVisit) {
        $("#vehicles h2").text("Vítejte a přidejte údaje")
        $("#vehicles .cancel").hide()
    }
    else {
        $("#vehicles h2").text("Správce vozidel")
        $("#vehicles .cancel").show()
    }

    showDialog("vehicles")
    vehiclesCheckTextboxes()
}

function vehiclesSetTextbox(id, value, recordId) {
    if (vehiclesGetFormat(id) == "number") {
        value = deformatNumber(value)
        value = formatNumber(value)
    }
    
    $("#vehicles-" + id + "-" + recordId).val(value).trigger("input")
}

function vehiclesGetTextbox(id, recordId) {
    if ($("#vehicles-" + id + "-" + recordId).attr("disabled") == "disabled") {
        return ""
    }

    return $("#vehicles-" + id + "-" + recordId).val()
}

function vehiclesGetFormat(id) {
    return vehiclesMapping.find(i => i.vehiclesName == id).format
}

function vehiclesEnableTextbox(id, bool, recordId) {
    $("#vehicles-" + id + "-" + recordId).attr("disabled", !bool)

    if (!bool) {
        $("#vehicles-" + id + "-" + recordId).removeClass("invalid")
        vehiclesCheckTextboxes()
    }
    else {
        vehiclesValidateTextbox(id)
    }
}

function vehiclesValidateTextbox(textbox) {
    var value = $(textbox).val()

    var id = $(textbox).attr("class").split("-")[1].split(" ")[0]
    
    if (vehiclesGetFormat(id) == "number") {
        value = deformatNumber(value)
        var format = formatNumber(value)
        $(textbox).val(format)
    }
    
    var validation = vehiclesGetValidation(id)

    if (testRegExp(value, validation)) {
        $(textbox).removeClass("invalid")
    }
    else {
        $(textbox).addClass("invalid")
    }

    vehiclesCheckTextboxes()
}

function vehiclesGetValidation(id) {
    return vehiclesMapping.find(i => i.vehiclesName == id).validation
}

function vehiclesGetInvalidTextboxes() {
    return $("#vehicles :not([disabled]).invalid").toArray()
}

function vehiclesGetAllTextboxes() {
    return $("#vehicles input:not([disabled])").toArray()
}

function vehiclesSubmitEnabled() {
    return vehiclesGetInvalidTextboxes().length <= 0 && vehiclesGetAllTextboxes().length > 0
}

function vehiclesCheckTextboxes() {
    if (vehiclesSubmitEnabled()) {
        $("#vehicles .submit").removeClass("disabled")
    }
    else {
        $("#vehicles .submit").addClass("disabled")
    }
}

function vehiclesRowsCount() {
    var rows = $("#vehicles .dialog-row[id]").toArray()
    var max = 0
    rows.forEach(row => {
        var id = parseInt(row.id.split('-').pop())
        if (id > max) {
            max = id
        }
    })
    return max + 1
}

function vehiclesHtmlRecord(id, del) {
    return '\
    <div id="vehicles-row-' + id + '" class="dialog-row">\
        <div class="dialog-column">' +
            (del ? '<label id="vehicles-delete-' + id + '" class="dialog-label dialog-action vehicles-delete">\
                <i class="fa-solid fa-trash"></i>\
                odstranit\
            </label>' : '') +
        '</div>\
        <div class="dialog-column">\
            <input type="text" name="vehicles-rz-' + id + '" id="vehicles-rz-' + id + '" class="vehicles-rz invalid" tabindex="5' + id + '1"' + (!del ? 'disabled' : '') + ' autocomplete="off">\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="vehicles-model-' + id + '" id="vehicles-model-' + id + '" class="vehicles-model invalid" tabindex="5' + id + '2"' + (!del ? 'disabled' : '') + ' autocomplete="off">\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="vehicles-tachometr-' + id + '" id="vehicles-tachometr-' + id + '" class="vehicles-tachometr invalid" tabindex="5' + id + '3"' + (!del ? 'disabled' : '') + ' autocomplete="off">\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="vehicles-costCenter-' + id + '" id="vehicles-costCenter-' + id + '" class="vehicles-costCenter invalid" tabindex="5' + id + '4"' + (!del ? 'disabled' : '') + ' autocomplete="off">\
        </div>\
    </div>'
}

function deleteVehiclesRecord(originalId) {
    var id = extractNumber(originalId, "delete-", "")
    $("#vehicles-row-" + id).remove()
    vehiclesCheckTextboxes()
}

function insertVehiclesRecord() {
    setVehiclesOne()
    vehiclesCheckTextboxes()
}

function getVehicles() {
    var output = []
    $("#vehicles .dialog-row[id]:not(:has([disabled])").toArray().forEach(row => {
        var id = parseInt(row.id.split('-').pop())
        output.push(getVehicle(id))
    })
    return output
}

function getVehicle(id) {
    var output = {}

    vehiclesMapping.forEach(m => {
        var value

        switch (m.type) {
            case "textbox":
                value = vehiclesGetTextbox(m.vehiclesName, id)
                break
        }

        output[m.recordName] = value
    })

    return output
}
