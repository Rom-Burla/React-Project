//                                                                                           בס"ד

const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

// localhost:3000/user/signup
router.post("/signup", userController.signup_post);

//  localhost:3000/user/login
router.post("/login", userController.login_post);

// localhost:3000/user/logout
router.post('/logout', userController.logout_post)

// localhost:3000/user/token
router.get("/token", userController.by_token);

// localhost:3000/user/favorite/:id
router.put('/favorite/:id', userController.user_add_favorite)

// localhost:3000/user/favorite:id
router.delete('/favorite/:id', userController.user_delete_favorite)

// localhost:3000/user/favorite
router.get('/favorite', userController.user_get_favorites)


module.exports = router;
