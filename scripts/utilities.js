function addLeadingZero(number) {
    return number < 10 ? "0" + number : number
}



function removeLeadingZeros(number) {
    return number == 0 ? 0 : Number(number)
}



function addThousandsSpace(number) {
    return number ? new Intl.NumberFormat('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 4 }).format(number).replace(/\u00A0/g, ' ') : ""
}



function removeThousandsSpace(number) {
    return number.toString().replace(/\s+/g, "")
}



function getDecimalSeparator() {
    var testNumber = new Intl.NumberFormat("cs-CZ").format(1.1);
    return testNumber.charAt(testNumber.indexOf("1") + 1);
}



function formatNumber(value) {
    var comma = testRegExp(value, "[.]0*$")
    
    if (!isNaN(value)) {
        var format = addThousandsSpace(value)
        if (comma) {
            format +=  getDecimalSeparator() + value.split(".")[1]
        }
        return format
    }

    return value
}



function deformatNumber(value) {
    value = removeThousandsSpace(value)
    value = value.replace(",", ".")
    return value
}



function extractNumber(text, prefix, postfix) {
    var regexp = new RegExp(prefix + "(\\d+)" + postfix)
    var match = text.match(regexp)
    
    if (match) {
        return match[1]
    }

    return false
}



function testRegExp(text, pattern) {
    var regexp = new RegExp(pattern)
    var test = regexp.test(text)

    return test
}



function isWeekend(date) {
    return date.getDay() == 0 || date.getDay() == 6
}



function isToday(date) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate()
}



function getMesiceList(start, end) {
    if (end == null) {
        const now = new Date()
        end = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
    }

    const monthNames = [
        "leden", "únor", "březen", "duben", "květen", "červen",
        "červenec", "srpen", "září", "říjen", "listopad", "prosinec"
    ]

    const startDate = new Date(`${start}-01`)
    const endDate = new Date(`${end}-01`)
    const result = [{ value: 0, label: "měsíc a rok" }]

    while (startDate <= endDate) {
        const year = startDate.getFullYear()
        const month = startDate.getMonth() + 1
        const monthLabel = monthNames[month - 1]
        const monthValue = `${month.toString().padStart(2, '0')}-${year}`

        result.push({ value: monthValue, label: `${monthLabel} ${year}` })

        startDate.setMonth(startDate.getMonth() + 1)
    }

    return result
}



function getCurrentMY() {
    const monthNames = [
        "leden", "únor", "březen", "duben", "květen", "červen",
        "červenec", "srpen", "září", "říjen", "listopad", "prosinec"
    ];

    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()

    return `${monthNames[month]} ${year}`
}



function getDopravniProstredkyList() {
    return [
        {value: "vyberte", label: "vyberte"},
        {value: "AUS", label: "AUS"},
        {value: "MHD", label: "MHD"},
        {value: "MOT", label: "MOT"}
    ]
}



function getPocatecniCasyList() {
    var output = [{value: "nic", label: "nic"}]
    output.push({value: "", label: '\u00A0'})
    output.push({value: "00:01", label: "00:01"})
    output.push(...getObecneCasyList(1))
    return output
}



function getKoncoveCasyList() {
    var output = [{value: "nic", label: "nic"}]
    output.push({value: "", label: '\u00A0'})
    output.push(...getObecneCasyList(0))
    output.push({value: "23:59", label: "23:59"})
    return output
}



function getObecneCasyList() {
    var output = []
    for (var h = 0; h < 24; h++) {
        for (var m = 0; m < 60; m+=30) {
            var x = addLeadingZero(h) + ":" + addLeadingZero(m)
            output.push({value: x, label: x})
        }   
    }
    return output
}



function compareCasy(start, end) {
    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)

    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute

    return startTotalMinutes < endTotalMinutes;
}



function getNakladyObsahList() {
    return [
        { label: "jízdné" },
        { label: "občerstvení" },
        { label: "ubytování" },
        { label: "parkovné" },
        { label: "auto - spotřeba PH" },
        { label: "auto - oprava, údržba, mytí" },
        { label: "auto - drob. materiál" },
        { label: "náhr. za použití soukr. auta" },
        { label: "dálniční známka" },
        { label: "kancelářské potřeby" },
        { label: "jiné admin služby" },
        { label: "PC - spotřební mat." },
        { label: "PC - služby (opr.)" },
        { label: "poštovné" },
        { label: "materiál drobný" },
        { label: "nářadí drobné" }
    ]
}
