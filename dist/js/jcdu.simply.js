!function (t, n) {
    var r = {};
    t.jcdu || (t.jcdu = r), r.browserFunctions = {}, function (t) {
        r.browserFunctions.isFirefox = function () {
            return t.userAgent.toLowerCase().indexOf("firefox") > -1
        }
    }(navigator), Array.prototype.clean = function (t) {
        for (var n = 0; n < this.length; n++)this[n] === t && (this.splice(n, 1), n--);
        return this
    }, Array.prototype.mapJoinString = function (t, n, r) {
        return t = void 0 === t ? "" : t, n = void 0 === n ? "" : n, r = void 0 === r ? "" : r, this.map(function (t) {
            return n + t + r
        }).join(t)
    }, Array.prototype.move = function (t, n) {
        for (; 0 > t;)t += this.length;
        for (; 0 > n;)n += this.length;
        if (n >= this.length)for (var r = n - this.length; r-- + 1;)this.push(void 0);
        return this.splice(n, 0, this.splice(t, 1)[0]), this
    }, Array.prototype.contains = function (t) {
        for (var n = this.length; n--;)if (this[n] === t)return !0;
        return !1
    }, Array.prototype.containsObjectById = function (t) {
        for (var n = 0; n < this.length; n++)if (this[n].id === t)return !0;
        return !1
    }, r.stringFunctions = {}, r.stringFunctions.truncate = function (t, n) {
        return t ? (n || (n = 20), t.length > n ? t.slice(0, n - 3) + "..." : t) : ""
    }, String.prototype.truncate = function (t) {
        return this ? (t || (t = 20), this.length > t ? this.slice(0, t - 3) + "..." : this) : ""
    }, r.numberFunctions = {}, r.numberFunctions.isNumeric = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }, r.numberFunctions.getRandomNumber = function (t, n) {
        return Math.random() * (n - t) + t
    }, r.numberFunctions.getRandomInt = function (t, n) {
        return Math.floor(Math.random() * (n - t + 1)) + t
    }, r.utils = {}, r.utils.extend = function (t) {
        t = t || {};
        for (var n = 1; n < arguments.length; n++)if (arguments[n])for (var r in arguments[n])arguments[n].hasOwnProperty(r) && (t[r] = arguments[n][r]);
        return t
    }, r.utils.argumentsToArray = function (arguments) {
        for (var t = [], n = 0; n < arguments.length; n++)t[n] = arguments[n];
        return t
    }, r.utils.inherit = function (t, n) {
        t.prototype = Object.create(n.prototype)
    }, Object.prototype.inherit = function (t) {
        this.prototype = Object.create(t.prototype)
    }, r.utils.isArray = function (t) {
        return void 0 === Array.isArray ? "[object Array]" === Object.prototype.toString.call(t) : Array.isArray(t)
    }, function () {
        t.jQuery ? r.domready = function (t) {
            jQuery(n).ready(function () {
                t()
            })
        } : r.domready = function (t) {
            n.addEventListener("DOMContentLoaded", t)
        }
    }()
}(window, document);