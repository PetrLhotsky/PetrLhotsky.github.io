const tankMapping = [
    { type: "textbox", tankName: "zacatek", recordName: "zacatek", enabled: false, format: "number" },
    { type: "textbox", tankName: "konec", recordName: "konec", enabled: true, validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?)$", format: "number" }
]

bindTankActions()
bindTankValidations()

//$("#nav-panel-item-4").click()

function bindTankActions() {

}

function bindTankValidations() {
    tankMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                $("#tank-" + m.tankName).on("input", () => tankValidateTextbox(m.tankName))
                break
        }
    })
}

function setTank(record) {
    tankMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                tankSetTextbox(m.tankName, record != null && record.hasOwnProperty(m.recordName) && record[m.recordName] != null ? record[m.recordName] : "")
                tankEnableTextbox(m.tankName, m.enabled)
                break
        }
    })
}

function showTank() {
    showDialog("tank", "tank-konec")
}

function tankSetTextbox(id, value) {
    if (tankGetFormat(id) == "number") {
        value = deformatNumber(value)
        value = formatNumber(value)
    }
    
    $("#tank-" + id).val(value).trigger("input")
}

function tankGetTextbox(id) {
    if ($("#tank-" + id).attr("disabled") == "disabled") {
        return ""
    }

    return $("#tank-" + id).val()
}

function tankGetFormat(id) {
    return tankMapping.find(i => i.tankName == id).format
}

function tankEnableTextbox(id, bool) {
    $("#tank-" + id).attr("disabled", !bool)

    if (!bool) {
        $("#tank-" + id).removeClass("invalid")
        tankCheckTextboxes()
    }
    else {
        tankValidateTextbox(id)
    }
}

function tankValidateTextbox(id) {
    var value = $("#tank-" + id).val()
    
    if (tankGetFormat(id) == "number") {
        value = deformatNumber(value)
        var format = formatNumber(value)
        $("#tank-" + id).val(format)
    }

    var validation = tankGetValidation(id)

    if (testRegExp(value, validation)) {
        $("#tank-" + id).removeClass("invalid")
    }
    else {
        $("#tank-" + id).addClass("invalid")
    }

    tankCheckTextboxes()
}

function tankGetValidation(id) {
    return tankMapping.find(i => i.tankName == id).validation
}

function tankGetInvalidTextboxes() {
    return $("#tank :not([disabled]).invalid").toArray()
}

function tankSubmitEnabled() {
    return tankGetInvalidTextboxes().length <= 0
}

function tankCheckTextboxes() {
    if (tankSubmitEnabled()) {
        $("#tank .submit").removeClass("disabled")
    }
    else {
        $("#tank .submit").addClass("disabled")
    }
}

function getTank() {
    var output = {}

    tankMapping.forEach(m => {
        var value

        switch (m.type) {
            case "textbox":
                value = tankGetTextbox(m.tankName)
                break
        }

        output[m.recordName] = value
    })

    return output
}
