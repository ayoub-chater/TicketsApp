import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authorize(req, res, next) {
  const token = req.header("jwtToken");

  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
