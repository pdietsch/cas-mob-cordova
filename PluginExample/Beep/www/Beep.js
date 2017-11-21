var exec = require('cordova/exec');

exports.beep = function (durationInMilliSeconds,type, success, error) {
    exec(success, error, 'Beep', 'beep', [durationInMilliSeconds,type]);
};
