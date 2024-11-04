function appendRadiobox(parent, id, classes, label, name, value) {
    parent.append('\
        <label id="' + id + '" class="radiobox ' + classes + '">' + label + '\
            <input type="radio" name="' + name + '" value="' + value + '">\
            <span class="radiomark"></span>\
        </label>')
}
