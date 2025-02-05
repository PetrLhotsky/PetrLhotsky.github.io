function appendCheckbox(parent, id, classes, label, name) {
    parent.append('\
        <label id="' + id + '" class="checkbox ' + classes + '">' + label + '\
            <input type="checkbox" id=' + name + '>\
            <span class="checkmark"></span>\
        </label>')
}
