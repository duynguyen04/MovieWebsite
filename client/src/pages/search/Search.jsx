import React, { useState } from "react";

import Nav from "../../components/browse/Nav";
import SearchResult from "../../components/search/SearchResult";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState({});

  const [keyword, setkeyword] = useState("");
  const [genre, setgenre] = useState("");
  const [mediaType, setmediaType] = useState("");
  const [language, setlanguage] = useState("");
  const [year, setyear] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    setQuery({
      keyword: keyword,
      genre: genre,
      mediaType: mediaType,
      language: language,
      year: year,
    });
  };

  const resetSearch = () => {
    setQuery("");
    setSearchInput("");
  };
  console.log(year);

  return (
    <div className="app">
      <Nav />
      <div className="s009">
        <form>
          <div className="inner-form">
            <div className="form-group">
              <label for="email">Keyword:</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Keyword"
                onChange={(e) => setkeyword(e.target.value)}
                value={keyword}
              />
            </div>
            <div className="form-group">
              <label for="pwd">Genre:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Genre"
                onChange={(e) => setgenre(e.target.value)}
                value={genre}
              />
            </div>
            <div>
              <label for="pwd">MediaType:</label>
              <select
                className="form-select form-select-sm select-option"
                aria-label=".form-select-sm example mb-1"
                onChange={(e) => setmediaType(e.target.value)}
                value={mediaType}
              >
                <option selected value="">
                  Open this select mediaType
                </option>
                <option value="all">All</option>
                <option value="movie">Movie</option>
                <option value="tv">tv</option>
                <option value="person">Person</option>
              </select>
            </div>
            <div>
              <label for="pwd">language:</label>
              <select
                className="form-select form-select-sm select-option"
                aria-label=".form-select-sm example"
                onChange={(e) => setlanguage(e.target.value)}
                value={language}
              >
                <option selected value="">
                  Open this select language
                </option>
                <option value="en">en-us</option>
                <option value="jp">jp</option>
                <option value="kr">kr</option>
              </select>
            </div>
            <div className="form-group">
              <label for="pwd">Year:</label>
              <input
                onChange={(e) => setyear(e.target.value)}
                value={year}
                type="number"
                className="form-control"
                id="pwd"
                placeholder="Enter Year"
                name="pwd"
              />
            </div>
            <div className="advance-search">
              <div className="row third">
                <div className="input-field">
                  <div className="result-count"></div>
                  <div className="group-btn">
                    <button
                      className="btn-delete"
                      onClick={resetSearch}
                      type="button"
                    >
                      RESET
                    </button>
                    <button
                      className="btn-search"
                      type="button"
                      onClick={() => handleSearch()}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SearchResult query={query} />
    </div>
  );
};

export default Search;
