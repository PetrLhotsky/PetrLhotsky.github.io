function appendDialog(parent, id, classes, html, cancelEvent, submitEvent, submit2Event, submit3Event) {
    parent.append('\
        <div class="dialog-container hidden">\
            <dialog open id="' + id + '" class="' + classes + '">\
                ' + html + '\
            </dialog>\
        </div>')
    
    $(document).on("click", "#" + id + " .cancel", () => hideDialog(cancelEvent, id))
    $(document).on("click", "#" + id + " .submit", () => hideDialog(submitEvent, id))

    if (submit2Event) {
        $(document).on("click", "#" + id + " .submit2", () => hideDialog(submit2Event, id))

        if (submit3Event) {
            $(document).on("click", "#" + id + " .submit3", () => hideDialog(submit3Event, id))
        }
    }

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
    if (event != null && event()) {
        $("#" + id).removeClass("open")
        setTimeout(() => $(".dialog-container:has(#" + id + ")").addClass("hidden"), 200)
    }
}
