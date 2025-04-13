import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "MY_JWT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}