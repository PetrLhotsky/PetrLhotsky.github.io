function showError() {
    hideLoading()
    showDialog("error")
    setTimeout(() => hideError(), 2000)
}

function hideError() {
    hideDialog(() => { return true }, "error")
}
