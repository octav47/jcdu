jcdu.stringFunctions.truncate = function (str, maxlength) {
    if (!maxlength) {
        maxlength = 20;
    }
    return (str.length > maxlength) ? str.slice(0, maxlength - 3) + '...' : str;
};