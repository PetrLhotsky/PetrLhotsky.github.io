const formMapping = [
    { type: "radiobox", formName: "type", recordName: "type", enabled: [true, true, true] },
    { type: "textbox", formName: "datum", recordName: "datum", enabled: [false, false, false] },
    { type: "textbox", formName: "popis-trasy", recordName: "popisTrasy", enabled: [true, false, true], validation: ".+" },
    { type: "textbox", formName: "ujeto-km-sluzebne", recordName: "ujetoKmSluzebne", enabled: [true, false, false], validation: "^(?:[1-9]\\d{0,3})$", format: "number" },
    { type: "textbox", formName: "ujeto-km-soukrome", recordName: "ujetoKmSoukrome", enabled: [true, true, false], validation: "^(?:[1-9]\d{0,3})$", format: "number" },
    { type: "selection", formName: "dopravni-prostredek", recordName: "dopravniProstredek", enabled: [true, true, true] },
    { type: "selection", formName: "pocatecni-cas", recordName: "trvaniOd", enabled: [true, false, true] },
    { type: "selection", formName: "koncovy-cas", recordName: "trvaniDo", enabled: [true, false, true] },
    { type: "textbox", formName: "novy-stav-tachometru", recordName: "tachometr", enabled: [false, false, false], format: "number" },
    { type: "textbox", formName: "cerpani-ph-litry", recordName: "cerpaniPhLi", enabled: [true, true, false], validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?|^$)$", format: "number" },
    { type: "textbox", formName: "cerpani-ph-kc", recordName: "cerpaniPhKc", enabled: [true, true, false], validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?|^$)$", format: "number" },
    { type: "textbox", formName: "ostatni-vydaje-kc", recordName: "ostatniVydaje", enabled: [true, true, true], validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?|^$)$", format: "number" },
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
    $("#form-oblibene-trasy").click(() => favoritesData())

    formMapping.forEach(m => {
        switch (m.formName) {
            case "popis-trasy":
                $(document).on("click", "#form-" + m.formName + "autocomplete-list div", autocompleteKms)
            break
            case "ujeto-km-sluzebne":
            case "ujeto-km-soukrome":
                $("#form-" + m.formName).on("input", () => calculateNovyStav())
            break
            case "dopravni-prostredek":
                $("#form-" + m.formName).click(() => changeDopravniProstredek())
            break
        }
    })
}

function bindFormValidations() {
    formMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                $("#form-" + m.formName).on("input", () => formValidateTextbox(m.formName))
                break
            case "selection":
                $("#form-" + m.formName).on("click", () => formValidateSelection(m.formName))
                break
        }
    })
}

function setFormMore(records) {
    setFormOne(records[0])
    formSetTextbox("datum", records.map(r => r.datum.split(".")[0]).join(", "))
}

function setFormOne(record) {
    if (record.type < 0) {
        record = prepareEmptyRecord(record)
    }

    formMapping.forEach(m => {
        switch (m.type) {
            case "radiobox":
                formSetRadiobox(m.formName, record[m.recordName])
                break
            case "textbox":
                formSetTextbox(m.formName, record[m.recordName])
                if (m.formName == "ujeto-km-sluzebne" || m.formName == "ujeto-km-soukrome" || m.formName == "novy-stav-tachometru") {
                    formSetTextboxAttr(m.formName, "data-def", record[m.recordName])
                }
                if (m.formName == "popis-trasy") {
                    formSetTextboxAttr(m.formName, "data-org", record[m.recordName])
                }
                break
            case "selection":
                formSetSelection(m.formName, record[m.recordName])
                break
            case "checkbox":
                formSetCheckbox(m.formName, record[m.recordName] == "ano")
                break
        }
    })

    changeDopravniProstredek()
    formValidateSelection("pocatecni-cas")
}

function prepareEmptyRecord(record) {
    var empty = getEmpty(record.datum)
    empty["type"] = 1
    empty["dopravniProstredek"] = "AUS"
    empty["trvaniOd"] = '\u00A0'
    empty["trvaniDo"] = '\u00A0'
    empty["tachometr"] = record.tachometr
    return empty
}

function showForm() {
    showDialog("form", "form-popis-trasy")
}

function formSetTextbox(id, value) {
    if (formGetFormat(id) == "number") {
        value = deformatNumber(value)
        value = formatNumber(value)
    }
    
    $("#form-" + id).val(value).trigger("input")
}

function formSetTextboxAttr(id, attr, value) {
    if (formGetFormat(id) == "number") {
        value = deformatNumber(value)
    }

    $("#form-" + id).attr(attr, value)
}

function formGetTextbox(id) {
    if ($("#form-" + id).attr("disabled") == "disabled" && id != "datum") {
        return ""
    }

    return $("#form-" + id).val()
}

