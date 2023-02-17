const express = require("express");
const cors = require("cors");
const app = express();

const err = require("./controllers/err.js");
const movieRouter = require("./routes/movie.js");

app.use(cors());

// app.get("/", movieControler.getAllmovie);
app.use(movieRouter);
// app.get("/api/movies/top-rate", movieControler.getRatingMovie);

// app.get("/api/movies/video", auth.authorized, movieControler.getTrailerMovie);

// app.get("/api/movies/search", movieControler.getMovieByKeyword);

// app.get("/api/movies/discover", movieControler.getGenreMovie);
app.use(err.err);
app.listen(5000);
