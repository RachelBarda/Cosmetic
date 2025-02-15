let repository = require('../repos/repository')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtKey = process.env.SECRET_KEY;
const refreshJwtKey = process.env.REFRESH_TOKEN_KEY;
const jwtExpiryTimeInMilliSeconds = 1000 * 60 * 15; 


const Authentication = async (email,password) => {
    let res = await repository.checkUserNameAndPassword(email,password);
    return res;

}


//=======================================================
//   creates and returns jwt token 
//     (only if username, password match our records)
const signIn = async (req, res) => {
    // Get credentials (username and password) from JSON body
    //   and use our service to check if they are OK
    const { email, password } = req.body;
 
    const result = await Authentication(email, password);
    
    if (!result.isAuth) {
      // return 401 error if authentication not OK 
      res.status(401).end()
      return 
    };
  
    // Create a new token with the username in the payload
    //  which expires X seconds after issue
    let X = jwtExpiryTimeInMilliSeconds;
    const token = jwt.sign({ email }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: X
    })
    console.log('signin - creaeted token:', token);
  
    // set a cookie named 'token' with value = the token string we created above, 
    //   with max age 
    // here, the max age is in milliseconds, so we multiply by 1000
    res.cookie('token', token, { maxAge: jwtExpiryTimeInMilliSeconds, httpOnly:false })
    res.json({username:result.name, roles:result.roles})
    
    
  }

  const secretPage = (req, res) => {
    console.log("myStatusCode = ", res.myStatusCode);
  
    if (res.myStatusCode === 200) {
      // Finally, return the secret page to the user, along with their
      // username given in the token
      res.send(`SecretPage welcomes you, ${res.thePayload.username}!! , 
                                    ${JSON.stringify(res.thePayload)}`);
    }
    else {
      res.status(res.myStatusCode).send();
    }
  
  }

//=======================================================
//=======================================================
const refresh = (req, res) => {
    console.log("going to try to refresh the token (if there is one and it is still valid");

    let statusCode = 200 // OK
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
      console.log('refresh - couldnt find token in cookies');
      statusCode = 401;
      return statusCode;
    }
  
    let payload;
    try {
      payload = jwt.verify(token, jwtKey);
    }
    catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        statusCode = 401
        return statusCode;
      }
      console.log('refresh - JsonWebTokenError ', e);
      statusCode = 400;
      return statusCode;
    }
  
    // Once we got here it means the token was checked and is valid
  
  
  
    // Now, create a new token for the current user, 
    //   with a renewed expiration time
    const newToken = jwt.sign({ email: payload.email }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpiryTimeInMilliSeconds
    })
  
    // Set the new token as the users `token` cookie
    console.log(`the new refreshed token - ${newToken}`);
    res.cookie('token', newToken, { maxAge: jwtExpiryTimeInMilliSeconds })
    res.thePayload = payload;
    // once we got here it means the statusCode is still 200 (as we initialized to be)
    return statusCode; // returning 200
  
  }
  //=======================================================

  const signOut = async (req,res) =>
  {
    console.log("going to try to refresh the token (if there is one and it is still valid");
  
    let statusCode = 200 // OK
    const token = req.cookies?.token;
  
    if (!token) {
   
      statusCode = 401;
      return statusCode;
    }
  
    let payload;
    try {
      payload = jwt.verify(token, jwtKey);
      return res
      .clearCookie("token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
    }
    catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        statusCode = 401
        return statusCode;
      }
    
      statusCode = 400;
      return statusCode;
    }
  }

module.exports = {
    Authentication,
    refresh,
    secretPage,
    signIn,
    signOut
}