    $("#delka-prevest").click(() => {
    var z = $("input[name=delka-z]:checked").val()
    var na = $("input[name=delka-na]:checked").val()
    var cislo = $("#delka-cislo").val()
    var nasobek = 0
    var delenec = 0



    if (z=="mm") {
    nasobek = 1/1000
    }
    if (z=="cm") {
        nasobek = 1/100
    }
    if (z=="dm") {
        nasobek = 1/10
    }
    if (z=="m") {
        nasobek = 1/1
    }
    if (z=="km") {
        nasobek = 1*1000
    }


    if (na=="mm") {
    delenec = 1*1000
    }
    if (na=="cm") {
    delenec = 1*100
    }
    if (na=="dm") {
    delenec = 1*10
    }
    if (na=="m") {
    delenec = 1*1
    }
    if (na=="km") {
    delenec = 1/1000
    }
    
    $("#delka-napis").text(nasobek*cislo*delenec+" "+na)

    // Coolest Projects
    setTimeout(() => {
        alert("Recall your assignment, click the close button or try again.")
    })
    


    
})

$("#hmotnost-prevest").click(() => {
    var z = $("input[name=hmotnost-z]:checked").val()
    var na = $("input[name=hmotnost-na]:checked").val()
    var cislo = $("#hmotnost-cislo").val()
    var nasobek = 0
    var delenec = 0



    if (z=="mg") {
    nasobek = 1/1000
    }
    if (z=="g") {
        nasobek = 1/1
    }
    if (z=="dkg") {
        nasobek = 1*10
    }
    if (z=="kg") {
        nasobek = 1*1000
    }
    if (z=="t") {
        nasobek = 1*1000000
    }


    if (na=="mg") {
    delenec = 1*1000
    }
    if (na=="g") {
    delenec = 1*1
    }
    if (na=="dkg") {
    delenec = 1/10
    }
    if (na=="kg") {
    delenec = 1/1000
    }
    if (na=="t") {
    delenec = 1/1000000
    }
    
    $("#hmotnost-napis").text(nasobek*cislo*delenec+" "+na)

    // Coolest Projects
    setTimeout(() => {
        alert("Recall your assignment, click the close button or try again.")
    })

})

$("#data-prevest").click(() => {
    var z = $("input[name=data-z]:checked").val()
    var na = $("input[name=data-na]:checked").val()
    var cislo = $("#data-cislo").val()
    var nasobek = 0
    var delenec = 0



    if (z=="b") {
    nasobek = 1*1
    }
    if (z=="kb") {
        nasobek = 1*1024
    }
    if (z=="mb") {
        nasobek = 1*1048576
    }
    if (z=="gb") {
        nasobek = 1*1073741824
    }
    if (z=="tb") {
        nasobek = 1*1099511627776
    }


    if (na=="b") {
    delenec = 1/1
    }
    if (na=="kb") {
    delenec = 1/1024
    }
    if (na=="mb") {
    delenec = 1/1048576
    }
    if (na=="gb") {
    delenec = 1/1073741824
    }
    if (na=="tb") {
    delenec = 1/1099511627776
    }
    
    $("#data-napis").text(nasobek*cislo*delenec+" "+na)

    // Coolest Projects
    if (z == "gb" && na == "mb" && cislo == 1) {
        setTimeout(() => {
            alert("Remember or note the converted value, you'll need it later.")
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


$("#objem-prevest").click(() => {
    var z = $("input[name=objem-z]:checked").val()
    var na = $("input[name=objem-na]:checked").val()
    var cislo = $("#objem-cislo").val()
    var nasobek = 0
    var delenec = 0



    if (z=="ml") {
    nasobek = 1/1000
    }
    if (z=="cl") {
        nasobek = 1/100
    }
    if (z=="dl") {
        nasobek = 1/10
    }
    if (z=="l") {
        nasobek = 1*1
    }
    if (z=="hl") {
        nasobek = 1*100
    }


    if (na=="ml") {
    delenec = 1*1000
    }
    if (na=="cl") {
    delenec = 1*100
    }
    if (na=="dl") {
    delenec = 1*10
    }
    if (na=="l") {
    delenec = 1/1
    }
    if (na=="hl") {
    delenec = 1/100
    }
    
    $("#objem-napis").text(nasobek*cislo*delenec+" "+na)

    // Coolest Projects
    setTimeout(() => {
        alert("Recall your assignment, click the close button or try again.")
    })

})