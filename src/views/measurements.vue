<template>
  <div class="countries">
    <div v-if="error">
      <h4>Sorry we're unable to retreive this information at the moment</h4>
    </div>
    <div class="countries" v-else>
      <div v-if="load">Loading... Please wait</div>
      <table>
        <thead class="country-head">
          <tr class="country">
            <th>Country</th>
            <th>City</th>
            <th>Location</th>
            <th>Parameter</th>
            <th>Unit</th>
            <th>Value</th>
            <th>Date</th>
            <th>Coordinates Latitude</th>
            <th>Coordinates Longitude</th>
          </tr>
        </thead>
        <tbody class="country-body">
          <tr class="data" v-for="(row, index) in pageCities" :key="index">
            <td v-text="row.country"></td>
            <td v-text="row.city"></td>
            <td v-text="row.location"></td>
            <td v-text="row.parameter"></td>
            <td v-text="row.unit"></td>
            <td v-text="row.value"></td>
            <td v-text="row.date.local"></td>
            <td v-text="row.coordinates.latitude"></td>
            <td v-text="row.coordinates.longitude"></td>
          </tr>
        </tbody>
      </table>
      <div class="search">
        <input
          class="search"
          type="search"
          placeholder="Latitude, Longitude"
          v-model="coordSearch"
        />
        <button v-on:click="filtered()">Search</button>
      </div>
      <button v-on:click="previous" class="buttons">previous</button>
      <button v-on:click="next" class="buttons">next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "countries",
  data() {
    return {
      info: [],
      load: true,
      error: false,
      pageLimit: 19,
      pageNumber: 0,
      coordSearch: "",
    };
  },
  created() {
    axios
      .get("https://api.openaq.org/v2/measurements?" + this.city)
      .then(function (results) {
        console.log(data);
        this.row = data.results;
      });
  },
  mounted() {
    axios
      .get(
        `https://api.openaq.org/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2022-01-20T10%3A22%3A00%2B00%3A00&page=1&offset=0`
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
    filtered: function () {
      let coord = this.info;
      let coordSearch = this.coordSearch;

      if (!coordSearch) {
        return coord;
      }

      search = coordSearch.trim().toLowerCase();

      coord = coord.filter(function (lat) {
        if (
          lat.coordinates.latitude.toLowerCase().indexOf(coordSearch) !== -1
        ) {
          return lat;
        }
      });
      return coord;
    },
    pageCities() {
      return this.info.slice(
        this.pageNumber * this.pageLimit,
        this.pageNumber * this.pageLimit + 1 + this.pageLimit
      );
    },
    chosenCity() {
      return this.$route.params.id;
    },
  },
  methods: {
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
.countries {
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

.search {
  width: 31.5%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10%;
}
</style>