function formGetTextboxAttr(id, attr) {
    return $("#form-" + id).attr(attr)
}

function formGetFormat(id) {
    return formMapping.find(i => i.formName == id).format
}

function formEnableTextbox(id, bool) {
    $("#form-" + id).attr("disabled", !bool)

    if (!bool) {
        $("#form-" + id).removeClass("invalid")
        formCheckTextboxes()
    }
    else {
        formValidateTextbox(id)
    }
}

function formValidateTextbox(id, firstAttempt = true) {
    var value = $("#form-" + id).val()
    
    if (formGetFormat(id) == "number") {
        value = deformatNumber(value)
        var format = formatNumber(value)
        $("#form-" + id).val(format)
    }

    var validation = formGetValidation(id)
    var secondary = id == "ujeto-km-soukrome" && calculateKms() > 0
    var tertiary = !(id == "cerpani-ph-litry" || "cerpani-ph-kc") || checkCerpani()

    if ((testRegExp(value, validation) || secondary) && tertiary) {
        $("#form-" + id).removeClass("invalid")
    }
    else {
        $("#form-" + id).addClass("invalid")
    }

    if (id == "ujeto-km-sluzebne") {
        formValidateTextbox("ujeto-km-soukrome")
        return
    }

    if (firstAttempt && id == "cerpani-ph-litry") {
        formValidateTextbox("cerpani-ph-kc", false)
        return
    }

    if (firstAttempt && id == "cerpani-ph-kc") {
        formValidateTextbox("cerpani-ph-litry", false)
        return
    }

    formCheckTextboxes()
}

function formGetEnabled(id, index) {
    return formMapping.find(i => i.formName == id).enabled[index]
}

function formGetValidation(id) {
    return formMapping.find(i => i.formName == id).validation
}

function formGetInvalidTextboxes() {
    return $("#form :not([disabled]).invalid").toArray()
}

function formSubmitEnabled() {
    return formGetInvalidTextboxes().length <= 0
}

function formCheckTextboxes() {
    if (formSubmitEnabled()) {
        $("#form .submit").removeClass("disabled")
    }
    else {
        $("#form .submit").addClass("disabled")
    }
}

function formSetRadiobox(name, value) {
    value = value != "" ? value : 1
    $("input[name=form-" + name + "][value=" + value + "]").click()
}

function formGetRadiobox(name) {
    if ($("input[name=form-" + name + "]").attr("disabled") == "disabled") {
        return ""
    }

    return $("input[name=form-" + name + "]:checked").val()
}

function formEnableRadiobox(name, bool) {
    $("input[name=form-" + name + "]").attr("disabled", !bool)
}

function formSetSelection(id, value) {
    value = value != "" ? value : '\u00A0'
    $("#form-" + id + " .select-items div:contains(" + value + ")").click()
}

function formGetSelection(id) {
    if ($("#form-" + id).attr("disabled") == "disabled") {
        return ""
    }

    return $("#form-" + id + "-select").val()
}

function formEnableSelection(id, bool) {
    $("#form-" + id).attr("disabled", !bool)
}

function formValidateSelection(id, firstAttempt = true) {
    var quaternary = !(id == "pocatecni-cas" || "koncovy-cas") || checkCasy()

    if (quaternary) {
        $("#form-" + id).removeClass("invalid")
    }
    else {
        $("#form-" + id).addClass("invalid")
    }

    if (firstAttempt && id == "pocatecni-cas") {
        formValidateSelection("koncovy-cas", false)
        return
    }
    if (firstAttempt && id == "koncovy-cas") {
        formValidateSelection("pocatecni-cas", false)
        return
    }

    formCheckTextboxes()
}

function formSetCheckbox(id, value) {
    $("#check-" + id).prop("checked", value)
}

function formGetCheckbox(id) {
    if ($("#check-" + id).attr("disabled") == "disabled") {
        return ""
    }

    return $("#check-" + id).prop("checked")
}

function formEnableCheckbox(id, bool) {
    $("#check-" + id).prop("enabled", !bool)
}

function changeFormType(selected) {
    formMapping.forEach(m => {
        switch (m.type) {
            case "radiobox":
                formEnableRadiobox(m.formName, m.enabled[selected - 1])
                break
            case "textbox":
                formEnableTextbox(m.formName, m.enabled[selected - 1])
                break
            case "selection":
                formEnableSelection(m.formName, m.enabled[selected - 1])
                break
            case "checkbox":
                formEnableCheckbox(m.formName, m.enabled[selected - 1])
                break
        }
    })
    
    if (selected != 2) {
        if ($("#form-popis-trasy").val() == "(soukromá)") {
            var org = formGetTextboxAttr("popis-trasy", "data-org")
            formSetTextbox("popis-trasy", org != "(soukromá)" ? org : "")
        }
    }
    else {
        if ($("#form-popis-trasy").val() == "") {
            formSetTextbox("popis-trasy", "(soukromá)")
        }
    }

    changeDopravniProstredek()
}

