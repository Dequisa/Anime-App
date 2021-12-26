import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import background_image from "./Assets/background_image.png";
import React from "react";
import axios from "axios";

// Components
import NavBar from "./Components/NavBar";
import SideNavBar from "./Components/SideNavBar";

// Pages
// import Edit from "./Pages/Edit"
import New from "./Pages/New";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import ErrorPage from "./Pages/ErrorPage";
import AnimeDetailPage from "./Pages/AnimeDetailsPage";
import ArtPage from "./Pages/ArtPage";
import CharacterDetailPage from "./Pages/CharacterDetailPage";
import QuizPage from "./Pages/QuizPage";
import AddCharacterPage from "./Pages/AddCharacterPage";
import PreferencePage from "./Pages/PreferencePage";
import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import ReviewPage from "./Pages/ReviewPage";

axios.defaults.withCredentials = true;

function App() {
  const [animes, setAnimes] = useState([]);
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
  return (
    <div className="App">
      <Router>
        <NavBar />
        <SideNavBar />
        <main>
          <div style={{ backgroundImage: `url(${background_image})` }} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/animes">
              <Index />
            </Route>
            <Route path="/animes/new">
              <New />
            </Route>
            <Route exact path="/animes/:id">
              <AnimeDetailPage />
            </Route>
            <Route exact path="/animes/:id/addCharacters">
              <AddCharacterPage />
            </Route>
            <Route exact path="/animes/:id/characters">
              <CharacterDetailPage />
            </Route>
            <Route path="/animes/:id/edit">{/* <Edit /> */}</Route>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
            <Route path="/preferences">
              <PreferencePage />
            </Route>
            <Route path="/userlogin">
              <LoginPage />
            </Route>
            <Route path="/animes/:id/reviews">
              <ReviewPage />
            </Route>
            <Route path="/quiz">
              <QuizPage />
            </Route>
            <Route path="/art">
              <ArtPage />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
