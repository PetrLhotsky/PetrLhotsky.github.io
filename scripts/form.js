const formMapping = [
    { type: "radiobox", formName: "type", recordName: "type", enabled: [true, true, true] },
    { type: "textbox", formName: "datum", recordName: "datum", enabled: [false, false, false] },
    { type: "textbox", formName: "popis-trasy", recordName: "popisTrasy", enabled: [true, false, true], validation: ".+" },
    { type: "textbox", formName: "ujeto-km-sluzebne", recordName: "ujetoKmSluzebne", enabled: [true, false, false], validation: "^(?:[1-9]\\d{0,3})$", format: "number" },
    { type: "textbox", formName: "ujeto-km-soukrome", recordName: "ujetoKmSoukrome", enabled: [true, true, false], validation: "^(?:[1-9]\d{0,3})$", format: "number" },
    { type: "selection", formName: "dopravni-prostredek", recordName: "dopravniProstredek", enabled: [true, true, false] },
    { type: "selection", formName: "pocatecni-cas", recordName: "trvaniOd", enabled: [true, false, true] },
    { type: "selection", formName: "koncovy-cas", recordName: "trvaniDo", enabled: [true, false, true] },
    { type: "textbox", formName: "novy-stav-tachometru", recordName: "tachometr", enabled: [false, false, false], format: "number" },
    { type: "textbox", formName: "cerpani-ph-litry", recordName: "cerpaniPhLi", enabled: [true, true, false], validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?|^$)$", format: "number" },
    { type: "textbox", formName: "cerpani-ph-kc", recordName: "cerpaniPhKc", enabled: [true, true, false], validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?|^$)$", format: "number" },
    { type: "textbox", formName: "ostatni-vydaje-kc", recordName: "ostatniVydaje", enabled: [true, true, false], validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?|^$)$", format: "number" },
    { type: "checkbox", formName: "snidane", recordName: "poskytnutaSnidane", enabled: [true, true, true] },
    { type: "checkbox", formName: "obed", recordName: "poskytnutyObed", enabled: [true, true, true] },
    { type: "checkbox", formName: "vecere", recordName: "poskytnutaVecere", enabled: [true, true, true] }
]

bindFormActions()
bindFormValidations()

//$("#table-item-2 i").click()

function bindFormActions() {
    $("#radio-1").click(() => changeFormType(1))
    $("#radio-2").click(() => changeFormType(2))
    $("#radio-3").click(() => changeFormType(3))
}

function bindFormValidations() {
    formMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                $("#form-" + m.formName).on("input", () => validateTextbox(m.formName))
                break
        }

        if (m.formName == "ujeto-km-sluzebne" || m.formName == "ujeto-km-soukrome") {
            $("#form-" + m.formName).on("input", () => calculateNovyStav())
        }

        if (m.formName == "dopravni-prostredek") {
            $("#form-" + m.formName).click(() => changeDopravniProstredek())
        }
    })
}

function setFormMore(records) {
    setFormOne(records[0])
    setTextbox("datum", records.map(r => r.datum.split(".")[0]).join(", "))
}

function setFormOne(record) {
    formMapping.forEach(m => {
        switch (m.type) {
            case "radiobox":
                setRadiobox(m.formName, record[m.recordName])
                break
            case "textbox":
                setTextbox(m.formName, record[m.recordName])
                if (m.formName == "ujeto-km-sluzebne" || m.formName == "ujeto-km-soukrome" || m.formName == "novy-stav-tachometru") {
                    $("#form-" + m.formName).attr("data-def", record[m.recordName])
                }
                break
            case "selection":
                setSelection(m.formName, record[m.recordName])
                break
            case "checkbox":
                setCheckbox(m.formName, record[m.recordName] == "ano")
                break
        }
    })

    changeDopravniProstredek()
}

function showForm() {
    showDialog("form", "form-popis-trasy")
}

function setTextbox(id, value) {
    if (getFormat(id) == "number") {
        value = deformatNumber(value)
        value = formatNumber(value)
    }
    
    $("#form-" + id).val(value).trigger("input")
}

function getTextbox(id) {
    if (id != "datum" && id != "novy-stav-tachometru" && $("#form-" + id).attr("disabled") == "disabled") {
        return ""
    }

    return $("#form-" + id).val()
}

function getFormat(id) {
    return formMapping.find(i => i.formName == id).format
}

function enableTextbox(id, bool) {
    $("#form-" + id).attr("disabled", !bool)

    if (!bool) {
        $("#form-" + id).removeClass("invalid")
        checkTextboxes()
    }
    else {
        validateTextbox(id)
    }
}

function validateTextbox(id) {
    var value = $("#form-" + id).val()
    
    if (getFormat(id) == "number") {
        value = deformatNumber(value)
        var format = formatNumber(value)
        $("#form-" + id).val(format)
    }

    var validation = getValidation(id)
    var second = id == "ujeto-km-soukrome" && calculateKms() > 0

    if (testRegExp(value, validation) || second) {
        $("#form-" + id).removeClass("invalid")
    }
    else {
        $("#form-" + id).addClass("invalid")
    }

    if (id == "ujeto-km-sluzebne") {
        validateTextbox("ujeto-km-soukrome")
        return
    }

    checkTextboxes()
}

