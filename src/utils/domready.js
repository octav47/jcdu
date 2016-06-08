(function () {
    if (window.jQuery) {
        jcdu.domready = function (callback) {
            jQuery(document).ready(function () {
                callback();
            })
        };
    } else {
        jcdu.domready = function (callback) {
            document.addEventListener("DOMContentLoaded", callback);
        };
    }
})();