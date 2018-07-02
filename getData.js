
var totalCost = 101000;
var totalWorth = 0;

var unirest = require('unirest')
var xrpURL = "https://api.coinmarketcap.com/v1/ticker/ripple"
var xrbURL = "https://api.coinmarketcap.com/v1/ticker/nano"
var prlURL = "https://api.coinmarketcap.com/v1/ticker/oyster"
var xlmURL = "https://api.coinmarketcap.com/v1/ticker/stellar"


module.exports = {
  getXRPPrice: function(callback) {
    unirest.get(xrpURL).end(function(xrpData) {
      xrpData = JSON.parse(JSON.stringify(xrpData))
      console.log("Ripple price1: " + xrpData["body"][0]["price_usd"])
      callback(xrpData)
    })
  },
  getXRBPrice: function(callback) {
    unirest.get(xrbURL).end(function(xrbData) {
      xrbData = JSON.parse(JSON.stringify(xrbData))
      console.log("Nano price: " + xrbData["body"][0]["price_usd"])
      callback(xrbData)
    })
  },
  getPRLPrice: function(callback) {
    unirest.get(prlURL).end(function(prlData) {
      prlData = JSON.parse(JSON.stringify(prlData))
      console.log("Pearl price: " + prlData["body"][0]["price_usd"])
      callback(prlData)
    })
  },
  getXLMPrice: function(callback) {
    unirest.get(xlmURL).end(function(xlmData) {
      xlmData = JSON.parse(JSON.stringify(xlmData))
      console.log("Stellar price: " + xlmData["body"][0]["price_usd"])
      callback(xlmData)
    })
  },
  getPrices: function(callback) {
    //allPrices  = [XRP, XRB, PRL, XLM] (not in order bc of asynch)
    var allPrices = []
    //XRP call
    unirest.get(xrpURL).end(function(xrpData){
      xrpData = JSON.parse(JSON.stringify(xrpData))
      allPrices.push({xrp : xrpData})
    })
    //XRB call
    unirest.get(xrbURL).end(function(xrbData) {
      xrbData = JSON.parse(JSON.stringify(xrbData))
      allPrices.push({xrb : xrbData})
    })
    //PRL call
    unirest.get(prlURL).end(function(prlData) {
      prlData = JSON.parse(JSON.stringify(prlData))
      allPrices.push({prl : prlData})
    })
    //XLM call
    unirest.get(xlmURL).end(function(xlmData) {
      xlmData = JSON.parse(JSON.stringify(xlmData))
      allPrices.push({ xlm : xlmData})

    })
    callback(allPrices)
  }
}


/*
function displayPrices(price, type){
  $(".toggle").remove();
  $(".prices").append("<span class='toggle'>Price of " + type + ": " + price + "</span><br>");
} */

// $(document).ready(function(){
//   getXrpPrice();
//   getPrlPrice();
//   getXrbPrice();
//   getXlmPrice();
//   document.getElementById("click").innerHTML = String("Fix this");
//   $("#click").click(function(){
//     getXrpPrice();
// });
// });