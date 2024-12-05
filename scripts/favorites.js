const favoritesMapping = [
    { type: "textbox", favoritesName: "popis", recordName: "popis", enabled: true, validation: ".+" },
    { type: "textbox", favoritesName: "kmSluzebne", recordName: "kmSluzebne", enabled: true, validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?)$", format: "number" },
    { type: "textbox", favoritesName: "kmSoukrome", recordName: "kmSoukrome", enabled: true, validation: "^(?:[0-9]\\d{0,3}(?:[.]\\d+)?|0(?:[.]\\d+)?)$", format: "number" },
]

bindFavoritesActions()
bindFavoritesValidations()

function bindFavoritesActions() {
    $(document).on("click", ".favorites-delete", (e) => deleteFavoritesRecord(e.target.id))
    $(document).on("click", "#favorites-insert", () => insertFavoritesRecord())
}

function bindFavoritesValidations() {
    favoritesMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                $(document).on("input", ".favorites-" + m.favoritesName, (e) => favoritesValidateTextbox(e.target))
                break
        }
    })
}

function setFavoritesMore(records) {
    $("#favorites-rows").empty()
    records.forEach(r => setFavoritesOne(r))
}

function setFavoritesOne(record) {
    var id = favoritesRowsCount()
    $("#favorites-rows").append(favoritesHtmlRecord(id))

    if (record == null) {
        return
    }
    
    favoritesMapping.forEach(m => {
        switch (m.type) {
            case "textbox":
                favoritesSetTextbox(m.favoritesName, record[m.recordName], id)
                break
        }
    })
}

function showFavorites() {
    showDialog("favorites")
}

function favoritesSetTextbox(id, value, recordId) {
    if (favoritesGetFormat(id) == "number") {
        value = deformatNumber(value)
        value = formatNumber(value)
    }
    
    $("#favorites-" + id + "-" + recordId).val(value).trigger("input")
}

function favoritesGetTextbox(id, recordId) {
    if ($("#favorites-" + id + "-" + recordId).attr("disabled") == "disabled") {
        return ""
    }

    return $("#favorites-" + id + "-" + recordId).val()
}

function favoritesGetFormat(id) {
    return favoritesMapping.find(i => i.favoritesName == id).format
}

function favoritesEnableTextbox(id, bool, recordId) {
    $("#favorites-" + id + "-" + recordId).attr("disabled", !bool)

    if (!bool) {
        $("#favorites-" + id + "-" + recordId).removeClass("invalid")
        favoritesCheckTextboxes()
    }
    else {
        favoritesValidateTextbox(id)
    }
}

function favoritesValidateTextbox(textbox) {
    var value = $(textbox).val()

    var id = $(textbox).attr("class").split("-")[1].split(" ")[0]
    
    if (favoritesGetFormat(id) == "number") {
        value = deformatNumber(value)
        var format = formatNumber(value)
        $(textbox).val(format)
    }
    
    var validation = favoritesGetValidation(id)

    if (testRegExp(value, validation)) {
        $(textbox).removeClass("invalid")
    }
    else {
        $(textbox).addClass("invalid")
    }

    favoritesCheckTextboxes()
}

function favoritesGetValidation(id) {
    return favoritesMapping.find(i => i.favoritesName == id).validation
}

function favoritesGetInvalidTextboxes() {
    return $("#favorites :not([disabled]).invalid").toArray()
}

function favoritesSubmitEnabled() {
    return favoritesGetInvalidTextboxes().length <= 0
}

function favoritesCheckTextboxes() {
    if (favoritesSubmitEnabled()) {
        $("#favorites .submit").removeClass("disabled")
    }
    else {
        $("#favorites .submit").addClass("disabled")
    }
}

function favoritesRowsCount() {
    var rows = $("#favorites .dialog-row[id]").toArray()
    var max = 0
    rows.forEach(row => {
        var id = parseInt(row.id.split('-').pop())
        if (id > max) {
            max = id
        }
    })
    return max + 1
}

function favoritesHtmlRecord(id) {
    return '\
    <div id="favorites-row-' + id + '" class="dialog-row">\
        <div class="dialog-column">\
            <label id="favorites-delete-' + id + '" class="dialog-label dialog-action favorites-delete">\
                <i class="fa-solid fa-trash"></i>\
                odstranit\
            </label>\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="favorites-popis-' + id + '" id="favorites-popis-' + id + '" class="favorites-popis invalid" tabindex="4' + id + '1" autocomplete="off">\
        </div>\
        <div class="dialog-column">\
            <div></div>\
            <input type="text" name="favorites-kmSluzebne-' + id + '" id="favorites-kmSluzebne-' + id + '" class="favorites-kmSluzebne invalid" tabindex="4' + id + '2" autocomplete="off">\
        </div>\
        <div class="dialog-column">\
            <input type="text" name="favorites-kmSoukrome-' + id + '" id="favorites-kmSoukrome-' + id + '" class="favorites-kmSoukrome invalid" tabindex="4' + id + '3" autocomplete="off">\
        </div>\
    </div>'
}

function deleteFavoritesRecord(originalId) {
    var id = extractNumber(originalId, "delete-", "")
    $("#favorites-row-" + id).remove()
    favoritesCheckTextboxes()
}

function insertFavoritesRecord() {
    setFavoritesOne()
    favoritesCheckTextboxes()
}

function getFavorites() {
    var output = []
    $("#favorites .dialog-row[id]").toArray().forEach(row => {
        var id = parseInt(row.id.split('-').pop())
        output.push(getFavorite(id))
    })
    return output
}

function getFavorite(id) {
    var output = {}

    favoritesMapping.forEach(m => {
        var value

        switch (m.type) {
            case "textbox":
                value = favoritesGetTextbox(m.favoritesName, id)
                break
        }

        output[m.recordName] = value
    })

    return output
}
