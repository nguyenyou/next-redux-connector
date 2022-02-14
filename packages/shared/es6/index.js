export var sleep = function(ms) {
    return new Promise(function(resolve) {
        return setTimeout(resolve, ms);
    });
};
export var SELECTORS = {
    COUNTER_VALUE: '#counter'
};
