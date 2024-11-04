var shortcuts = []

function addShortcut(key, event) {
    shortcuts.push({key: key, event: event})
}

function shortcutEvent(e) {
    if (!e.ctrlKey) return
    e.preventDefault()
    shortcuts.forEach(s => s.key == e.which ? s.event() : null)
}

$(document).on('keydown', shortcutEvent)
