const API_KEY = "8qlOkxz4wq";

const requests = {
  fetchTrending: `/api/movies/trending?key=${API_KEY}`,
  fetchNetflixOriginals: `/discover/tv?key=${API_KEY}`,
  fetchTopRated: `/api/movies/top-rate?key=${API_KEY}`,
  fetchActionMovies: `/api/movies/discover?key=${API_KEY}&genre=28`,
  fetchComedyMovies: `/api/movies/discover?key=${API_KEY}&genre=35`,
  fetchHorrorMovies: `/api/movies/discover?key=${API_KEY}&genre=27`,
  fetchRomanceMovies: `/api/movies/discover?key=${API_KEY}&genre=10749`,
  fetchDocumentaries: `/api/movies/discover?key=${API_KEY}&genre=99`,
  fetchSearch: `/api/movies/search?key=${API_KEY}`,
};

// const requests = {
// 	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
// 	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
// 	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
// 	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
// 	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
// 	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
// 	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
// 	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
// 	fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
// }

export default requests;
