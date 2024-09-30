const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // Attach the user to the request
            res.locals.user = userPayload; // Attach user to locals
            console.log('User in request:', req.user);
            next();
        } catch (error) {
            console.error('Error validating token:', error);
            next();
        }
    };
}

module.exports = {
    checkForAuthenticationCookie
};