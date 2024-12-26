const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports.authUser = async (req,res,next) => {
   try {
      const {token} = req.headers;
      if(!token){
         return res.status(401).json({
				success: false,
				message: "Not authorized , Login again",
			});
      }
      
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = token_decode.id;

      next();
   } catch (error) {
      console.log("Error in authenticating user")
   }
}