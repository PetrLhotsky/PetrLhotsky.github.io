function generateTable() {
    for (var i = 1; i < new Date("2024-11-1").getDay(); i++) {
        $("#table").append(generateTableItem(0, " hidden")[1])
    }

    var tachometr = 100000

    for (var i = 1; i <= 30; i++) {
        var [next, html] = generateTableItem(i, "", tachometr)
        tachometr += next
        $("#table").append(html)
    }
}

function generateTableItem(i, c, tachometr) {
    var x = c

    if (i == 0) {
        return [0, '<div id="table-item-' + i + '" class="table-row table-item' + c + '"></div>']
    }
    
    if (new Date("2024-11-" + i).getDay() == 0 || new Date("2024-11-" + i).getDay() == 6) x += " weekend"
    if (i == new Date().getDate()) x += " active"

    var r = Math.floor(Math.random() * 5)

    if (r == 0) {
        return [0, '<div id="table-item-' + i + '" class="table-row table-item' + x + '">\
                        <div id="table-item-' + i + '-prop-0" class="table-column table-column-0">\
                            <span id="table-item-' + i + '-prop-0-check" class="table-check"></span>\
                            <i id="table-item-' + i + '-prop-0-edit" class="fa-solid fa-pen-to-square table-edit"></i>\
                        </div>\
                        <div id="table-item-' + i + '-prop-1" class="table-column table-column-1">' + (i < 10 ? "0" + i : i ) + '. 11.</div>\
                        <div id="table-item-' + i + '-prop-2" class="table-column table-column-2"></div>\
                        <div id="table-item-' + i + '-prop-3" class="table-column table-column-3">AUS</div>\
                        <div id="table-item-' + i + '-prop-4" class="table-column table-column-4">' + addThousandsSpace(tachometr) + '</div>\
                        <div id="table-item-' + i + '-prop-5" class="table-column table-column-5"></div>\
                        <div id="table-item-' + i + '-prop-6" class="table-column table-column-6"></div>\
                        <div id="table-item-' + i + '-prop-7" class="table-column table-column-7"></div>\
                        <div id="table-item-' + i + '-prop-8" class="table-column table-column-8"></div>\
                        <div id="table-item-' + i + '-prop-9" class="table-column table-column-9"></div>\
                        <div id="table-item-' + i + '-prop-10" class="table-column table-column-10"></div>\
                        <div id="table-item-' + i + '-prop-11" class="table-column table-column-11"></div>\
                        <div id="table-item-' + i + '-prop-12" class="table-column table-column-12"></div>\
                        <div id="table-item-' + i + '-prop-13" class="table-column table-column-13 hidden"></div>\
                        <div id="table-item-' + i + '-prop-14" class="table-column table-column-14 hidden"></div>\
                        <div id="table-item-' + i + '-prop-15" class="table-column table-column-15 hidden"></div>\
                        <div id="table-item-' + i + '-prop-16" class="table-column table-column-16 hidden">1</div>\
                    </div>']
    }
    else {
        var next = Math.floor(Math.random() * 100) + 100
        var p1 = Math.floor(Math.random() * 3)
        var p2 = next, p3 = 0
        var typ = 1

        if (p1 == 0) {
            p2 = Math.floor(Math.random() * next)
            p3 = next - p2
        }

        else if (p1 == 1) {
            p2 = ""
            p3 = next
            typ = 2
        }

        return [next, '<div id="table-item-' + i + '" class="table-row table-item' + x + '">\
                        <div id="table-item-' + i + '-prop-0" class="table-column table-column-0">\
                            <span id="table-item-' + i + '-prop-0-check" class="table-check"></span>\
                            <i id="table-item-' + i + '-prop-0-edit" class="fa-solid fa-pen-to-square table-edit"></i>\
                        </div>\
                        <div id="table-item-' + i + '-prop-1" class="table-column table-column-1">' + (i < 10 ? "0" + i : i ) + '. 11.</div>\
                        <div id="table-item-' + i + '-prop-2" class="table-column table-column-2">' + (typ == 2 ? "" : "Praha - Brno") + '</div>\
                        <div id="table-item-' + i + '-prop-3" class="table-column table-column-3">AUS</div>\
                        <div id="table-item-' + i + '-prop-4" class="table-column table-column-4">' + addThousandsSpace(tachometr + next) + '</div>\
                        <div id="table-item-' + i + '-prop-5" class="table-column table-column-5">' + p2 + '</div>\
                        <div id="table-item-' + i + '-prop-6" class="table-column table-column-6">' + p3 + '</div>\
                        <div id="table-item-' + i + '-prop-7" class="table-column table-column-7">20</div>\
                        <div id="table-item-' + i + '-prop-8" class="table-column table-column-8">1 000</div>\
                        <div id="table-item-' + i + '-prop-9" class="table-column table-column-9">500</div>\
                        <div id="table-item-' + i + '-prop-10" class="table-column table-column-10">08:00</div>\
                        <div id="table-item-' + i + '-prop-11" class="table-column table-column-11">16:00</div>\
                        <div id="table-item-' + i + '-prop-12" class="table-column table-column-12">1</div>\
                        <div id="table-item-' + i + '-prop-13" class="table-column table-column-13 hidden">ne</div>\
                        <div id="table-item-' + i + '-prop-14" class="table-column table-column-14 hidden">ano</div>\
                        <div id="table-item-' + i + '-prop-15" class="table-column table-column-15 hidden">ne</div>\
                        <div id="table-item-' + i + '-prop-16" class="table-column table-column-16 hidden">' + typ + '</div>\
                       </div>']
    }
}

generateTable()
