<template>
  <div class="page-title">
    <h1>{{ pageTitle }}</h1>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    str: String
  },
  data() {
    return {
      pageTitle: this.str
    };
  }
};
</script>

