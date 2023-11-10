// MiddleWare function that will validate the token
const { verify } = require("jsonwebtoken");

// Since it need verication for every route
// Export

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization"); //Get it from the header

    // Chek if token is there
    if (token) {
      // Remove the bearer(6 words and the space) so that we get the actual token
      token = token.slice(7);
      verify(token, "qwe123", (err, decoded) => {
        if (err) {
          res.json({
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        message: "Access Denied! Unauthorized user",
      });
    }
  },
};
