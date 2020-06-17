const GeminiAPI = require('gemini-api').default;
const secret = '3Ptht9TWj3bV6tnzeB3o5LAP5BuR';
const key = 'account-ExWOELsXa2HomdkBp3Aj';
const restClient = new GeminiAPI({key, secret, sandbox:true});

module.exports = {

  marketBuyBitcoin:function(){
    restClient.newOrder({amount:1,
                        price:50000,
                        side:'buy',
                        symbol:'btcusd',
                        options:['immediate-or-cancel']})
    .then(response => console.log(response))
    .catch(error => console.error(error));
  },

  marketSellBitcoin:function(){
    restClient.newOrder({amount:1,
                        price:1,
                        side:'sell',
                        symbol:'btcusd',
                        options:['immediate-or-cancel']})
    .then(response => console.log(response))
    .catch(error => console.error(error));
  },

  bitcoinPrice:function(){
    return restClient.getTicker('btcusd')
  }
}
