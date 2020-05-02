const express = require("express");
const User = require("../src/models/usermodel");
const auth = require("../src/middleware/auth");
//const router=express.Router()
const app = express();
app.use(express.json());

//to get user profile
app.get("/users/profile", auth, async (req, res) => {
  try {
    res.send(req.user);
    if ((req.user = null)) {
      throw new Error();
    }
  } catch (e) {
    res.status(404).send();
  }
});

//login 
app.post("/users/login", async (req, res) => {
  try {
    const getuser = await User.getCredentials(
      req.body.email,
      req.body.password
    );
    console.log("getuser");
    console.log(getuser);
    const token = await getuser.generateToken();
    res.send({ user: getuser.getPublicProfile(), token });
  } catch (e) {
    res.status(404).send();
  }
});

//create users
app.post("/users", async (req, res) => {
  const reqbody = req.body;
  try {
    const user1 = new User(reqbody);
    await user1.save();
    const token = await user1.generateToken();
    res.send({ user1, token });
  } catch (e) {
    res.status(404).send();
  }
});
//get user by ID
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  await User.findById(_id)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
});
//update user
app.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.user._id);
    updates.forEach((update) => {
      user[update] = req.body[update];
      user.save();

      if (!user) {
        res.status(404).send();
      }
    });
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});
//logout
app.post("/users/logout", auth, async (req, res) => {
  req.user.tokens = req.user.tokens.filter((tokens) => {
    return tokens.token !== req.token;
  });
  await req.user.save();
  res.send();
});
//logout all
app.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(404).send();
  }
});
//delete user
app.delete("/users/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send();
  } catch (e) {
    res.status(404).send();
  }
});
module.exports = app;
