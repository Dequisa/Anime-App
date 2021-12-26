import AnimeListItem from "./AnimeListItem";
import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/AnimeList.css";

function AnimeList({ rez }) {
  const [animes, setAnimes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [originalAnimeList, setOriginalAnimeList] = useState([]);

  useEffect(() => {
    const getanimes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/animes");
        setOriginalAnimeList(res.data.payload);
        setAnimes(res.data.payload);
      } catch (err) {
        console.log("Error Response from anime Search request", err);
      }
    };
    getanimes();
  }, []);

  const animeFilterOnChange = (e) => {
    const inputValue = e.target.value;
    // setInputValue(e.target.value);
    // e.target.reset();
    if (inputValue === "") {
      setAnimes(originalAnimeList);
      return;
    }
    const filteredAnimes = originalAnimeList.filter((anime) => {
      return anime.title.toLowerCase().includes(inputValue.toLowerCase());
    });
    setAnimes(filteredAnimes);
  };

  // const handleSearch = () => {

  // };
  return (
    <div className="List">
      <div className="searchBar">
        <label htmlFor="search"> Search by title </label>
        <input type="text" onChange={animeFilterOnChange} />
        {/* <button onClick={handleSearch}>SEARCH</button> */}
      </div>
      <div>
        {animes.map((anime) => (
          <AnimeListItem
            key={anime.anime_id}
            anime={anime}
            animeOnChange={animeFilterOnChange}
          />
        ))}
      </div>
    </div>
  );
}

export default AnimeList;
