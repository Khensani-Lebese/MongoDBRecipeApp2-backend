const Recipe = require("../models/recipeModel");

// Create a recipe
const createRecipe = async (req, res) => {
  const { title, description, ingredients, instructions } = req.body;

  try {
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      user: req.user.id,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "name email").exec();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("user", "name email")
      .exec();
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await recipe.remove();
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const { title, description, ingredients, instructions } = req.body;
    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
};
