const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token (sign only contained id)
            req.user = await User.findById(decoded.id).select('-password'); // Exclude password from the user object

            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    }
}

module.exports = auth;