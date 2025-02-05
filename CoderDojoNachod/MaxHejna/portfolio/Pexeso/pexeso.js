            var numbers = [], previous, disabled, score = 0, counter = 0;
            function generateGame() {
                $("body>*").remove();
                $("body").append('<div id="main" class="container"><div class="container"><h2 class="col-md-6"><span class="glyphicon glyphicon-ok"></span> <span id="score"></span> z <span>' + first.length + '</span> párů</h2><h2 class="col-md-6"><span class="glyphicon glyphicon-refresh"></span> <span id="counter"></span> otočení</h2></div><div id="game" class="container"></div><div id="footer" class="container">© 2018 – 2020 <a href="https://fb.com/CoderDojoNachod" target="_blank">CoderDojo Náchod</a> | Created for use in the worldwide <a href="https://www.coderdojo.com/" target="_blank">CoderDojo</a> community.</div></div>');
                for (var i = 0; i < first.length + second.length; i++) numbers[i] = i;
                var temp = numbers.length, index;
                while (temp-- > 1) {
                    do index = Math.floor(Math.random() * (temp + 1)); while (numbers[index] == numbers[temp]);
                    swapNumbers(temp, index);
                }
                for (var i = 0; i < first.length + second.length; i++) $("#game").append('<div class="scene scene--card"><div class="card" id="item' + numbers[i] + '"><div class="card__face card__face--front"></div><div class="card__face card__face--back"></div></div></div>');
                changeScore(-score);
                changeCounter(-counter);
            }
            
            function swapNumbers(index1, index2) {
                numbers[index1] += numbers[index2];
                numbers[index2] = Math.abs(numbers[index1] - numbers[index2]);
                numbers[index1] -= numbers[index2];
            }
            
            function parseIdNumber(id) {
                return parseInt(id.split("m")[1]);
            }

            function getExpression(index) {
                return index < first.length ? first[index] : second[index - first.length];
            }
            
            function checkCorrect(id1, id2) {
                var c1 = parseIdNumber(id1), c2 = parseIdNumber(id2);
                return !((c1 < first.length && c2 >= first.length) || (c1 >= first.length && c2 < first.length)) ? false : c1 < c2 ? c1 == c2 - first.length : c2 == c1 - first.length;
            }
            
            function changeScore(value) {
                $("#score").text(score += value);
            }
            
            function changeCounter(value) {
                $("#counter").text(counter += value);
            }
            
            generateGame();
            
            $(".card").click(function() {
                var current = $(this)[0];
                if (disabled || $(current).hasClass("is-flipped")) return;
                disabled = true;
                $("#" + current.id + " .card__face--back").html(getExpression(parseIdNumber(current.id)));
                current.classList.toggle('is-flipped');
                if (previous == null) {
                    previous = current;
                    disabled = false;
                    return;
                }
                changeCounter(1);
                if (checkCorrect(current.id, previous.id)) {
                    changeScore(1);
                    $("#" + previous.id + ">*").css("background-color", "#0f0");
                    $("#" + current.id + ">*").css("background-color", "#0f0");
                    previous = null;
                    if (score == first.length) {
                        alert("🎉 Gratulujeme, úspěšně jste našli všech " + first.length + " párů!\nPokud chcete hrát znovu, obnovte, prosím, stránku.");
                        return;
                    }
                    disabled = false;
                    return;
                }
                window.setTimeout(function() {
                    previous.classList.toggle("is-flipped");
                    current.classList.toggle("is-flipped");
                    $("#" + previous.id + " .card__face--back").html("");
                    $("#" + current.id + " .card__face--back").html("");
                    previous = null;
                    disabled = false;
                }, 2000);
            });