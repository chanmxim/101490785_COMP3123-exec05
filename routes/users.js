const express = require("express")
const path = require("path");
const user = require(path.join(__dirname, "../user.json"))

const routerUser = express.Router();

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req,res) => {
  res.json(user);
});



/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
routerUser.post('/login', (req,res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password){
    return res.json({
        status: true,
        message: "User Is valid"
    })
  }

  else if (username !== user.username){
    return res.json({
        status: false,
        message: "User Name is invalid"
    })
  }

  else if (password !== user.password){
    return res.json({
        status: false,
        message: "Password is invalid"
    })
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
routerUser.get('/logout/:username', (req,res) => {
  const { username } = req.params;
  console.log(username)
  return res.send(`<b>${username} successfully logged out.<b>`);
});

module.exports = routerUser;