function autocompleteKms() {
    var [sluzebne, soukrome] = $("#form-popis-trasy").attr("data-autocomplete").split(";")
    formSetTextbox("ujeto-km-sluzebne", sluzebne)
    formSetTextbox("ujeto-km-soukrome", soukrome)
}

function changeDopravniProstredek() {
    var selected = formGetRadiobox("type")
    var prostredek = formGetSelection("dopravni-prostredek")
    var aus = prostredek == "AUS"

    formEnableTextbox("ujeto-km-sluzebne", aus ? formGetEnabled("ujeto-km-sluzebne", selected - 1) : false)
    formEnableTextbox("ujeto-km-soukrome", aus ? formGetEnabled("ujeto-km-soukrome", selected - 1) : false)
    formEnableTextbox("cerpani-ph-litry", aus)
    formEnableTextbox("cerpani-ph-kc", aus)

    calculateNovyStav()
}

function calculateNovyStav() {
    var prostredek = formGetSelection("dopravni-prostredek")
    if (prostredek != "AUS") {
        formSetTextbox("novy-stav-tachometru", "")
        return
    }

    formSetTextbox("novy-stav-tachometru", calculateDef() + calculateKms())
}

function calculateDef() {
    var sluzebne = formGetTextboxAttr("ujeto-km-sluzebne", "data-def")
    var soukrome = formGetTextboxAttr("ujeto-km-soukrome", "data-def")
    var novyStav = formGetTextboxAttr("novy-stav-tachometru", "data-def")

    sluzebne = sluzebne == undefined || sluzebne == "" ? 0 : parseFloat(deformatNumber(sluzebne))
    soukrome = soukrome == undefined || soukrome == "" ? 0 : parseFloat(deformatNumber(soukrome))
    novyStav = novyStav == undefined || novyStav == "" ? 0 : parseFloat(deformatNumber(novyStav))

    return novyStav - sluzebne - soukrome
}

function calculateKms() {
    var sluzebne = formGetTextbox("ujeto-km-sluzebne")
    var soukrome = formGetTextbox("ujeto-km-soukrome")

    sluzebne = parseFloat(deformatNumber(sluzebne))
    soukrome = parseFloat(deformatNumber(soukrome))

    if (isNaN(sluzebne)) sluzebne = 0
    if (isNaN(soukrome)) soukrome = 0

    return sluzebne + soukrome
}

function checkCerpani() {
    var litry = formGetTextbox("cerpani-ph-litry")
    var kc = formGetTextbox("cerpani-ph-kc")

    litry = parseFloat(deformatNumber(litry))
    kc = parseFloat(deformatNumber(kc))

    if (isNaN(litry)) litry = 0
    if (isNaN(kc)) kc = 0

    return (litry == 0 && kc == 0) || (litry > 0 && kc > 0)
}

function checkCasy() {
    var pocatecni = formGetSelection("pocatecni-cas")
    var koncovy = formGetSelection("koncovy-cas")

    if (pocatecni.length < 4 && koncovy.length < 4) {
        return true
    }

    return compareCasy(pocatecni, koncovy)
}

function getForm() {
    var output = {}

    formMapping.forEach(m => {
        var value

        switch (m.type) {
            case "radiobox":
                value = formGetRadiobox(m.formName)
                break
            case "textbox":
                value = formGetTextbox(m.formName)
                break
            case "selection":
                value = formGetSelection(m.formName)
                break
            case "checkbox":
                value = formGetCheckbox(m.formName)
                break
        }

        output[m.recordName] = value
    })

    if (output.type == 2) {
        output.popisTrasy = "(soukromá)"
    }

    return output
}

function favoritesData() {
    selectFavoritesFromDb()
}

function cancelFavorites() {
    return true
}

function saveFavorites() {
    if (!favoritesSubmitEnabled()) {
        return false
    }

    var data = getFavorites()
    insertFavoritesIntoDb(data)
    return true
}

function selectFavoritesFromDb() {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbSelectFavorites(user, (data) => {
        setFavoritesMore(data)
        hideLoading()
        showFavorites()
    })
}

function insertFavoritesIntoDb(data) {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbClearFavorites(user, () => {
        var count = 0
        data.forEach(d => insertFavoriteIntoDb(d, () => {
            count++
            if (count == data.length) {
                selectFavoritesAcFromDb()
            }
        }))
        hideLoading()
    })
}

function insertFavoriteIntoDb(data, callback) {
    var [user, vehicle, month, year] = currentSelections()
    data.user = user
    data.vehicle = vehicle
    data.year = year
    data.month = month
    dbInsertFavorite(data, callback)
}
