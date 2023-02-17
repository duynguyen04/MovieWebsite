const movie = require("../models/movie.js");
const genre = require("../models/genre.js");
const trailer = require("../models/trailer.js");

const pagingMovieList = (movies, page) => {
  const result = {
    results: [],
    page: 0,
    total_pages: 0,
  };
  let tempArr = [];
  movies.forEach((movie) => {
    if (tempArr.length === 20) {
      result.total_pages++;
      result.results.push(tempArr);
      tempArr = [];
      tempArr.push(movie);
    } else {
      tempArr.push(movie);
    }
  });
  result.total_pages++;
  result.results.push(tempArr);

  result.results = [...result.results[page - 1]];
  //   console.log(result.results[0]);
  if (page >= 1 && page != undefined) {
    result.page = page;
  }
  return result;
};

exports.getAllmovie = (req, res, next) => {
  movie.getProductFromFile((data) => {
    // console.log("asdasd");
    const result = pagingMovieList(data, 1);
    // console.log(result);
    res.json(result);
  });
};

exports.getTrendingMovie = (req, res, next) => {
  movie.getProductFromFile((data) => {
    const datasort = data.sort((a, b) => b.popularity - a.popularity);
    const result = pagingMovieList(datasort, 1);
    res.json(result);
  });
};

exports.getRatingMovie = (req, res, next) => {
  movie.getProductFromFile((data) => {
    const datasort = data.sort((a, b) => b.vote_average - a.vote_average);
    const result = pagingMovieList(datasort, 1);
    res.json(result);
  });
};

exports.getGenreMovie = (req, res, next) => {
  const ID = req.query.genre;
  // console.log(ID);
  if (!ID) {
    res.statusMessage = "Not found gerne parram";
    res.status(400).end();
  }
  let genreName;
  genre.getProductFromFile((genre) => {
    // console.log(genre);
    let genreIndex = genre.findIndex((data) => data.id == ID);
    // console.log(genreIndex);
    genreName = genre[genreIndex].name;
    // console.log("name", genreName);

    if (genreName) {
      // console.log("dung");
      movie.getProductFromFile((data) => {
        let genreMovie = [];
        data.forEach((dataGenre) => {
          dataGenre.genre_ids.forEach((item) => {
            if (item == ID) {
              genreMovie.push(dataGenre);
            }
          });
        });
        const result = pagingMovieList(genreMovie, 1);
        res.json({ ...result, genre_name: genreName });
      });
    } else {
      console.log(genreName);
      console.log("sai");
      res.statusMessage = `Not found gerne id: ${ID} `;
      res.status(400).end();
    }
  });
};

exports.getTrailerMovie = (req, res, next) => {
  const result = {
    results: {},
    key: 0,
  };
  const ID = req.query.film_id;
  if (!ID) {
    res.statusMessage = "Not found film_id parram";
    res.status(400).end();
  }
  movie.getProductFromFile((data) => {
    result.results = data.filter((item) => item.id == ID);
  });
  trailer.getProductFromFile((data) => {
    const dataFilterID = data.filter((item) => item.id == ID);
    // console.log(dataFilterID[0].videos);
    let dataFilter = dataFilterID[0].videos.filter((item) => {
      return item.site === "YouTube" && item.type === "Trailer";
    });
    if (!dataFilter) {
      dataFilter = dataFilterID[0].videos.filter((item) => {
        return item.site === "YouTube" && item.type === "Teaser";
      });
      // console.log("cos data");
    }
    if (dataFilter == undefined) {
      res.statusMessage = "Not found video";
      res.status(404).end();
    }
    dataFilter.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );
    result.key = dataFilter[0].key;
    res.json(result);
  });
};

exports.getMovieByKeyword = (req, res, next) => {
  const keyword = req.query.keyword.toLocaleLowerCase();
  const genrequery = req.query.genre.toLocaleLowerCase();
  const mediaType = req.query.mediaType.toLocaleLowerCase();
  const language = req.query.language.toLocaleLowerCase();
  const year = req.query.year.toLocaleLowerCase();

  // console.log(keyword);
  let existInOverview, existInTitle;
  let searchMovies = [];
  movie.getProductFromFile((data) => {
    searchMovies = data;
    if (keyword) {
      searchMovies = searchMovies.filter((item) => {
        if (item.title) {
          existInTitle = item.title.toLocaleLowerCase().search(keyword);
        } else {
          existInTitle = -1;
        }
        if (item.overview) {
          existInOverview = item.overview.toLocaleLowerCase().search(keyword);
        } else {
          existInOverview = -1;
        }
        if (existInOverview >= 0 || existInTitle >= 0) {
          // console.log(item);
          // searchkeyword.push(item);
          return true;
        } else {
          return false;
        }
      });
      // searchMovies = searchkeyword;
      console.log("1", searchMovies.length);
    }
    if (genrequery) {
      let genre_name = req.query.genre;
      console.log("genre", genre_name);
      // searchMovies = searchMovies.filter((item) => {});

      genre.getProductFromFile((genre) => {
        let genreID;
        // console.log(genre);
        let genreIndex = genre.findIndex((data) => data.name == genre_name);
        console.log("index", genreIndex);
        genreID = genre[genreIndex]?.id;
        // console.log("name", genreName);

        // if (genreID) {
        searchMovies = searchMovies.filter((item) => {
          item.genre_ids.forEach((i) => {
            if (i == genreID) {
              return true;
            }
          });
        });
        // }
      });
      console.log("2", searchMovies.length);
    }
    if (mediaType != "" && mediaType != "all") {
      console.log("type", mediaType);
      searchMovies = searchMovies.filter(
        (item) => item.media_type == mediaType
      );
      console.log("3", searchMovies.length);
    }
    if (language != "") {
      // console.log("type", language);
      searchMovies = searchMovies.filter(
        (item) => item.original_language == language
      );
      console.log("4", searchMovies.length);
    }
    if (year != "") {
      searchMovies = searchMovies.filter(
        (item) => new Date(item.release_date).getFullYear() == year
      );
      console.log("5", searchMovies.length);
    }
    // console.log("year", year);
    // console.log("195", typeof mediaType);

    // console.log(searchMovies.length);
    const result = pagingMovieList(searchMovies, 1);
    console.log(result.results.length);
    res.json(result);
  });
};
