<template>
  <div class="episode">
    <PageTitle :str="pageTitle" :key="pageTitle" />
    <div class="cards">
      <div
        class="card card-with-photo"
        v-for="(value, index) in charactersData"
        :key="index"
        @click="$router.push({
          name: 'character',
          params: {
            id: value.char_id
          } 
         })"
      >
        <div class="card-content">
          <div class="card-name">{{ value.name }}</div>
        </div>
        <div class="card-photo-container">
          <div class="card-photo" :style="{ backgroundImage: 'url(' + value.img + ')'}"></div>
        </div>
        <div class="card-content">
          <div class="card-title">
            <span class="card-caption">Nickname:</span>
            {{ value.nickname }}
          </div>
          <div class="card-title">
            <span class="card-caption">Portrayed:</span>
            {{ value.portrayed }}
          </div>
        </div>
      </div>
    </div>
    <div class="episode-info">
      <div class="episode-info-title page-subtitle">
        <h2>Deaths in episode</h2>
      </div>
      <div v-if="deaths && deaths.length > 0" class="cards not-active">
        <div class="card" v-for="(element, index) in deaths" :key="index">
          <div class="card-content">
            <div class="card-name">{{ element.death }}</div>
            <div class="card-title">
              <span class="card-caption">Cause</span>
              {{ element.cause }}
            </div>
            <div class="card-title">
              <span class="card-caption">Responsible</span>
              {{ element.responsible }}
            </div>
            <div class="card-title">
              <span class="card-caption">Last words</span>
              {{ element.last_words }}
            </div>
            <div class="card-title">
              <span class="card-caption">Season</span>
              {{ element.season }}
            </div>
            <div class="card-title">
              <span class="card-caption">Episode</span>
              {{ element.episode }}
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center; color: #edfafa; margin-bottom: 40px" v-else>All alive</div>
    </div>
  </div>
</template>

<script>
import PageTitle from "./PageTitle.vue";
import breakingBadApi from "@/beakingBadApi.js";

export default {
  data() {
    return {
      charactersData: [],
      pageTitle: "",
      deaths: [],
      season: "",
      episode: "",
    };
  },

  components: {
    PageTitle,
  },

  methods: {
    setPageTitle(value) {
      this.PageTitle = value;
    },

    // 1. get episode data by id. 2. get characters from episode
    getCharactersData() {
      if (this.$route.params.id !== undefined) {
        breakingBadApi
          .getEpisodeById(this.$route.params.id)
          .then((response) => {
            //setting page title (season number and episode name)
            this.pageTitle = `Season ${response.data[0].season}. Episode ${response.data[0].episode}. "${response.data[0].title}"`;
            this.setPageTitle(response.data[0].title);

            // get episode number (not episode_id!) and season number
            // (needed for further deaths info)
            this.episode = response.data[0].episode;
            this.season = response.data[0].season;

            return response.data[0];
          })
          .then((response) => {
            /* get characters from episode */
            response.characters.forEach((charName) => {
              breakingBadApi.getCharacterByName(charName).then((response) => {
                if (response.data[0] !== undefined) {
                  this.charactersData.push(response.data[0]);
                }
              });
            });
          });
      }
    },

    // get info about deaths in episode
    getEpisodeDeaths() {
      breakingBadApi.getDeaths().then((response) => {
        response.data.forEach((element) => {
          // console.log(`deaths: ${Object.entries(element)}`);
          if (
            parseInt(this.episode, 10) === element.episode &&
            parseInt(this.season, 10) === element.season
          ) {
            // console.log(
            //   `true ${this.episode} === ${element.episode} | ${
            //     this.season
            //   } === ${element.season} `
            // );
            this.deaths.push(element);
          } else {
            // console.log(
            //   `false ${this.episode} !== ${element.episode} | ${
            //     this.season
            //   } === ${element.season} `
            // );
          }
        });
      });
    },
  },

  created() {
    this.getCharactersData();
  },

  watch: {
    season() {
      // get deaths info after we know both season and episode numbers
      this.getEpisodeDeaths();
    },
  },
};
</script>

