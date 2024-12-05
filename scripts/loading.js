function showLoading(show) {
    if (show) showDialog("loading")
}

function hideLoading(hide) {
    if (hide) hideDialog(() => { return true }, "loading")
}
