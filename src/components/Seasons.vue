<template>
  <div class="seasons">
    <div class="tabs">
      <ul>
        <li
          :class="{active: isActive(index-1)}"
          @click="switchCurrentSeason(index-1)"
          v-for="index in seasons.length"
          :key="index"
        >Season {{ index }}</li>
      </ul>
    </div>
    <div class="main-container">
      <PageTitle :str="pageTitle" :key="pageTitle"/>
      <div class="cards">
        <div
          class="card"
          v-for="(value) in seasons[currentSeason]"
          :key="value.episode_id"
          @click="$router.push({
          name: 'episode',
          params: {
            id: value.episode_id
          } 
         })"
        >
          <div class="card-content">
            <div class="card-name">{{ value.title }}</div>
            <div class="card-title">
              <span class="card-caption">Ep:</span>
              {{ value.episode }}
            </div>
            <div class="card-title">
              <span class="card-caption">Air date:</span>
              {{ value.air_date }}
            </div>
            <span class="card-caption">Characters:</span>
            <ul class="card-list">
              <li
                class="card-list-item"
                v-for="(character, index) in value.characters"
                :key="index"
              >
                <span>{{ character }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "./PageTitle.vue";
import breakingBadApi from "@/beakingBadApi.js";

export default {
  components: {
    PageTitle
  },

  data() {
    return {
      seasons: [],
      currentSeason: 0 /* from 0 to n */,
      pageTitle: ""
    };
  },

  methods: {
    // get all episodes, splitted by seasons
    getEpisodesAll() {
      breakingBadApi.getEpisodes().then(response => {
        response.data.forEach((element, index) => {
          let seasonNum = parseInt(element.season, 10),
            tmpArr = [];
          if (this.seasons[seasonNum - 1] === undefined) {
            tmpArr.push(element);
            this.seasons.push(tmpArr);
          } else {
            this.seasons[seasonNum - 1].push(element);
          }
        });
      });
    },

    // change current index of a season
    switchCurrentSeason(index) {
      this.currentSeason = index;
    },

    // check for active tab
    isActive(index) {
      return index === this.currentSeason;
    },

    // set title for a page
    setPageTitle(value) {
      this.pageTitle = `Breaking Bad Episodes. Season ${value}`;
    }
  },

  created() {
    this.getEpisodesAll();
    this.setPageTitle(this.currentSeason + 1);
  },

  watch: {
    //change title if current season was changed
    currentSeason(value) {
      this.setPageTitle(value + 1);
    }
  }
};
</script>

