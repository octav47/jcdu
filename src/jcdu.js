/**
 * @namespace jcdu
 */
(/** @lends jcdu */ function (window, undefined) {
    var CHIEF = {}; // this is the main object

    /**
     * There are pre-build plugins
     * utils/u
     * random/r
     * browserFunctions/bf
     * arrayFunctions/af
     * stringFunctions/sf
     * numberFunctions/nf
     * o
     */

    if (!window.jcdu) {
        window.jcdu = CHIEF;
    }

    //= utils/utils.js

    //= random/random.js

    //= browser_functions/browserFunctions.js

    //= array_functions/arrayFunctions.js

    //= string_functions/stringFunctions.js

    //= number_functions/numberFunctions.js

    //= o/o.js
})(window);