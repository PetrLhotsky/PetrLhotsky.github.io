var pole=[]


$("#potvrdit").click(() => {
var cislob = $("#cislob").val()
var cisloa = $("#cisloa").val()

for (var i = 2; i <= cislob; i++) {
if (cislob%i==0&&cisloa%i==0){
pole.push(i)
}
}
var maximum = 1
pole.forEach(function(x){
if (x>maximum){
maximum =x
}
})
$("#delitel").text(maximum)

// Coolest Projects
if ((cisloa == 128 && cislob == 412) || (cisloa == 412 && cislob == 128)) {
    setTimeout(() => {
        alert("Remember or note the GCD value, you'll need it later.")
        changeDone(true)
    })
}
else {
    if (!readDone())
        setTimeout(() => {
            alert("Recall your assignment, click the close button or try again.")
        })
}

})