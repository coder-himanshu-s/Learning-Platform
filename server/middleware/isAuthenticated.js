import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const  token  = req.cookies.token;
    console.log(`token is ${token}`)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not here in middleware ",
      });
    }
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(`verfified token is ${verifiedToken}`)
    if (!verifiedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token ",
      });
    }
    req.id = verifiedToken.userId;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

export default isAuthenticated;
