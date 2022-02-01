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
  name: "countries",
  data() {
    return {
      info: [],
      load: true,
      error: false,
      pageLimit: 19,
      pageNumber: 0,
      search: "",
    };
  },
  mounted() {
    axios
      .get(
        `https://api.openaq.org/v2/measurements?city=${this.chosenCity}&limit=8000`
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