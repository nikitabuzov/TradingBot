const CryptoCompareAPI = require('cryptocompare');
const cryptocompareAPIkey = 'fec77f349e14e7cc339e127350163636d81f58ac80e4644de1b9f5a022b15a81'
CryptoCompareAPI.setApiKey(cryptocompareAPIkey);

module.exports = {

  dailyMovingAverage:function(cryptoAsset, fiatCurrency, days, callback){
    if(days > 500){
      console.error('ErrorMessage: Only up to 500 days allowed by dailyMovingAverage function!')
      return
    }
    CryptoCompareAPI.histoDay(cryptoAsset, fiatCurrency, {limit:500})
    .then(data => {
      data = data.reverse()
      var sum = 0;
      for(var i = 0; i<days; i++){
        sum += data[i].close;
      }
      var movingAverage = Math.floor(sum/days);
      callback(movingAverage);
    })
    .catch(console.error)
  },

  hourlyMovingAverage:function(cryptoAsset, fiatCurrency, hours, callback){
    if(hours > 169){
      console.error('ErrorMessage: Only up to 169 hours allowed by hourlyMovingAverage function!')
      return
    }
    CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
    .then(data => {
      data = data.reverse()
      var sum = 0;
      for(var i = 0; i<hours; i++){
        sum += data[i].close;
      }
      var movingAverage = Math.floor(sum/hours);
      callback(movingAverage);
    })
    .catch(console.error)
  },

  minutelyMovingAverage:function(cryptoAsset, fiatCurrency, minutes, callback){
    if(minutes > 1440){
      console.error('ErrorMessage: Only up to 1440 minutes allowed by minutelyMovingAverage function!')
      return
    }
    CryptoCompareAPI.histoMinute(cryptoAsset, fiatCurrency)
    .then(data => {
      data = data.reverse()
      var sum = 0;
      for(var i = 0; i<minutes; i++){
        sum += data[i].close;
      }
      var movingAverage = Math.floor(sum/minutes);
      callback(movingAverage);
    })
    .catch(console.error)
  }
}
