            var platno = $("#platno")[0]
            var kresleni = platno.getContext("2d")
            
            var polex = []
            var poley = []

            var level = 1
            $("#level").text("Level " + level)
            var levelkruhu = 1
            var pocet = 0
            var pocetkruhu = 0

            do {
                do {
                    var promena1 = Math.round(Math.random() * 400 + 50)
                    var promena2 = Math.round(Math.random() * 400 + 50)
                } while (nejkratsiVzdalenost(promena1,promena2,polex,poley) < 100)

                polex.push(promena1)
                poley.push(promena2)
                pocet = pocet + 1
            } while (pocet < levelkruhu)


            $("#level").text("Try to remember the order")
            var casovac = setInterval(function() {
                if (pocetkruhu < levelkruhu) {
                    kresleni.beginPath()
                    kresleni.arc(polex[pocetkruhu], poley[pocetkruhu], 50, 0, 2 * Math.PI)
                    kresleni.fill()
                    pocetkruhu = pocetkruhu + 1
                }

                else {
                        setTimeout(function() {
                            clearInterval(casovac)
                            $("#level").text("Level " + level)
                            kresleni.clearRect(0, 0, 500, 500)
                            
                            for (var i = 0; i < polex.length; i++) {
                                var x = polex[i]
                                var y = poley[i]
                                kresleni.beginPath()
                                kresleni.arc(x, y, 50, 0, 2 * Math.PI)
                                kresleni.stroke()
                            }
                        }, 200)
                }
            }, 200);



            function nejkratsiVzdalenost(kruhX, kruhY, poleX, poleY) {
                var min = 500;

                for (var i = 0; i < poleX.length; i++) {
                    var x = poleX[i];
                    var y = poleY[i];

                    var vzdalenost = Math.sqrt(Math.pow(x - kruhX, 2) + Math.pow(y - kruhY, 2));

                    if (vzdalenost < min) {
                        min = vzdalenost;
                    }
                }

                //console.log(min);
                return min;
            }



            var nacomakliknout = 0
            var konec = 0

            $("#platno").click(function() {
                if (konec == 1) {
                    return
                }

                var rect = $("#platno")[0].getBoundingClientRect();
                var mysX = event.clientX - rect.left;
                var mysY = event.clientY - rect.top;
                var kruh = kliknutyKruh(mysX, mysY, polex, poley);

                if(kruh >= 0) {
                    if(kruh == nacomakliknout){
                        kresleni.beginPath()
                        kresleni.fillStyle = "green"
                        kresleni.arc(polex[kruh], poley[kruh], 50, 0, 2 * Math.PI)
                        kresleni.fill()
                        nacomakliknout = nacomakliknout + 1

                        if (kruh == levelkruhu - 1) {
                            kresleni.fillStyle = "black"
                            $("#pristilevel").text("You're moving on to the next round :)")
                            level = level + 1
                            $("#level").text("Level " + level)

                            levelkruhu = Math.floor((level - 1) / 3) + 1
                            polex = []
                            poley = []
                            pocet = 0
                            nacomakliknout = 0
                            pocetkruhu = 0
                            do {
                                do {
                                    promena1 = Math.round(Math.random() * 400 + 50)
                                    promena2 = Math.round(Math.random() * 400 + 50)
                                } while (nejkratsiVzdalenost(promena1, promena2, polex, poley) < 100)

                                polex.push(promena1)
                                poley.push(promena2)
                                pocet = pocet + 1
                            } while (pocet < levelkruhu)

                            // Coolest Projects
                            if (level == 10) {
                                setTimeout(() => {
                                    alert("You win, but you can continue. When you're done, click the close button.")
                                    changeDone(true)
                                }, 500)
                            }

                            $("#level").text("Try to remember the order")
                            var casovac = setInterval(function() {
                                if (pocetkruhu < levelkruhu) {
                                    kresleni.beginPath()
                                    kresleni.arc(polex[pocetkruhu], poley[pocetkruhu], 50, 0, 2 * Math.PI)
                                    kresleni.fill()
                                    pocetkruhu = pocetkruhu + 1
                                }

                                else {
                                        setTimeout(function() {
                                            clearInterval(casovac)
                                            $("#level").text("Level " + level)
                                            kresleni.clearRect(0, 0, 500, 500)
                                            
                                            for (var i = 0; i < polex.length; i++) {
                                                var x = polex[i]
                                                var y = poley[i]
                                                kresleni.beginPath()
                                                kresleni.arc(x, y, 50, 0, 2 * Math.PI)
                                                kresleni.stroke()
                                            }
                                        },200)
                                }
                             }, 200);
                             
                             $("#pristilevel").text("")
                        }
                    }

                    else {
                        konec = konec + 1
                        $("#konec").text("You lose :(")
                        kresleni.beginPath()
                        kresleni.fillStyle = "red"
                        kresleni.arc(polex[kruh], poley[kruh], 50, 0, 2 * Math.PI)
                        kresleni.fill()

                        // Coolest Projects
                        if (!readDone())
                            setTimeout(() => {
                                alert("You lose, but it doesn't matter. Click the close button and try again.")
                            }, 500)
                    }
                }

                else {
                    alert("You bad boy, you clicked wrong")
                }
            })



            function kliknutyKruh(klikX, klikY, poleX, poleY) {
                for (var i = 0; i < poley.length; i++) {
                    var x = poleX[i];
                    var y = poleY[i];
                    var vzdalenost = Math.sqrt(Math.pow(x - klikX, 2) + Math.pow(y - klikY, 2));

                    if (vzdalenost < 50) {  
                        return i;
                    }
                }

                //console.log("-1");
                return -1;
            }