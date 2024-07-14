import Cards from "./components/Card/Cards";
import { Route } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import LandingPage from "./components/LandingPage/LandingPage";
import Create from "./components/FormCreate/Create";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
function App() {
  return (
    <div>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/pokemons/form">
        <Create />
      </Route>
      <Route exact path="/pokemons">
        <Cards />
      </Route>
      <Route path="/pokemons/detail/:id">
        <Detail />
      </Route>
    </div>
  );
}

export default App;
