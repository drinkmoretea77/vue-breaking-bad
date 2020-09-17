<template>
  <div class="occupation">
    <PageTitle :str="pageTitle" :key="pageTitle"/>
    <div v-if="ok" class="data-content">
      <div class="occupation-row" v-for="(value, index) in occupationList" :key="index">
        <span class="occupation-title">{{ index }}:</span>
        <span class="occupation-value">{{value.join(', ')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "./PageTitle.vue";
import breakingBadApi from "@/beakingBadApi.js";
export default {
  data() {
    return {
      occupationList: {},
      ok: false,
      pageTitle: "Occupation list"
    };
  },

  components: {
    PageTitle
  },

  methods: {
    getOccupationList() {
      breakingBadApi.getAllCharacters().then(response => {
        let occupationNames = [];

        // 1. create unique list of occupation names
        response.data.forEach(element => {
          // console.log(`response: ${Object.entries(element)}`);
          const keys = Object.keys(element.occupation);
          // console.log(keys);
          keys.forEach(key => {
            let occupation = element.occupation[key];
            occupationNames.push(occupation);
          });
        });

        let toLower = occupationNames.map(x =>
          typeof x === "string" ? x.toLowerCase() : x
        );
        let unique = [...new Set(toLower)];
        unique.sort();
        for (const key of unique) {
          this.occupationList[key] = [];
        }

        unique.forEach(uniqueVal => {
          // console.log(uniqueVal);

          response.data.forEach(element => {
            const keys = Object.keys(element.occupation);
            keys.forEach(key => {
              //console.log(`el: ${element.occupation[key]}`)
              if (
                uniqueVal.toUpperCase() ===
                element.occupation[key].toUpperCase()
              ) {
                // console.log(
                //   `character ${element.name} | occupation ${uniqueVal}`
                // );
                this.occupationList[uniqueVal].push(element.name);
              }
            });
          });
        });
        this.ok = true;
        // console.log(Object.entries(this.occupationList));
      });
    }
  },

  created() {
    this.getOccupationList();
  }
};
</script>

<style>
.occupation-row {
  margin-bottom: 10px;
}
.occupation-row::first-letter {
  text-transform: uppercase;
}
.occupation-title {
  font-weight: bold;
  margin-right: 10px;
}
</style>
