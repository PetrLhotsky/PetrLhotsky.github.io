function addLeadingZero(number) {
    return number < 10 ? "0" + number : number
}



function removeLeadingZeros(number) {
    return number == 0 ? 0 : Number(number)
}



function addThousandsSpace(number) {
    return number ? new Intl.NumberFormat('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 4 }).format(number) : ""
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



function getPocatecniCasyList() {
    var output = [{value: "vyberte", label: "vyberte"}]
    output.push({value: "", label: '\u00A0'})
    output.push({value: "00:01", label: "00:01"})
    output.push(...getObecneCasyList(1))
    return output
}



function getKoncoveCasyList() {
    var output = [{value: "vyberte", label: "vyberte"}]
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
