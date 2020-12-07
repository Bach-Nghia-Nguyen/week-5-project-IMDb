import React, { useState, useEffect } from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// import bootstrap
import { Badge, Card, Container, Button } from "react-bootstrap";

// import components
import PaginationBar from "../components/PaginationBar";
// api
import api from "../apiService";
// import router
import { useHistory } from "react-router-dom";

const movieApiKey = process.env.REACT_APP_MOVIE_API_KEY;

const MoviePosterBaseURL = `https://image.tmdb.org/t/p/w500`;

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);

  const history = useHistory();

  // get movies data
  useEffect(() => {
    console.log(movieApiKey);
    let url = `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`;
    const fetchMovieData = async () => {
      const response = await api.get(url);
      const data = response.data;

      setMovies(data.results);
      setPageNum(data.page);
      setTotalPageNum(data.total_pages);
    };
    fetchMovieData();
  }, [pageNum]);

  // get movie genres data
  useEffect(() => {
    let url = `genre/movie/list?language=en-US`;
    const fetchMovieGenreData = async () => {
      const response = await api.get(url);
      const data = response.data;
      setGenres(data.genres);
    };
    fetchMovieGenreData();
  }, []);

  const showMovieDetail = (movieId) => {
    history.push(`detail/${movieId}`);
  };

  return (
    <Container>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      />
      <div className="d-flex justify-content-around flex-wrap">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            style={{ width: "18rem" }}
            className="mb-5"
            onClick={() => showMovieDetail(movie.id)}
          >
            {/* Movie Poster */}

            <Card.Img
              variant="top"
              src={`${MoviePosterBaseURL}${movie.poster_path}`}
            />
            <Card.Body>
              {/* Movie title */}
              <Card.Title style={{ fontWeight: "bold" }}>
                {movie.title}
              </Card.Title>

              {/* Movie description cut */}
              <Card.Text style={{ color: "grey" }}>
                {movie.overview.length <= 70
                  ? movie.overview
                  : movie.overview.slice(0, 69) + "..."}
              </Card.Text>

              {/* Release date */}
              <Card.Text>Release: {movie.release_date}</Card.Text>

              {/* Rating */}
              <Card.Text>
                Rating: {movie.vote_average}{" "}
                <FontAwesomeIcon icon={faStar} style={{ color: "#fbc531" }} />
              </Card.Text>

              {/* Rating */}
              <Card.Text>
                Genres:{" "}
                {movie.genre_ids.map((genreId) => {
                  const genre = genres.find((genre) => genre.id === genreId);
                  return (
                    <Badge key={genreId} className="badge badge-info mr-2">
                      {genre ? genre.name : "unknown"}
                    </Badge>
                  );
                })}
              </Card.Text>

              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="btn btn-success">More info</Button>
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      />
    </Container>
  );
};

export default HomePage;
