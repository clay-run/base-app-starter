import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    if(!req.originalUrl.startsWith('/v1/auth')
    && !req.originalUrl.startsWith('/v1/invites')
    && !req.originalUrl.startsWith('/v1/unsubscribe')) {
        const [type, value] = req.headers['authorization'].split(' ')

        if('Token' == type) {
            try {
                var decoded = jwt.verify(value, process.env.JSON_WEB_TOKEN_SECRET);

                req.user = decoded;
                return next();
            } catch(e) {
                return next(new Error('Invalid token signature'));
            }
        } 

        return next(new Error('Only Token authorization supported'));
    }
    
    next()
}