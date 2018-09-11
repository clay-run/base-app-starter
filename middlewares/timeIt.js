/**
 * This times requests and returns it in the body
 */

export default (req, res, next) => {
    req.startRequest = (new Date()).getTime()

    next()
}