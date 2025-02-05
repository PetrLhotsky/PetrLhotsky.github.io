        var pole = []
        var soucet = 0
        var text    
        var nasobek
        var vysledek
        var predposledni
        var posledni
        $("#potvrdit").click(function() {
                text = ""
                soucet = 0
                var citatel = $("#citatel").val()
                /////////////////////////////////////////////////////$("#znamky").text("Známky: "+seznam)
                var jmenovatel = $("#jmenovatel").val()
                /////////////////////////////////////////////////////$("#znamky").text("Známky: "+seznam)
                var zlomek = {}
                nasobek = 1
                vysledek = 0
                predposledni = 1
                posledni = 0
                zlomek.citatel=citatel
                zlomek.jmenovatel=jmenovatel
                pole.push(zlomek)
                pole.forEach(function(x){
                text=text+(x.citatel+"/"+x.jmenovatel)+"                                                                                        + "
                nasobek=nasobek*x.jmenovatel
                })
                pole.forEach(function(x){
                vysledek=nasobek/x.jmenovatel
                predposledni=x.citatel*vysledek
                posledni=posledni+predposledni
                })
                $("#vsechno").text(text)
                var nejmensi=0
                if(posledni<nasobek){
                nejmensi=posledni
                }
                else{
                nejmensi=nasobek
                }
                nejmensi=nejmensi+1
                do {
                nejmensi=nejmensi-1
                }
                while(posledni%nejmensi>0||nasobek%nejmensi>0)
                posledni=posledni/nejmensi
                nasobek=nasobek/nejmensi
                $("#vysledek").text("Result: "+posledni+"/"+nasobek)

                // Coolest Projects
                if (pole.length == 3 &&
                    pole[0].citatel == 14 && pole[0].jmenovatel == 4
                 && pole[1].citatel == 6 && pole[1].jmenovatel == 36
                 && pole[2].citatel == 2 && pole[2].jmenovatel == 3) {
                    setTimeout(() => {
                        alert("Remember or note the numerator, you'll need it later.")
                        changeDone(true)
                    })
                 }
                 else if (pole.length == 3) {
                    if (!readDone())
                        setTimeout(() => {
                            alert("Recall your assignment, click the close button and try again.")
                        })
                 }
                })
                

            // zadání: aplikace na sčítání a odčítání zlomků
                // zlomky bude potřeba ukládat do pole
                // každý se skládá z dvou částí - čitatele a jmenovatele