/*
* main file
 */

(function () {
    var jcdu = {};

    if (!window.jcdu) {
        window.jcdu = jcdu;
    }

    jcdu.browserFunctions = {};

    jcdu.browserFunctions.isFirefox = function () {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    };
})();