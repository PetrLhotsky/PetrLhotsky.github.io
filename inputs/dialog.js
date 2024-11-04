function appendDialog(parent, id, classes, html, cancelEvent, submitEvent) {
    parent.append('\
        <div class="dialog-container">\
            <dialog open id="' + id + '" class="open ' + classes + '">\
                ' + html + '\
            </dialog>\
        </div>')
    
    $(document).on("click", "#" + id + " .cancel", () => hideDialog(cancelEvent, id))
    $(document).on("click", "#" + id + " .submit", () => hideDialog(submitEvent, id))

    $(document).on("keydown", "*", (e) => {
        if (e.keyCode == 27) {
            hideDialog(cancelEvent, id)
        }
    })
}

function showDialog(id, focus) {
    $(".dialog-container:has(#" + id + ")").removeClass("hidden")
    setTimeout(() => $("#" + id).addClass("open"), 100)
    
    if (focus) {
        $("#" + focus).focus()
    }
}

function hideDialog(event, id) {
    if (event()) {
        $("#" + id).removeClass("open")
        setTimeout(() => $(".dialog-container:has(#" + id + ")").addClass("hidden"), 200)
    }
}
