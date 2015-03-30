var path = require('path'),
    util = require('util'),
    http = require('http');

// ошибки для выдачи посетителю
function HttpMessage(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpMessage);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpMessage, Error);

HttpMessage.prototype.name = 'HttpMessage';

exports.HttpMessage = HttpMessage;