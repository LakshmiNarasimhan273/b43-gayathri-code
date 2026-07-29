const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization;

        if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
            return res.status(401).json({ message: "unauthorized: Token not found" });
        }

        const token = authHeaders.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.jwt_secret);

        req.userId = decoded.userId || decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;