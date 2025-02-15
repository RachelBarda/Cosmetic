const express = require('express');
const {signIn, refresh, signOut } = require('./controllers/auth');
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const corsOptions = {
	origin: ['http://localhost:4200','http://costmeticfront:4200'],
        credentials: true };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.use(express.static("public"));

app.post('/cosmetic/login', signIn);

app.delete('/cosmetic/signout', signOut);





const isAuth = (req, res, next) => {
  console.log('Time:', Date.now())
  console.log("inside middleware to call refresh");
  let x = refresh(req, res);
  console.log("refresh returned status = ", x);
  res.myStatusCode = x;
  if(x != 200)
  {
    res.sendStatus(res.myStatusCode)
    
  }
  else{
    next();
  }
  
}

const router = require('./routers/router');
app.use('/api/cosmetic', router)

const routerForAuthReq = require('./routers/routerForAuthReq');
app.use('/cosmetic',isAuth, routerForAuthReq)



const port = process.env.PORT || 5050;
app.listen(port, () => {
console.log(`listening on port ${port}`);
});

