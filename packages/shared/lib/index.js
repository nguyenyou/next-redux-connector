"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SELECTORS = exports.sleep = void 0;
var sleep = function(ms) {
    return new Promise(function(resolve) {
        return setTimeout(resolve, ms);
    });
};
exports.sleep = sleep;
var SELECTORS = {
    COUNTER_VALUE: '#counter'
};
exports.SELECTORS = SELECTORS;
