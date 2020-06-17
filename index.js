global.fetch = require('node-fetch')
const indicators = require('./indicators.js')
const exchange = require('./exchange.js')


// if BTC < MA => buy (if we have no position)
// if BTC > MA => sell (if we have a position)
var hasPosition = false;
var strategy = function(){
  console.log('   ');
  console.log('=============================');
  console.log('Executing strategy');
  indicators.hourlyMovingAverage('BTC','USD',100,function(ma){
    exchange.bitcoinPrice()
    .then(res => {

      var price = res.last;

      console.log('MA :', ma);
      console.log('Price: ', price);

      if(price > ma && !hasPosition){
        console.log('Buy signal!')
        exchange.marketBuyBitcoin()
        .then(res => {
          console.log('buy successfull');
          hasPosition = true;

          setTimeout(strategy,1000);
        })
        .catch(error => console.error)
      }

      else if(price < ma && hasPosition){
        console.log('Sell signal!')
        exchange.marketSellBitcoin()
        .then(res => {
          console.log('sell successfull')
          hasPosition = false;

          setTimeout(strategy,1000);
        })
        .catch(error => console.error)
      }

      else{
        if(hasPosition){
          console.log('HODL!')
        }
        if(!hasPosition){
          console.log('Wait for a signal to buy!')
        }
        setTimeout(strategy,1000);
      }

    })
  });

}

strategy()
// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }
