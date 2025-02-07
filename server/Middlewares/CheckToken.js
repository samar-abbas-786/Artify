import jwt from "jsonwebtoken";

// export const CheckToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     console.log("Auth Header:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No Token Provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//       if (err) {
//         return res.status(401).json({ message: "Invalid or Expired Token" });
//       }

//       req.user = user;
//       console.log("User Verified:", user);
//       next();
//     });
//   } catch (error) {
//     console.error("Token Verification Error:", error);
//     res.status(500).json({ message: "Server Error in Token Verification" });
//   }
// };

export const CheckToken = async (req, res, next) => {
  const cookieName = req.cookies?.token;
  console.log("cookieName", cookieName);
  // if (!cookieName) {
  //   return;
  // }

  next();
};
