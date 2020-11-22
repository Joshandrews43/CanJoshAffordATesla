//main.js

var xrpWorth = 0;
var xrbWorth = 0;
var prlWorth = 0;
var xlmWorth = 0;
var totalWorth = 0;

function calculateTotalWorth() {
  totalWorth = xlmWorth + prlWorth + xrbWorth + xrpWorth;
}

function move(amount, type) {
  var elem = document.getElementById(type);
  var width = 1;
  var id = setInterval(frame, 20);
  function frame() {
    var percent = Math.round((amount / totalWorth) * 100);
    if (width >= percent) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
      elem.innerHTML = type + ": $" + Math.trunc(amount);
    }
  }
}

const xrpOwned = 16920;
const xrbOwned = 1659;
const xlmOwned = 6450;

function makeRequests() {
  $.ajax({
    type: "POST",
    url: "/xrp",
    success: function ({ prices }) {
      console.log("data in frontend", prices);
      xrpWorth = prices.xrp.price * xrpOwned;
      xlmWorth = prices.xlm.price * xlmOwned;
      xrbWorth = prices.xrb.price * xrbOwned;
      calculateTotalWorth();
      move(xrpWorth, "XRP");
      move(xrbWorth, "NANO");
      move(xlmWorth, "XLM");
      document.getElementById("click").innerHTML = `$${totalWorth.toFixed(0)}`;
    },
    error: function (error) {
      console.log("Error with xrp ajax: " + error);
    },
  });
}

makeRequests();

$("click").click(function () {
  makeRequests();
});
