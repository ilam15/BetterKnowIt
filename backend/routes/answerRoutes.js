const express = require("express");
const router = express.Router();
const { getAnswers, getAnswerbyId, postAnswer, updateAnswer, deleteAnswer } = require("../controllers/answerController");

const auth = require("../middleware/authmiddleware");

router.get("/", getAnswers)
router.get("/:id", getAnswerbyId)
router.post("/", auth, postAnswer)
router.put("/:id", auth, updateAnswer)
router.delete("/:id", auth, deleteAnswer)

module.exports = router
