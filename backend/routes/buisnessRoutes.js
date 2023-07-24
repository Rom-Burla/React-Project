//                                                                                           בס"ד

const { Router } = require("express");
const router = Router();
const buisnessController = require("../controllers/buisnessController");
const { requireAuth } = require("../middleware/authMiddleware");

// localhost:3000/buisness-card
router.post("/", requireAuth, buisnessController.card_post);

// localhost:3000/buisness-card
router.get("/", buisnessController.card_get)

// localhost:3000/buisness-card/user/token
router.get("/user/token", requireAuth, buisnessController.card_by_token);

// localhost:3000/buisness-card/user/:id
router.get("/user/:id", requireAuth, buisnessController.card_by_user_id);

// localhost:3000/buisness-card/:id
router.get("/:id", buisnessController.card_get_by_id);

// localhost:3000/buisness-card/:id
router.put("/:id", requireAuth, buisnessController.card_update_by_id);

// localhost:3000/buisness-card/:id
router.delete("/:id",requireAuth, buisnessController.card_delete_by_id);

module.exports = router;