function getEnabled(id, index) {
    return formMapping.find(i => i.formName == id).enabled[index]
}

function getValidation(id) {
    return formMapping.find(i => i.formName == id).validation
}

function getInvalidTextboxes() {
    return $("#form :not([disabled]).invalid").toArray()
}

function submitEnabled() {
    return getInvalidTextboxes().length <= 0
}

function checkTextboxes() {
    if (submitEnabled()) {
        $("#form .submit").removeClass("disabled")
    }
    else {
        $("#form .submit").addClass("disabled")
    }
}

function setRadiobox(name, value) {
    $("input[name=form-" + name + "][value=" + value + "]").click()
}

function getRadiobox(name) {
    if ($("input[name=form-" + name + "]").attr("disabled") == "disabled") {
        return ""
    }

    return $("input[name=form-" + name + "]:checked").val()
}

function enableRadiobox(name, bool) {
    $("input[name=form-" + name + "]").attr("disabled", !bool)
}

function setSelection(id, value) {
    value = value != "" ? value : '\u00A0'
    $("#form-" + id + " .select-items div:contains(" + value + ")").click()
}

function getSelection(id) {
    if ($("#form-" + id).attr("disabled") == "disabled") {
        return ""
    }

    return $("#form-" + id + "-select").val()
}

function enableSelection(id, bool) {
    $("#form-" + id).attr("disabled", !bool)
}

function setCheckbox(id, value) {
    $("#check-" + id).prop("checked", value)
}

function getCheckbox(id) {
    if ($("#check-" + id).attr("disabled") == "disabled") {
        return ""
    }

    return $("#check-" + id).prop("checked")
}

function enableCheckbox(id, bool) {
    $("#check-" + id).prop("enabled", !bool)
}

function changeFormType(selected) {
    formMapping.forEach(m => {
        switch (m.type) {
            case "radiobox":
                enableRadiobox(m.formName, m.enabled[selected - 1])
                break
            case "textbox":
                enableTextbox(m.formName, m.enabled[selected - 1])
                break
            case "selection":
                enableSelection(m.formName, m.enabled[selected - 1])
                break
            case "checkbox":
                enableCheckbox(m.formName, m.enabled[selected - 1])
                break
        }
    })

    changeDopravniProstredek()
}

function calculateNovyStav() {
    var prostredek = getSelection("dopravni-prostredek")
    if (prostredek != "AUS") {
        setTextbox("novy-stav-tachometru", "")
        return
    }

    setTextbox("novy-stav-tachometru", calculateDef() + calculateKms())
}

function calculateDef() {
    var sluzebne = $("#form-ujeto-km-sluzebne").attr("data-def")
    var soukrome = $("#form-ujeto-km-soukrome").attr("data-def")
    var novyStav = $("#form-novy-stav-tachometru").attr("data-def")

    sluzebne = sluzebne == undefined ? 0 : deformatNumber(sluzebne)
    soukrome = soukrome == undefined ? 0 : deformatNumber(soukrome)
    novyStav = novyStav == undefined ? 0 : deformatNumber(novyStav)

    return novyStav - sluzebne - soukrome
}

function calculateKms() {
    var sluzebne = getTextbox("ujeto-km-sluzebne")
    var soukrome = getTextbox("ujeto-km-soukrome")

    sluzebne = parseFloat(deformatNumber(sluzebne))
    soukrome = parseFloat(deformatNumber(soukrome))

    if (isNaN(sluzebne)) sluzebne = 0
    if (isNaN(soukrome)) soukrome = 0

    return sluzebne + soukrome
}

function changeDopravniProstredek() {
    calculateNovyStav()

    var prostredek = getSelection("dopravni-prostredek")
    if (prostredek != "AUS") {
        enableTextbox("ujeto-km-sluzebne", false)
        enableTextbox("ujeto-km-soukrome", false)
        enableTextbox("cerpani-ph-litry", false)
        enableTextbox("cerpani-ph-kc", false)
    }
    else {
        var selected = getRadiobox("type")
        enableTextbox("ujeto-km-sluzebne", getEnabled("ujeto-km-sluzebne", selected - 1))
        enableTextbox("ujeto-km-soukrome", getEnabled("ujeto-km-soukrome", selected - 1))
        enableTextbox("cerpani-ph-litry", true)
        enableTextbox("cerpani-ph-kc", true)
    }
}

function getForm() {
    var output = {}

    formMapping.forEach(m => {
        var value

        switch (m.type) {
            case "radiobox":
                value = getRadiobox(m.formName)
                break
            case "textbox":
                value = getTextbox(m.formName)
                break
            case "selection":
                value = getSelection(m.formName)
                break
            case "checkbox":
                value = getCheckbox(m.formName)
                break
        }

        output[m.recordName] = value
    })

    return output
}
