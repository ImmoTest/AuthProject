/**
 * Created by kamill on 6/6/16.
 */
var smsru = require('sms_ru');
var sms = new smsru('B7541315-CBA8-6CAE-87F6-BC2E7ADA5A42');
sms.sms_send({
    to: '79876265756',
    text: 'Alonsy!'
}, function(e){
    console.log(e.description);
});