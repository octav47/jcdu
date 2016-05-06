jcdu.numberFunctions.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};