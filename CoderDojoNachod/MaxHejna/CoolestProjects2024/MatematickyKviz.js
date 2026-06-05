        var spravne = 0
        var spatne = 0

        var level
        var casovac
        var cas
        var spravnyvysledek
        var hromadaprikladu



        $("#procenta").hide()
        $("#znamka").hide()
        $("#hra").hide()



        $("#pocetprikladu").on("input", function(event) {
            var value = event.target.value
            $("#pocet").text(value)
        })

        $("#level1").click(function() {
            spustitHru(1)
        })

        $("#level2").click(function() {
            spustitHru(2)
        })

        $("#level3").click(function() {
            spustitHru(3)
        })



        function spustitHru(zvoleno) {
            $("#menu").hide()
            $("#pocetprikladu").hide()
            $("#pocet").hide()
            $("#hra").show()

            level = zvoleno
            hromadaprikladu = $("#pocetprikladu").val()
            
            generovatPriklad()
        }



        function generovatPriklad() {
            resetovatCasovac()

            if (spravne+spatne == hromadaprikladu) {
                zobrazZnamku()
                return
            }

            var znamenko = parseInt(Math.random() * 4)

            if (znamenko == 0) {                    // sčítání

                if (level == 1) {
                    A = parseInt(Math.random() * 10)
                    B = parseInt(Math.random() * 10)
                }
                if (level == 2) {
                    A = parseInt(Math.random() * 100)
                    B = parseInt(Math.random() * 100)
                }
                if (level == 3) {
                    A = parseInt(Math.random() * 1000)
                    B = parseInt(Math.random() * 1000)
                }

                $("#priklad").text(A + "+" + B)
                spravnyvysledek = A + B
            }

            if (znamenko == 1) {                    // odčítání

                if (level == 1) {
                    G = parseInt(Math.random() * 10)
                    H = parseInt(Math.random() * G)
                }
                if (level == 2) {
                    G = parseInt(Math.random() * 100)
                    H = parseInt(Math.random() * G)
                }
                if (level == 3) {
                    G = parseInt(Math.random() * 1000)
                    H = parseInt(Math.random() * G)
                }

                $("#priklad").text(G + "-" + H)
                spravnyvysledek = G - H
            }

            if (znamenko == 2) {                    // násobení

                if (level == 1) {
                    E = parseInt(Math.random() * 10)
                    F = parseInt(Math.random() * 10)
                }
                if (level == 2) {
                    E = parseInt(Math.random() * 10)
                    F = parseInt(Math.random() * 100)
                }
                if (level == 3) {
                    E = parseInt(Math.random() * 100)
                    F = parseInt(Math.random() * 100)
                }

                $("#priklad").text(E + "*" + F)
                spravnyvysledek = E * F
            }

            if (znamenko == 3) {                    // dělení

                if (level == 1) {
                    do {
                        C = parseInt(Math.random() * 10)
                        D = parseInt(Math.random() * 9) + 1
                    } while (C % D !== 0)
                }
                if (level == 2) {
                    do {
                        C = parseInt(Math.random() * 100)
                        D = parseInt(Math.random() * 9) + 1
                    } while (C % D !== 0)
                }
                if (level == 3) {
                    do {
                        C = parseInt(Math.random() * 1000)
                        D = parseInt(Math.random() * 9) + 1
                    } while (C % D !== 0)
                }

                $("#priklad").text(C + "÷" + D)
                spravnyvysledek = C / D
            }

            $("#vysledek").val("")

            spustitCasovac()
        }



        function resetovatCasovac() {
            clearInterval(casovac)
            cas = 10
            $("#casovac").text(cas + " s left")
        }

        function spustitCasovac() {
            casovac = setInterval(function () {
                if (--cas < 0) chybnaOdpoved()
                else $("#casovac").text(cas + " s left")
            }, 1000)
        }



        $("#odpoved").keydown(function(e) {         // při stisku klávesy enter (kód 13)
            if (e.keyCode == 13) zkontrolovatOdpoved()
        })

        $("#potvrdit").click(function () {          // při kliknutí na potvrdit výsledek
            zkontrolovatOdpoved()
        })



        function zkontrolovatOdpoved() {
            if ($("#vysledek").val() == "") return

            var vysledek = $("#vysledek").val()
            $("#vysledek").val("")

            if (spravnyvysledek == vysledek) spravnaOdpoved()
            else chybnaOdpoved()
        }

        function spravnaOdpoved() {
            spravne++
            $("#obdelnik-spravne").text("CORRECT: " + spravne)

            generovatPriklad()
        }

        function chybnaOdpoved() {
            spatne++
            $("#obdelnik-spatne").text("INCORRECT: " + spatne)

            generovatPriklad()
        }



        function zobrazZnamku() {
            $("#hra").hide()
            $("#procenta").show()
            $("#znamka").show()

            var procenta = Math.round((spravne / hromadaprikladu) * 100)
            $("#procenta").text("Your success rate: " + procenta + " %")

            var znamka = 0
            if (procenta >= 90) znamka = 1
            else if (procenta >= 75) znamka = 2
            else if (procenta >= 50) znamka = 3
            else if (procenta >= 25) znamka = 4
            else znamka = 5
            $("#znamka").text("Your grade: " + znamka)

            // Coolest Projects
            if (znamka == 1) {
                setTimeout(() => {
                    alert("You win, congratulations!")
                    changeDone(true)
                    closeGame()
                }, 500)
            }
            else {
                setTimeout(() => {
                    alert("You lose, but it doesn't matter. Click the close button and try again.")
                }, 500)
            }
        }