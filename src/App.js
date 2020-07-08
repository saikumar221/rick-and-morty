import React from "react";
import "./App.css";

export default function App() {
  const [episodes, setEpisodes] = React.useState([]);
  const [next, setNext] = React.useState(null);
  const [prev, setPrev] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  function fetchData(link = "https://rickandmortyapi.com/api/episode/") {
    fetch(link)
      .then(results => results.json())
      .then(data => {
        if (data.error) {
          setEpisodes([]);
          setIsError(true);
          setNext(null);
          setPrev(null);
        } else {
          setNext(data.info.next);
          setPrev(data.info.prev);
          setEpisodes(data.results);
          setIsLoading(false);
          setIsError(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function nextPage() {
    fetchData(next);
  }

  function prevPage() {
    fetchData(prev);
  }

  React.useEffect(() => {
    const searchLink = `https://rickandmortyapi.com/api/episode/?name=${searchText}`;
    fetchData(searchLink);
  }, [searchText]);

  return (
    <div className="App">
      <div className="jumbotron bg-black">
        <h1 className="display-4">
          Rick and Monty <br />
          Episodes!
        </h1>
      </div>
      <input
        type="text"
        value={searchText}
        placeholder="Search"
        onChange={event => setSearchText(event.target.value)}
      />
      {isLoading && (
        <div className="d-flex justify-content-center m-4">
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="container">
        <input
          style={{ display: isError ? "block" : "none" }}
          className=" error m-5 mx-auto  text-white"
          type="text"
          value="No matching Episodes"
          disabled
        />
        {episodes.map(episode => {
          return (
            <div key={episode.id} className="card text-white bg-dark m-3 ">
              <h5 className="card-header m">{episode.name}</h5>
              <div className="card-body">
                <h5 className="card-title"> {episode.episode}</h5>
                <p className="card-text">Created on {episode.created}</p>
                <label className="btn btn-outline-success">
                  {episode.air_date}
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="btn btn-light m-1"
        onClick={prevPage}
        disabled={prev === null}
      >
        prev
      </button>
      <button className="btn btn-light m-1" onClick={() => setSearchText("")}>
        Home
      </button>
      <button
        className="btn btn-light m-1"
        onClick={nextPage}
        disabled={next === null}
      >
        next
      </button>
    </div>
  );
}
