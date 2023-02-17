const express = require("express");

const router = express.Router();

const movieControler = require("../controllers/movie");

const auth = require("../middleware/auth");
router.get("/discover/tv", auth.authorized, movieControler.getAllmovie);

router.get(
  "/api/movies/trending",
  auth.authorized,
  movieControler.getTrendingMovie
);

router.get(
  "/api/movies/top-rate",
  auth.authorized,
  movieControler.getRatingMovie
);

router.get(
  "/api/movies/video",
  auth.authorized,
  movieControler.getTrailerMovie
);

router.get(
  "/api/movies/search",
  auth.authorized,
  movieControler.getMovieByKeyword
);

router.get(
  "/api/movies/discover",
  auth.authorized,
  movieControler.getGenreMovie
);

module.exports = router;
