const express = require("express");
const router = express.Router();
const { getProfiles, getProfilebyId, postProfile, updateProfile, deleteProfile } = require("../controllers/profileController");

const auth = require("../middleware/authmiddleware");

router.get("/", getProfiles)
router.get("/:id", getProfilebyId)
router.post("/", auth, postProfile)
router.put("/:id", auth, updateProfile)
router.delete("/:id", auth, deleteProfile)

module.exports = router
