import React, { useEffect, useState } from "react";
import axios from "axios";

const Kids = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=bc289d54b1ccc5174256ab9a3b2ee315"
      );

      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray">
      <form className="d-flex container mx-auto pt-100">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className="btn btn-outline-dark fw-bold" type="submit">
          Search
        </button>
      </form>

      <div className="container mx-auto row mt-5">
        {movies
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (
              val.original_title.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, id) => {
            return (
              <div
                key={id}
                className="card mx-auto shadow"
                style={{ width: "22rem" }}
              >
                <img
                  src={"http://image.tmdb.org/t/p/w500/" + val.poster_path}
                  className="card-img-top"
                  alt="movie's poster"
                />
                <div className="card-body">
                  <h5 className="card-title">{val.original_title}</h5>
                  <p className="card-text">{val.overview}</p>
                  <h6 className="card-text py-2">
                    release date: {val.release_date}
                  </h6>
                  <div className="d-flex justify-content-between">
                    <p className="btn btn-danger fw-bold">Watch Movie</p>
                    <h6 className="card-text fw-bold px-2 py-2">
                      Ratings: {val.vote_average}
                    </h6>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Kids;
