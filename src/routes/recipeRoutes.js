const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.delete("/:id", protect, admin, deleteRecipe);
router.put("/:id", protect, updateRecipe);

module.exports = router;
