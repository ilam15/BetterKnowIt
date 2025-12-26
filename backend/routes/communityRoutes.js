const express = require("express");
const router = express.Router();
const { getCommunities, getCommunitybyId, postCommunity, updateCommunity, deleteCommunity } = require("../controllers/communityController");

const auth = require("../middleware/authmiddleware");

router.get("/", getCommunities)
router.get("/:id", getCommunitybyId)
router.post("/", auth, postCommunity)
router.put("/:id", auth, updateCommunity)
router.delete("/:id", auth, deleteCommunity)

module.exports = router
