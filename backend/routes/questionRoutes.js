const express = require("express");
const router = express.Router();
const { getQuestions, getQuestionbyId, postQuestion, updateQuestion, deleteQuestion } = require("../controllers/questionController");

const auth = require("../middleware/authmiddleware");

router.get("/", getQuestions)
router.get("/:id", getQuestionbyId)
router.post("/", auth, postQuestion)
router.put("/:id", auth, updateQuestion)
router.put("/:id/vote", auth, require("../controllers/questionController").voteQuestion)
router.delete("/:id", auth, deleteQuestion)

module.exports = router
