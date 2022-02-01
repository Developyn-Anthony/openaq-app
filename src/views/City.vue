<template>
  <div class="city">
    <div v-if="error">
      <h4>Sorry we're unable to retreive this information at the moment</h4>
    </div>
    <div class="city" v-else>
      <div v-if="load">Loading... Please wait</div>
      <table class="country">
        <thead>
          <tr class="cities">
            <th>Country Code</th>
            <th>City</th>
            <th>Locations</th>
            <th>Count</th>
            <th>Parameters</th>
            <th>First Updated</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="data"
            v-for="(row, index) in currentPageCities"
            v-bind:key="index">
            <td v-text="row.country"></td>
            <td v-text="row.city" class="city-row" v-for="city in currentPageCities.city" v-bind:key="city"></td>
            <td><a v-on:click="clickCity(row.city)" class="table-anchors">{{row.city}}</a></td>
            <td v-text="row.locations"></td>
            <td v-text="row.count"></td>
            <td v-text="row.parameters"></td>
            <td v-text="row.firstUpdated"></td>
            <td v-text="row.lastUpdated"></td>
          </tr>
        </tbody>
      </table>
      <button class="buttons" v-on:click="next">next</button>
      <button class="buttons" v-on:click="previous">previous</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cities",
  data() {
    return {
      info: [],
      load: true,
      error: false,
      perPage: 19,
      pageNumber: 0,
    };
  },
  created() {
    axios
      .get("https://api.openaq.org/v2/cities" + this.country)
      .then(function (results) {
        console.log(data);
        this.row = data.results;
      });
  },
  mounted() {
    axios
      .get(
        `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/cities?country_id=${this.countryCode}&limit=2915&page=1&offset=0&sort=asc&order_by=country`
      )
      .then((response) => {
        this.info = response.data.results;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  computed: {
    currentPageCities() {
      return this.info.slice(
        this.pageNumber * this.perPage,
        this.pageNumber * this.perPage + 1 + this.perPage
      );
    },
    countryCode() {
      return this.$route.params.id;
    },
  },
  methods: {
    clickCity: function (city) {
      this.$router.push({ path: `/measurements/${city}` });
    },
    next() {
      this.pageNumber++;
    },
    previous() {
      this.pageNumber--;
    },
  },
};
</script>


<style>
.table-anchors:hover {
  cursor: pointer;
  text-decoration: underline;
}

.city {
    width: 98%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    overflow: auto;
}

th, tr, td {
    border: 0.1rem solid #fff;
    padding: 0.4rem;
}

.buttons {
    width: 10%;
    margin-left: auto;
    margin-right: auto;
}
</style>