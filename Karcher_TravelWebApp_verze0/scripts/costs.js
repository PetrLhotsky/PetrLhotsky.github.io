const costsMapping = [
    { type: "textbox", costsName: "datum", recordName: "datum", enabled: true, validation: ".+" },
    { type: "textbox", costsName: "obsah", recordName: "obsah", enabled: true, validation: ".+" },
    { type: "textbox", costsName: "castka", recordName: "castka", enabled: true, validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?)$", format: "number" },
]

bindCostsActions()
bindCostsValidations()

//$("#nav-panel-item-6").click()

function bindCostsActions() {
    $(document).on("click", ".costs-delete", (e) => deleteCostsRecord(e.target.id))
    $(document).on("click", "#costs-insert", () => insertCostsRecord())
}

function bindCostsValidations() {
    costsMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                $(document).on("input", ".costs-" + m.costsName, (e) => costsValidateTextbox(e.target))
                break
        }
    })
}

function setCostsMore(records) {
    $("#costs-rows").empty()
    records.forEach(r => setCostsOne(r))
}

function setCostsOne(record) {
    var id = costsRowsCount()
    $("#costs-rows").append(costsHtmlRecord(id))
    appendAutocomplete($("#costs-autocomplete-" + id), "costs-obsah-" + id, "costs-obsah invalid", "", getNakladyObsahList())

    if (record == null) {
        return
    }
    
    costsMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                costsSetTextbox(m.costsName, record[m.recordName], id)
                break
        }
    })
}

function showCosts() {
    showDialog("costs")
}

function costsSetTextbox(id, value, recordId) {
    if (costsGetFormat(id) == "number") {
        value = deformatNumber(value)
        value = formatNumber(value)
    }
    
    $("#costs-" + id + "-" + recordId).val(value).trigger("input")
}

function costsGetTextbox(id, recordId) {
    if ($("#costs-" + id + "-" + recordId).attr("disabled") == "disabled") {
        return ""
    }

    return $("#costs-" + id + "-" + recordId).val()
}

function costsGetFormat(id) {
    return costsMapping.find(i => i.costsName == id).format
}

function costsEnableTextbox(id, bool, recordId) {
    $("#costs-" + id + "-" + recordId).attr("disabled", !bool)

    if (!bool) {
        $("#costs-" + id + "-" + recordId).removeClass("invalid")
        costsCheckTextboxes()
    }
    else {
        costsValidateTextbox(id)
    }
}

function costsValidateTextbox(textbox) {
    var value = $(textbox).val()

    var id = $(textbox).attr("class").split("-")[1].split(" ")[0]
    
    if (costsGetFormat(id) == "number") {
        value = deformatNumber(value)
        var format = formatNumber(value)
        $(textbox).val(format)
    }
    
    var validation = costsGetValidation(id)

    if (testRegExp(value, validation)) {
        $(textbox).removeClass("invalid")
    }
    else {
        $(textbox).addClass("invalid")
    }

    costsCheckTextboxes()
}

function costsGetValidation(id) {
    return costsMapping.find(i => i.costsName == id).validation
}

function costsGetInvalidTextboxes() {
    return $("#costs :not([disabled]).invalid").toArray()
}

function costsSubmitEnabled() {
    return costsGetInvalidTextboxes().length <= 0
}

function costsCheckTextboxes() {
    if (costsSubmitEnabled()) {
        $("#costs .submit").removeClass("disabled")
    }
    else {
        $("#costs .submit").addClass("disabled")
    }
}

function costsRowsCount() {
    var rows = $("#costs .dialog-row[id]").toArray()
    var max = 0
    rows.forEach(row => {
        var id = parseInt(row.id.split('-').pop())
        if (id > max) {
            max = id
        }
    })
    return max + 1
}

function costsHtmlRecord(id) {
    return '\
    <div id="costs-row-' + id + '" class="dialog-row">\
        <div class="dialog-column">\
            <label id="costs-delete-' + id + '" class="dialog-label dialog-action costs-delete">\
                <i class="fa-solid fa-trash"></i>\
                odstranit\
            </label>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="costs-datum-' + id + '" id="costs-datum-' + id + '" class="costs-datum invalid" tabindex="3' + id + '1" autocomplete="off">\
        </div>\
        <div class="dialog-column">\
            <!--<input type="text" name="costs-obsah-' + id + '" id="costs-obsah-' + id + '" class="costs-obsah invalid" tabindex="3' + id + '2" autocomplete="off">-->\
            <span id="costs-autocomplete-' + id + '" class="costs-autocomplete" tabindex="3' + id + '3"></span>\
        </div>\
        <div class="dialog-column">\
            <div></div>\
            <input type="text" name="costs-castka-' + id + '" id="costs-castka-' + id + '" class="costs-castka invalid" tabindex="3' + id + '3" autocomplete="off">\
        </div>\
    </div>'
}

function deleteCostsRecord(originalId) {
    var id = extractNumber(originalId, "delete-", "")
    $("#costs-row-" + id).remove()
    costsCheckTextboxes()
}

function insertCostsRecord() {
    setCostsOne()
    costsCheckTextboxes()
}

function getCosts() {
    var output = []
    $("#costs .dialog-row[id]").toArray().forEach(row => {
        var id = parseInt(row.id.split('-').pop())
        output.push(getCost(id))
    })
    return output
}

function getCost(id) {
    var output = {}

    costsMapping.forEach(m => {
        var value

        switch (m.type) {
            case "textbox":
                value = costsGetTextbox(m.costsName, id)
                break
        }

        output[m.recordName] = value
    })

    return output
}
