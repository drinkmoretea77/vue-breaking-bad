import axios from "axios";

const api = axios.create({
  baseURL: "https://www.breakingbadapi.com/api/"
});

export default {
  getEpisodes() {
    return api.get("/episodes");
  },
  getEpisodeById(id) {
    return api.get(`/episodes/${id}`);
  },
  getAllCharacters() {
    return api.get("/characters");
  },
  getCharacterByName(name) {
    let queryStr = name.split(" ").join("+");
    return api.get(`/characters?name=${queryStr}`);
  },
  getCharacterById(id) {
    return api.get(`/characters/${id}`);
  },
  getDeaths() {
    return api.get(`/deaths`);
  },
  getQuotes() {
    return api.get(`/quotes`);
  }
};
