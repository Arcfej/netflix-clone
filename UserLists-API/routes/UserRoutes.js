const { addToLikedMovies, getLikedMovies } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);

module.exports = router;
