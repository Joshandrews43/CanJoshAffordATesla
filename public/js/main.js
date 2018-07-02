//main.js

var xrpWorth = 0
var xrbWorth = 0
var prlWorth = 0
var xlmWorth = 0
var totalWorth = 0


function calculateTotalWorth() {
    totalWorth = xlmWorth + prlWorth + xrbWorth + xrpWorth;
}

function move(amount, type) {
    var elem = document.getElementById(type); 
    var width = 1;
    var id = setInterval(frame, 20);
    function frame() {
      var percent = Math.round(amount / totalWorth * 100);
        if (width >= percent) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%';
            elem.innerHTML = type + ": $" + Math.trunc(amount);
        }
    }
}

function makeRequests() {
    console.log("in makeRequests")
    $.ajax({
    	type: "POST",
    	url: "/xrp",
    	data: JSON.stringify({ type : "xrp" }),
    	success: function(data) {
            console.log("Successful ajax call for xrp. Data: " + data)
            let price = parseFloat(data["body"][0]["price_usd"])
            xrpWorth = price * 20315;
            calculateTotalWorth()
            move(price * 20315, "XRP")
    	},
    	error: function(error) {
    		console.log("Error with xrp ajax: " + error)
    	}
    });

    $.ajax({
        type: "POST",
        url: "/xrb",
        data: JSON.stringify({ type : "xrb" }),
        success: function(data) {
            console.log("Successful ajax call for xrb. Data: " + data)
            let price = parseFloat(data["body"][0]["price_usd"])
            xrbWorth = price * 1662;
            calculateTotalWorth()
            move(price * 1662, "NANO")
        },
        error: function(error) {
            console.log("Error with xrb ajax: " + error)
        }
    });

    $.ajax({
        type: "POST",
        url: "/prl",
        data: JSON.stringify({ type : "prl" }),
        success: function(data) {
            console.log("Successful ajax call for prl. Data: " + data)
            let price = parseFloat(data["body"][0]["price_usd"])
            prlWorth = price * 1545
            calculateTotalWorth()
            //move(price * 1545, "PRL")
        },
        error: function(error) {
            console.log("Error with prl ajax: " + error)
        }
    });

    $.ajax({
        type: "POST",
        url: "/xlm",
        data: JSON.stringify({ type : "xlm" }),
        success: function(data) {
            console.log("Successful ajax call for xlm. Data: " + data)
            let price = parseFloat(data["body"][0]["price_usd"])
            xlmWorth = price * 9430;
            calculateTotalWorth()
            move(price * 9430, "XLM")
        },
        error: function(error) {
            console.log("Error with xlm ajax: " + error)
        }
    });
}

makeRequests()

$("click").click(function(){
    makeRequests()
})

