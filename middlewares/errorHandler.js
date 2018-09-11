const debug = require('debug')('base:middleware:error');

module.exports = function(err, req, res, next) {
    if(err instanceof Error) {
        debug(err);
        
        const status = err.httpCode || 400;
        var message = err.originalMessage || err.message
        
        res.status(status).send({
            success: false,
            message,
            error: err.APIResponse || {}
        });
    } else {
        var timing = 0
        var result = {
            success: true,
            result: err
        };

        if(err.length !== undefined) {
            result.count = err.length;
        }

        if(req.startRequest != null) {
            timing = (new Date()).getTime() - req.startRequest
            result.timing = timing;
        }

        res.status(200).send(result);
    }
}