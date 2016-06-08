/*
 * main file
 */

(function (window, document) {
    var jcdu = {};

    if (!window.jcdu) {
        window.jcdu = jcdu;
    }

    //= browser_functions/browserFunctions.js
    (function (navigator) {
        //= browser_functions/firefoxCheck.js
    })(navigator);



    //= array_functions/prototype/clean.js
    //= array_functions/prototype/mapJoinString.js
    //= array_functions/prototype/move.js
    //= array_functions/prototype/contains.js
    //= array_functions/prototype/containsObjectById.js



    //= string_functions/stringFunctions.js
    //= string_functions/truncate.js

    //= string_functions/prototype/truncate.js



    //= number_functions/numberFunctions.js
    //= number_functions/isNumeric.js
    //= number_functions/getRandomNumber.js
    //= number_functions/getRandomInt.js



    //= utils/utils.js
    //= utils/extend.js
    //= utils/argumentsToArray.js
    //= utils/inherit.js
    //= utils/isArray.js
    //= utils/domready.js
})(window, document);