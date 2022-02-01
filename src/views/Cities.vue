<template>
  <div class="city">
    <div v-if="error">
      <h4>Sorry we're unable to retreive this information at the moment</h4>
    </div>
    <div class="city" v-else>
      <div v-if="load">Loading... Please wait</div>
      <table>
        <thead class="country-head">
          <tr class="cities">
            <th>Code</th>
            <th>City</th>
            <th>Locations</th>
            <th>Count</th>
            <th>Parameters</th>
            <th>First updated</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody class="country-body">
          <tr class="data" v-for="(row, index) in pageCities" :key="index">
            <td v-text="row.country"></td>
            <td><a v-on:click="clickCity(row.city)" class="table-anchors">{{row.city}}</a></td>
            <td v-text="row.locations"></td>
            <td v-text="row.count"></td>
            <td v-text="row.parameters"></td>
            <td v-text="row.firstUpdated"></td>
            <td v-text="row.lastUpdated"></td>
          </tr>
        </tbody>
      </table>
      <button v-on:click="previous" class="buttons">previous</button>
      <button v-on:click="next" class="buttons">next</button>
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
      pageLimit: 19,
      pageNumber: 0,
    };
  },
  created() {
    axios
      .get("https://api.openaq.org/v2/cities?" + this.country)
      .then(function (results) {
        console.log(data);
        this.row = data.results;
      });
  },
  mounted() {
    axios
      .get(
        `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/cities?limit=2915&page=1&offset=0&sort=asc&order_by=country`
      )
      .then((response) => {
        this.info = response.data.results;
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
      })
      .finally(() => (this.load = false));
  },
  computed: {
    pageCities() {
      return this.info.slice(
        this.pageNumber * this.pageLimit,
        this.pageNumber * this.pageLimit + 1 + this.pageLimit
      );
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

<style scoped>
.city {
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  overflow: auto;
}

th,
tr,
td {
  border: 0.1rem solid #fff;
  padding: 0.4rem;
}

.buttons {
  width: 10%;
  margin-left: auto;
  margin-right: auto;
}

.table-anchors:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
