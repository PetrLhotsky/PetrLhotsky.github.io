function generateRandomData() {
    var tachometr = 100000

    for (var i = 1; i <= 30; i++) {
        var next = generateRandomItem(i, tachometr)
        tachometr += next
    }
}

function generateRandomItem(i, tachometr) {
    var r = Math.floor(Math.random() * 4)

    if (r == 0) {     
        $("#table-item-" + i + "-prop-2").text("")
        $("#table-item-" + i + "-prop-3").text("")
        $("#table-item-" + i + "-prop-4").text(addThousandsSpace(tachometr))
        $("#table-item-" + i + "-prop-5").text("")
        $("#table-item-" + i + "-prop-6").text("")
        $("#table-item-" + i + "-prop-7").text("")
        $("#table-item-" + i + "-prop-8").text("")
        $("#table-item-" + i + "-prop-9").text("")
        $("#table-item-" + i + "-prop-10").text("")
        $("#table-item-" + i + "-prop-11").text("")
        $("#table-item-" + i + "-prop-12").text("")
        $("#table-item-" + i + "-prop-13").text("")
        $("#table-item-" + i + "-prop-14").text("")
        $("#table-item-" + i + "-prop-15").text("")
        $("#table-item-" + i + "-prop-16").text(-2)
        
        return 0
    }

    else {
        var next = Math.floor(Math.random() * 100) + 100

        var p1 = Math.floor(Math.random() * 3)
        var p2 = next, p3 = ""
        var typ = 1
        var cod = "08:00"
        var cdo = "16:00"

        if (p1 == 0) {
            p2 = Math.floor(Math.random() * next) + 1
            p3 = next - p2
        }

        else if (p1 == 1) {
            p2 = ""
            p3 = next
            typ = 2
            cod = "\u00A0"
            cdo = "\u00A0"
        }

        $("#table-item-" + i + "-prop-2").text(typ == 2 ? "(soukromá)" : "Praha - Brno")
        $("#table-item-" + i + "-prop-3").text("AUS")
        $("#table-item-" + i + "-prop-4").text(addThousandsSpace(tachometr + next))
        $("#table-item-" + i + "-prop-5").text(p2)
        $("#table-item-" + i + "-prop-6").text(p3)
        $("#table-item-" + i + "-prop-7").text("20")
        $("#table-item-" + i + "-prop-8").text("1 000")
        $("#table-item-" + i + "-prop-9").text("500")
        $("#table-item-" + i + "-prop-10").text(cod)
        $("#table-item-" + i + "-prop-11").text(cdo)
        $("#table-item-" + i + "-prop-12").text("1")
        $("#table-item-" + i + "-prop-13").text("ne")
        $("#table-item-" + i + "-prop-14").text("ano")
        $("#table-item-" + i + "-prop-15").text("ne")
        $("#table-item-" + i + "-prop-16").text(typ)

        return next
    }
}
