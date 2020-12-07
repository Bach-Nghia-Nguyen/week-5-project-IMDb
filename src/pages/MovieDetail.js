import React, { useEffect, useState } from "react";

import "./../App.css";
import { Media, Badge } from "react-bootstrap";

import { generatePath, useParams } from "react-router-dom";

import api from "../apiService";

const MoviePosterBaseURL = `https://image.tmdb.org/t/p/w300`;

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const movieId = params.id;

  const [genres, setGenres] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await api.get(`/movie/${movieId}`);
      setMovie(res.data);
    };
    getData();
  }, [movieId]);

  // get movie genres data
  useEffect(() => {
    let url = `genre/movie/list?language=en-US`;
    const fetchMovieGenreData = async () => {
      try {
        const response = await api.get(url);
        const data = response.data;
        setGenres(data.genres);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchMovieGenreData();
  }, []);

  return (
    <Media className="d-flex justify-content-around align-items-center movie-info">
      <img
        className="mr-3 ml-4"
        src={`${MoviePosterBaseURL}${movie?.poster_path}`}
        alt="Movie Poster"
      />
      <Media.Body className="info-right-col">
        <h3 className="mb-4 movie-title">{movie?.title}</h3>
        <div>
          <span>Release: {movie?.release_date}</span>
          <span>
            {/* {movie?.genres.map((genreId) => {
              const genre = genres?.find((genre) => genre.id === genreId);
              return (
                <Badge key={genreId} className="badge badge-info mr-2">
                  {genre ? genre.name : "unknown"}
                </Badge>
              );
            })} */}
            {/* {movie?.genres.map((genre) => (
              <Badge key={genreId} className="badge badge-info mr-2">
                {genre.name}
              </Badge>
            ))} */}
          </span>
        </div>

        <p>
          <strong>Overview:</strong> {movie?.overview}
        </p>
      </Media.Body>
    </Media>
  );
};

export default MovieDetail;
