function generateTable() {
    for (var i = 1; i < new Date("2024-10-1").getDay(); i++) {
        $("#table").append(generateTableItem(0, " hidden"));
    }

    for (var i = 1; i <= 31; i++) {
        $("#table").append(generateTableItem(i, ""));
    }
}

function generateTableItem(i, c) {
    var x = c;

    if (new Date("2024-10-" + i).getDay() == 0 || new Date("2024-10-" + i).getDay() == 6) x += " weekend";
    if (i == new Date().getDate()) x += " active";

    return i != 15 ? '<div id="table-item-' + i + '" class="table-row table-item' + x + '">\
                        <div id="table-item-' + i + '-prop-0" class="table-column table-column-0">\
                            <span id="table-item-' + i + '-prop-0-check" class="table-check"></span>\
                            <i id="table-item-' + i + '-prop-0-edit" class="fa-solid fa-pen-to-square table-edit"></i> upravit\
                        </div>\
                        <div id="table-item-' + i + '-prop-1" class="table-column table-column-1">' + (i < 10 ? "0" + i : i ) + '. 10.</div>\
                        <div id="table-item-' + i + '-prop-2" class="table-column table-column-2">Praha - Brno</div>\
                        <div id="table-item-' + i + '-prop-3" class="table-column table-column-3">AUS</div>\
                        <div id="table-item-' + i + '-prop-4" class="table-column table-column-4">100 000</div>\
                        <div id="table-item-' + i + '-prop-5" class="table-column table-column-5">400</div>\
                        <div id="table-item-' + i + '-prop-6" class="table-column table-column-6">50</div>\
                        <div id="table-item-' + i + '-prop-7" class="table-column table-column-7">20</div>\
                        <div id="table-item-' + i + '-prop-8" class="table-column table-column-8">1 000</div>\
                        <div id="table-item-' + i + '-prop-9" class="table-column table-column-9">500</div>\
                        <div id="table-item-' + i + '-prop-10" class="table-column table-column-10">08:00</div>\
                        <div id="table-item-' + i + '-prop-11" class="table-column table-column-11">16:00</div>\
                        <div id="table-item-' + i + '-prop-12" class="table-column table-column-12">1</div>\
                        <div id="table-item-' + i + '-prop-13" class="table-column table-column-13 hidden">ne</div>\
                        <div id="table-item-' + i + '-prop-14" class="table-column table-column-14 hidden">ano</div>\
                        <div id="table-item-' + i + '-prop-15" class="table-column table-column-15 hidden">ne</div>\
                        <div id="table-item-' + i + '-prop-16" class="table-column table-column-16 hidden">' + ((i % 3) + 1) + '</div>\
                    </div>'
            : '     <div id="table-item-' + i + '" class="table-row table-item' + x + '">\
                        <div id="table-item-' + i + '-prop-0" class="table-column table-column-0">\
                            <span id="table-item-' + i + '-prop-0-check" class="table-check"></span>\
                            <i id="table-item-' + i + '-prop-0-edit" class="fa-solid fa-pen-to-square table-edit"></i> upravit\
                        </div>\
                        <div id="table-item-' + i + '-prop-1" class="table-column table-column-1">' + (i < 10 ? "0" + i : i ) + '. 10.</div>\
                        <div id="table-item-' + i + '-prop-2" class="table-column table-column-2"></div>\
                        <div id="table-item-' + i + '-prop-3" class="table-column table-column-3"></div>\
                        <div id="table-item-' + i + '-prop-4" class="table-column table-column-4"></div>\
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
                        <div id="table-item-' + i + '-prop-16" class="table-column table-column-16 hidden">' + ((i % 3) + 1) + '</div>\
                    </div>';
}

generateTable();
