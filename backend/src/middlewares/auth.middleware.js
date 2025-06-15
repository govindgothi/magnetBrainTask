import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
 
  if (!token) return res.status(401).json({ message: "Unauthorized" });
 console.log("object")
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
