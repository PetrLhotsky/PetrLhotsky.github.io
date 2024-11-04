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
    var rows = $("#costs .form-row").toArray()
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
    <div id="costs-row-' + id + '" class="form-row">\
        <div class="form-column">\
            <label id="costs-delete-' + id + '" class="form-label form-action costs-delete">\
                <i class="fa-solid fa-trash"></i>\
                odstranit\
            </label>\
        </div>\
        <div class="form-column">\
            <input type="text" name="costs-datum-' + id + '" id="costs-datum-' + id + '" class="costs-datum invalid" tabindex="3' + id + '1">\
        </div>\
        <div class="form-column">\
            <input type="text" name="costs-obsah-' + id + '" id="costs-obsah-' + id + '" class="costs-obsah invalid" tabindex="3' + id + '2">\
        </div>\
        <div class="form-column">\
            <input type="text" name="costs-castka-' + id + '" id="costs-castka-' + id + '" class="costs-castka invalid" tabindex="3' + id + '3">\
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
