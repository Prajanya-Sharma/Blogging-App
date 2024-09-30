const JWT = require("jsonwebtoken");

const secret = "ForeverAug@06";  // Keep the secret consistent for signing and verifying

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
    };

    const token = JWT.sign(payload, secret);
    return token;
    
}

function validateToken(token) {
    try {
        // Provide the same secret key used during token creation
        const payload = JWT.verify(token, secret);
        return payload;
    } catch (error) {
        console.error("Error validating token:", error);
        throw error;  // Let the caller handle the error
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};
