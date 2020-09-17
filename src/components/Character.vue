<template>
  <div class="character">
    <PageTitle :str="pageTitle" :key="pageTitle" />
    <div class="character-content">
      <div class="character-img-container">
        <div class="character-img-wrapper">
          <div class="character-img" :style="{ backgroundImage: 'url(' + characterData.img + ')'}"></div>
        </div>
      </div>
      <div class="character-data-container">
        <div class="character-data-content">
          <div class="character-info">
            <div class="character-info-row">
              <span class="character-title">Birthday:</span>
              <span class="character-value">{{ characterData.birthday }}</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Occupation:</span>
              <span class="character-value">{{strFromArr(characterData.occupation)}}</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Nickname:</span>
              <span class="character-value">{{characterData.nickname}}</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Portrayed:</span>
              <span class="character-value">{{characterData.portrayed}}</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Appearance in seasons:</span>
              <span class="character-value">{{strFromArr(characterData.appearance)}}</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Category:</span>
              <span class="character-value">{{characterData.category}}</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Status:</span>
              <span class="character-value">{{characterData.status}}</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Episodes:</span>
              <ul class="character-values-list">
                <li v-for="(value, index) in characterEpisodes" :key="index">
                  <span class="character-value">
                    {{value.title}}
                    <small>(season {{ value.season }})</small>
                  </span>
                </li>
              </ul>
            </div>
            <div class="character-info-row">
              <span class="character-title">Responsible with deaths:</span>
              <ul
                v-if="deathsResponsible && deathsResponsible.length > 0"
                class="character-values-list"
              >
                <li v-for="(value, index) in deathsResponsible" :key="index">
                  <span class="character-value">
                    {{value.name}}
                    <small>(season {{ value.season }}, episode {{ value.episode }})</small>
                  </span>
                </li>
              </ul>
              <span v-else class="character-value not-resp">Not responsible</span>
            </div>
            <div class="character-info-row">
              <span class="character-title">Quotes:</span>
              <ul v-if="quotes && quotes.length > 0" class="character-values-list">
                <li v-for="(value, index) in quotes" :key="index">
                  <span class="character-value">{{ value }}</span>
                </li>
              </ul>
              <span v-else class="character-value not-resp">Has no quotes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breakingBadApi from "@/beakingBadApi.js";
import PageTitle from "./PageTitle.vue";

export default {
  data() {
    return {
      characterData: [],
      pageTitle: "",
      characterEpisodes: [],
      deathsResponsible: [],
      quotes: [],
    };
  },

  components: {
    PageTitle,
  },

  methods: {
    // get main info about character (by id)
    getCharacterData() {
      if (this.$route.params.id !== undefined) {
        breakingBadApi
          .getCharacterById(this.$route.params.id)
          .then((response) => {
            this.characterData = response.data[0];
            this.pageTitle = `${response.data[0].name}`;
          });
      }
    },

    // get episodes character is involved with
    getCharacterEpisodes() {
      breakingBadApi.getEpisodes().then((response) => {
        response.data.forEach((element) => {
          if (element.characters.indexOf(this.characterData.name) !== -1) {
            this.characterEpisodes.push({
              title: element.title,
              season: element.season,
            });
          }
        });
      });
    },

    // get info about deaths the character associated with
    getResponsible() {
      breakingBadApi.getDeaths().then((response) => {
        response.data.forEach((element) => {
          // console.log(
          //   `===\ndeath: ${element.death} | responsible ${element.responsible}`
          // );
          if (element.responsible.includes(this.characterData.name)) {
            // console.log(
            //   `true character ${
            //     this.characterData.name
            //   } responsible for death of ${element.death}`
            // );
            this.deathsResponsible.push({
              name: element.death,
              episode: element.episode,
              season: element.season,
            });
          } else {
            // console.log(`false character ${this.characterData.name} not responsible for death of ${element.death}`);
          }
        });
      });
    },

    // get info about the character quotes
    getQuotes() {
      breakingBadApi.getQuotes(this.characterData.name).then((response) => {
        response.data.forEach((element) => {
          // console.log(`author: ${element.author} | quote: ${element.quote}`);
          if (element.author.indexOf(this.characterData.name) !== -1) {
            this.quotes.push(element.quote);
          }
        });
      });
    },

    // make string from array
    strFromArr(arr) {
      let resultStr = "";
      if (typeof arr !== undefined && arr != null) {
        resultStr = arr.join(", ");
      }
      return resultStr;
    },

    // returns string from object with episodes, where character was involved in
    characterEpisodesToStr() {
      let str = "";
      this.characterEpisodes.forEach((element) => {
        str += `${element.title}, (s${element.season})`;
      });
      return str;
    },
  },

  created() {
    this.getCharacterData();
  },

  watch: {
    // call methods only after we get character name in characterData.name
    characterData() {
      this.getCharacterEpisodes();
      this.getResponsible();
      this.getQuotes();
    },
  },
};
</script>

<style>
.character-content {
  display: flex;
  color: #3a3a3a;
  padding-bottom: 20px;
  justify-content: center;
}
.character-img-container {
  flex: 0 0 32%;
  margin-right: 20px;
}
.character-img-wrapper {
  width: 100%;
  position: relative;
  padding-top: 125%;
}
.character-img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
}
.character-data-container {
  background: #edfafa;
  border-radius: 5px;
}
.character-data-content {
  padding: 20px;
}
.character-info-row {
  margin-bottom: 10px;
}
.character-title {
  font-weight: bold;
  margin-right: 10px;
}
.character-value small {
  font-size: smaller;
}
.character-values-list {
  display: block;
  margin-top: 10px;
}
.character-values-list li {
  padding: 5px;
  display: inline-block;
}

@media screen and (max-width: 649px) {
  .character-content {
    flex-wrap: wrap;
  }
  .character-img-container {
    flex: 0 1 500px;
    margin: 0 0 10px 0;
  }
  .character-data-container {
    flex: 0 1 500px;
  }
}
</style>
