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
            <th>Code</th>
            <th>Country</th>
            <th>Cities</th>
            <th>Locations</th>
            <th>Count</th>
            <th>Sources</th>
            <th>Parameters</th>
            <th>First updated</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody class="country-body">
          <tr class="data" v-for="(row, index) in pageCountries" :key="index">
            <td><a v-on:click="clicked(row.code)" class="table-anchors">
              {{ row.code }}
            </a></td>
            <td
              v-text="row.code"
              class="country-row"
              v-for="country in pageCountries.name"
              :key="country"
            ></td>
            <td v-text="row.name"></td>
            <td v-text="row.cities"></td>
            <td v-text="row.locations"></td>
            <td v-text="row.count"></td>
            <td v-text="row.sources"></td>
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
  name: "countries",
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
    axios.get("https://api.openaq.org/v2/countries?" + this.city).then(function (results) {
        console.log(data);
        this.row = data.results;
    });
  },
  mounted() {
      axios.get(`https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries`).then(response => {
          this.info = response.data.results
      })
      .catch(error => {
          console.log(error);
          this.error = true
      })
      .finally(() => this.load = false)
  },
  computed: {
      pageCountries() {
          return this.info.slice(this.pageNumber*this.pageLimit, this.pageNumber*this.pageLimit+1+this.pageLimit)
      }
  },
  methods: {
      clicked(code) {
          this.$router.push({ path: `/city/${code}` })
      },
      next(){
        this.pageNumber++;
      },
      previous(){
        this.pageNumber--;
      },
  }
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

th, tr, td {
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