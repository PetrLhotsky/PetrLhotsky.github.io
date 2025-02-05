var pole = []
var obrazek = []

var pocetotocenejch = 0

var prvniotocena = 0
var druhaotocena = 0

var prvnicislo = 0
var druhecislo = 0

var deklikat = 1

var pocetvotocenych = 0
var pocetparu = 0
var neotacetpary = 0

var poslednipromena = []



for (var i = 1; i <= 16; i++) {
    var promena = 0

    do {
        promena = Math.round(Math.random() * 15 + 1)
    } while (pole.includes(promena))

    pole.push(promena)
    obrazek.push(promena)
}



$(".karta").click(function(e) {
    neotacetpary = 0

    if (deklikat == 1) {
        pocetotocenejch = pocetotocenejch + 1
        var id = $(this).attr('id');

        if (!poslednipromena.includes(id)) {
            var cislo = parseInt(id.replace("karta", ""))
            $("#" + id).css("background-image", "url(\"" + obrazek[cislo - 1] + ".webp\")")

            console.log(pocetotocenejch)

            if (pocetotocenejch == 1) {
                prvniotocena = id
                prvnicislo = obrazek[cislo - 1]
            }

            if (pocetotocenejch == 2) {
                druhaotocena = id
                druhecislo = obrazek[cislo - 1]

                if (druhaotocena == prvniotocena) {
                    pocetotocenejch = 1
                }

                else {
                    console.log("next move")
                    console.log(prvnicislo, druhecislo)

                    deklikat = 0

                    pocetvotocenych = pocetvotocenych + 1
                    $("#pocetotocenych").text("Number of turns: " + pocetvotocenych + "")

                    if (druhecislo % 2 == 0) {
                        if (prvnicislo % 2 == 1) {
                            if (druhecislo == prvnicislo + 1) {
                                pocetparu = pocetparu + 1
                                $("#pocetparuotocenejch").text("Number of pairs: " + pocetparu + "")

                                neotacetpary = 1
                                poslednipromena.push(prvniotocena, druhaotocena)
                                
                                checkPairs()
                            }
                        }
                    }

                    if (druhecislo % 2 == 1) {
                        if (prvnicislo % 2 == 0) {
                            if (druhecislo == prvnicislo - 1) {
                                pocetparu = pocetparu + 1
                                $("#pocetparuotocenejch").text("Number of pairs: " + pocetparu + "")

                                neotacetpary = 1
                                poslednipromena.push(prvniotocena, druhaotocena)
                                
                                checkPairs()
                            }
                        }
                    }
                   
                    if (neotacetpary == 0) {
                        setTimeout(function() {
                            $("#" + prvniotocena).css("background-image", "none")
                            $("#" + druhaotocena).css("background-image", "none")

                            deklikat = 1
                        }, 2000);
                    }
                    
                    else {
                        deklikat = 1
                    }

                    pocetotocenejch = 0
                }
            }
        }
    }
})


// Coolest Projects
function checkPairs() {
    if (poslednipromena.length == 16) {
        if (pocetvotocenych <= 24) {
            setTimeout(() => {
                alert("You win, congratulations!")
                changeDone(true)
                closeGame()
            })
        }
        else {
            setTimeout(() => {
                alert("You lose, but it doesn't matter. Click the close button and try again.")
            })
        }
    }
}