<template>
  <div class="about">
    <PageTitle :str="pageTitle" :key="pageTitle"/>
    <div class="data-content about-inner">
      <div class="about-info">
        <div v-for="(value, index) in omdb" :key="index" class="about-element">
          <span class="about-title">{{ index }}:</span>
          <span class="about-value">{{ value }}</span>
        </div>
        <div class="about-element">
          <span class="about-title">Ratings:</span>
          <span class="about-value">{{ ratingsStr() }}</span>
        </div>
      </div>
      <div class="about-poster">
        <img class="poster-img" :src="poster" :alt="omdb.title">
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import axios from "axios";
import PageTitle from "./PageTitle.vue";
const api = axios.create({
  baseURL: "http://www.omdbapi.com/"
});

export default {
  data() {
    return {
      omdb: {},
      poster: "",
      ratings: [],
      pageTitle: "About"
    };
  },

  components: {
    PageTitle
  },

  methods: {
    getPoster() {
      api.get(`?apikey=88e836ce&i=+tt0903747`).then(response => {
        this.omdb = { ...response.data };
        this.poster = this.omdb.Poster;
        this.ratings = { ...this.omdb.Ratings };
        Vue.delete(this.omdb, "Poster");
        Vue.delete(this.omdb, "Ratings");
      });
    },

    ratingsStr() {
      let arr = [],
        str;
      const keys = Object.keys(this.ratings);
      keys.forEach(element => {
        arr.push(
          `${this.ratings[element].Value} by ${this.ratings[element].Source}`
        );
      });
      str = arr.join(", ");
      return str;
    }
  },

  created() {
    this.getPoster();
  }
};
</script>

<style>
.about-inner {
  display: flex;
  justify-content: space-between;
}
.about-element {
  margin: 0 0 10px 0;
}
.about-title {
  font-weight: bold;
}
.about-value {
  margin-left: 10px;
}
.about-poster {
  flex-shrink: 0;
  text-align: center;
  justify-content: center;
}
.about-info {
  padding: 0 10px;
}
.poster-img {
  max-width: 100%;
  height: auto;
}

@media screen and (max-width: 700px) {
  .about-inner {
    flex-wrap: wrap;
  }
  .about-poster {
    order: -1;
    margin-bottom: 20px;
    flex-shrink: 1;
  }
  .about-info {
    padding: 0 10px;
    flex-basis: 100%;
  }
}
</style>
