var pole=[]    
        


$("#potvrdit").click(() => {
    var cislo = $("#rozmezi").val()
    for (var i = 2; i <= cislo; i++) {
    pole.push(i);
}
for (var y = 2; y <= cislo; y++) {
        pole.forEach(function(x){
        if (x%y===0&&x!=y)
        
    {

       console.log (x,y)


        var index = pole.indexOf(x);

// Pokud je index nalezen, odebereme prvek
if (index !== -1) {
    pole.splice(index,1);
}
    }
    })

 

    
}
$("#cisla").text(pole)

// Coolest Projects
if (cislo >= 999) {
    setTimeout(() => {
        alert("Remember or note the correct value, you'll need it later.")
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