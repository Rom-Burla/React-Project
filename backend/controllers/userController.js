//                                                                                           בס"ד

const User = require("../models/User");
const jwt = require("jsonwebtoken");


// create jwt
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id, biz, admin,favorites) => {
  return jwt.sign(
    { id, biz, admin,favorites },
    "Moria ve Rom Hatotahim asu project node.js and Rachael take pictures of cats down the streets",
    { expiresIn: maxAge }
  );
};

// user signup (create new user)
const signup_post = async (req, res) => {
  try {
    const user = new User(req.body);
    const err = user.userValidation(req.body);
    if (err.error) {
      res.status(400).json(err.error.details[0].message);
    } else {
      const user = await User.create(req.body);
      const token = createToken(user._id, user.biz, user.admin);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({'user':user,'token':token});
      console.log(user);
    }
  } catch (err) {
    res.status(409).json(err);
  }
};

// user login (validate user)
const login_post = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.biz, user.admin,user.favorites);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({'user':user,'token':token});
  } catch (err) {
    console.log(err.message);
    let error = err.message;
    if (error === "Incorrect Email") {
      error = "Email could not be found in DB";
    }
    if(error === 'Incorrect Password'){
      error = 'Incorrect Password'
    }
    res.status(400).json(err.message);
  }
};

// user logout
const logout_post = async(req,res)=>{
  if(req.cookies.jwt){
    res.clearCookie('jwt')
    res.json('User Logged Out')
  }else{
    res.json('not logged in')
  }
}

// get user by id
const by_token = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "Moria ve Rom Hatotahim asu project node.js and Rachael take pictures of cats down the streets",
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json("No user was found");
        } else {
          try {
            let user = await User.findById(decodedToken.id);
            res.status(200).json(user);
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
        }
      }
    );
  } else {
    res.status(401).json("No token was found");
  }
};

// put user favorites by buisness card id\

const user_add_favorite = async (req,res) =>{
  const token = req.cookies.jwt;
  let buisnessCard = req.params.id
  if (token) {
    jwt.verify(
      token,
      "Moria ve Rom Hatotahim asu project node.js and Rachael take pictures of cats down the streets",
    async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json("No user was found");
        } else {
          try {
          let user = await User.findByIdAndUpdate(decodedToken.id, {$push: {favorites: buisnessCard}})
          user = await User.findById(decodedToken.id)
          res.status(200).json(user)
        }
        catch(err){
          res.status(500).json("Couldn't add favorite")
                }
              }
            }
          )
        }else{
          res.status(401).json('No token was found')
        }}

        const user_delete_favorite=async(req,res)=>{
          const token = req.cookies.jwt;
  let buisnessCard = req.params.id
  if (token) {
    jwt.verify(
      token,
      "Moria ve Rom Hatotahim asu project node.js and Rachael take pictures of cats down the streets",
    async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json("No user was found");
        } else {
          try {
          let user = await User.findByIdAndUpdate(decodedToken.id, {$pull: {favorites: buisnessCard}})
          user = await User.findById(decodedToken.id)
          res.status(200).json(user)
        }
        catch(err){
          res.status(500).json("Couldn't delete favorite")
                }
              }
            }
          )
        }else{
          res.status(401).json('No token was found')
        }}
        

        const user_get_favorites=async(req,res)=>{
            const token = req.cookies.jwt;
             if (token) {
               jwt.verify(
                 token,
                 "Moria ve Rom Hatotahim asu project node.js and Rachael take pictures of cats down the streets",
              async (err, decodedToken) => {
            if (err) {
              console.log(err);
              res.status(401).json("No user was found");
           } else {
             try {
                let user = await User.findById(decodedToken.id).populate({path: 'favorites'});
             res.status(200).json(user.favorites);
              } catch (err) {
               console.log(err);
              res.status(500).json(err);
              }
        }
      }
    );
  } else {
    res.status(401).json("No token was found");
  }
};
        

module.exports = {
  signup_post,
  login_post,
  logout_post,
  by_token,
  user_add_favorite,
  user_get_favorites,
  user_delete_favorite
};
