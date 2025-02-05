function appendToggle(parent, id, classes, clickEvent) {
    parent.append('\
        <label id="' + id + '" class="toggle ' + classes + '">\
            <input type="checkbox">\
            <span class="slider round"></span>\
        </label>')

    $(document).on("click", "#" + id + ">input", clickEvent)
}
