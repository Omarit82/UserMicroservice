import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '1h' });
    return token;
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ Error: "Not authenticated" });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({ Message: "Invalid Token" });
    }
}