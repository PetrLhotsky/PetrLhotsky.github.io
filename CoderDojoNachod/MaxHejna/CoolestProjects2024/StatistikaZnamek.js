            var seznam = []
            var soucet = 0
            var delit = 0
            var prumer = 0
            var best = 6
            var spatn = 0
            var statistik = [0,0,0,0,0]

            $("#potvrdit").click(function() {
                soucet = 0
                delit = 0
                prumer = 0
                statistik = [0,0,0,0,0]
                var znamka = $("#cislo").val()
                if (znamka >5||znamka<1) {
                    alert("Ty seš na škole kde existují další známky?! ;-)")
                }
                else{
                seznam.push(znamka)
                }
                $("#znamky").text("Známky: "+seznam)


                seznam.forEach(function(x){
                if (x<best) {
                best=x
                }

                if (x>spatn) {
                spatn=x
                }


                x=parseInt(x)
                

                statistik[x - 1]=statistik[x - 1]+1
                
                

                
                delit=delit+1
                soucet=soucet+x


                })
                prumer=Math.round(soucet/delit*100)/100

                
                $("#prumer").text("Průměr: "+prumer)
                $("#best").text("Nejlepší známka: "+best)
                $("#spatn").text("Nejhorší známka: "+spatn)
                $("#pocet").text("Počet všech známek: "+delit)
                $("#jednicky").text("Počet jedniček: "+statistik[0])
                $("#dvojky").text("Počet dvojek: "+statistik[1])
                $("#trojky").text("Počet trojek: "+statistik[2])
                $("#ctverky").text("Počet čtyřek: "+statistik[3])
                $("#kule").text("Počet kulí: "+statistik[4])






            })

            $("#odpoved").keydown(function(e) {
            if (e.keyCode == 13) zkontrolovatOdpoved()
            })



            // zadání 2: zobrazovat průběžně nejlepší a nejhorší známku
            
            // úkol: zobrazit počty známek od každého druhu, příklad:
                // 3x 1 | 2x 2 | 1x 3 | 0x 4 | 0x 5 (3x jednička,...)