//$("#nav-panel-item-7").click()

function setSummary(data, tanks, costs) {
    var [month, year] = $("#selection-mo-select").val().split("-")

    //console.log(data)
    //console.log(tanks)
    //console.log(costs)

    var dnuVMesici = getDaysOfMonth(year, month),
        pocetTras = dataPocetTras(data),
        pouzitoAUS = dataPouzitoAUS(data),
        konecnyStavTachometru = tachometrKonec(data),
        ujetoKmSluzebne = dataSum(data, "ujetoKmSluzebne"),
        ujetoKmSoukrome = dataSum(data, "ujetoKmSoukrome"),
        cerpaniPhLi = dataSum(data, "cerpaniPhLi"),
        cerpaniPhKc = dataSum(data, "cerpaniPhKc"),
        ostatniVydaje = dataSum(data, "ostatniVydaje")
        pocetHodin = dataSum(data, "pocetHodin"),
        pocetJidel = dataSum(data, "poskytnutaJidla"),
        sazbyVyhlaska = dataSum(data, "vyhlaskaMAX"),
        sazbyKarcher = dataSum(data, "karcher"),
        kraceniStravnehoVyhlaska = dataSum(data, "stravneVyhlaskaMAX"),
        kraceniStravnehoKarcher = dataSum(data, "stravneKarcher"),
        nadlimitKDodaneni = kraceniStravnehoKarcher - kraceniStravnehoVyhlaska

    var zacatekMesice = tanks.length > 0 ? tanks[0].zacatek : 0,
        konecMesice = tanks.length > 0 ? tanks[0].konec : 0

    var spotrebaLi100km = 100 * (cerpaniPhLi + zacatekMesice - konecMesice) / (ujetoKmSluzebne + ujetoKmSoukrome),
        nakupPhKc1Li = cerpaniPhKc / cerpaniPhLi,
        nakupPhKc1Km = cerpaniPhKc / (ujetoKmSluzebne + ujetoKmSoukrome)

    var celkemNajetoKm = ujetoKmSluzebne + ujetoKmSoukrome,
        zTohoSoukrome = ujetoKmSoukrome,
        podilSoukromychKm = zTohoSoukrome / celkemNajetoKm,
        vysledekKontroly = podilSoukromychKm <= 0.06 ? "ok" : "překročeno"

    var vedlejsiNaklady = dataSum(costs, "castka"),
        ostatniVydaje = dataSum(data, ostatniVydaje)

    var stravneAVedlNakladyCelkem = kraceniStravnehoKarcher + vedlejsiNaklady + ostatniVydaje

    var naftaZeSoukromychKm = zTohoSoukrome * nakupPhKc1Km

    $("#summary-101").val(dnuVMesici)
    $("#summary-102").val(pocetTras)
    $("#summary-103").val(pouzitoAUS)
    $("#summary-104").val(formatNumber(konecnyStavTachometru))
    $("#summary-105").val(formatNumber(ujetoKmSluzebne))
    $("#summary-106").val(formatNumber(ujetoKmSoukrome))
    $("#summary-107").val(formatNumber(cerpaniPhLi))
    $("#summary-108").val(formatNumber(cerpaniPhKc))
    $("#summary-109").val(formatNumber(ostatniVydaje))
    $("#summary-110").val(formatNumber(pocetHodin))
    $("#summary-111").val(formatNumber(pocetJidel))
    $("#summary-112").val(formatNumber(sazbyVyhlaska))
    $("#summary-113").val(formatNumber(sazbyKarcher))
    $("#summary-114").val(formatNumber(kraceniStravnehoVyhlaska))
    $("#summary-115").val(formatNumber(kraceniStravnehoKarcher))
    $("#summary-116").val(formatNumber(nadlimitKDodaneni))

    spotrebaLi100km = Number.isNaN(spotrebaLi100km) ? 0 : spotrebaLi100km
    nakupPhKc1Li = Number.isNaN(nakupPhKc1Li) ? 0 : nakupPhKc1Li
    nakupPhKc1Km = Number.isNaN(nakupPhKc1Km) ? 0 : nakupPhKc1Km
    podilSoukromychKm = Number.isNaN(podilSoukromychKm) ? 0 : podilSoukromychKm
    vysledekKontroly = podilSoukromychKm <= 0.06 ? "ok" : "překročeno"
    naftaZeSoukromychKm = Number.isNaN(naftaZeSoukromychKm) ? 0 : naftaZeSoukromychKm

    $("#summary-1").val(formatNumber(spotrebaLi100km.toFixed(2)))
    $("#summary-2").val(formatNumber(nakupPhKc1Li.toFixed(2)))
    $("#summary-3").val(formatNumber(nakupPhKc1Km.toFixed(2)))
    $("#summary-4").val(formatNumber(celkemNajetoKm))
    $("#summary-5").val(formatNumber(zTohoSoukrome))
    $("#summary-6").val(formatNumber((100 * podilSoukromychKm).toFixed(2)) + " %")
    $("#summary-7").val(formatNumber(vysledekKontroly))

    $("#summary-8").val(formatNumber(stravneAVedlNakladyCelkem))
    $("#summary-9").val("-")
    $("#summary-10").val("-")

    $("#summary-11").val(formatNumber(naftaZeSoukromychKm.toFixed(2)))

    $("#summary-12").val(formatNumber(zacatekMesice))
    $("#summary-13").val(formatNumber(konecMesice))
    $("#summary-14").val(formatNumber(vedlejsiNaklady))
}

function showSummary() {
    showDialog("summary")
}

function getDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

function dataPocetTras(data) {
    return data.reduce((count, d) => {
        return d.popisTrasy && d.popisTrasy.trim() != "" ? count + 1 : count
    }, 0)
}

function dataPouzitoAUS(data) {
    return data.reduce((count, d) => {
        return d.dopravniProstredek && d.dopravniProstredek == "AUS" ? count + 1 : count
    }, 0)
}

function dataMin(data, attr) {
    var min = Math.min(...data.map(d => d[attr]))
    var index = data.findIndex(d => d[attr] == min)
    return [min, index]
}

function dataMax(data, attr) {
    var min = Math.max(...data.map(d => d[attr]))
    var index = data.findIndex(d => d[attr] == min)
    return [min, index]
}

function tachometrPocatek(data) {
    if (data.length <= 0) return 0

    var [min, index] = dataMin(data, "tachometr")
    var den = data[index].day_num
    var ujetoKmCelkem = deformatNumber(data[index].ujetoKmCelkem)
    return min - (den > 1 ? ujetoKmCelkem : 0)
}

function tachometrKonec(data) {
    if (data.length <= 0) return 0

    var [max] = dataMax(data, "tachometr")
    return max
}

function dataSum(data, attr) {
    return data.reduce((sum, d) => {
        return d[attr] != "" && d[attr] != null ? sum + parseInt(deformatNumber(d[attr])) : sum
    }, 0)
}

function checkAllowance() {
    showLoading()
    var [user, vehicle, month, year] = currentSelections()
    dbSelectTravelsSummary(user, vehicle, year, month, (data) => {
        setAllowanceMore(data)
        hideLoading()
        showAllowance()
    })
}

function cancelAllowance() {
    return true
}
