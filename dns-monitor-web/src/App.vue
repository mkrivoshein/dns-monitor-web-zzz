<script>
//const API_URL = `http://192.168.1.186:8001/dns/`
import axios from "axios";

const API_URL = `dns/`

export default {
  data: () => ({
    domainValid: true,
    domainInput: '',
    domain: '',
    domainRules: [
      v => !!v || 'Domain is required',
      v => /.+\..+/.test(v) || 'Domain must be valid',
    ],
    url: null,
    records: null,
    errored: false,
    loading: true
  }),

  mounted() {
    // fetch on init
    this.fetchData()
    // this.url = `${API_URL}${this.domain}`
    // axios
    //     .get(this.url)
    //     .then(response => {
    //       this.records = response.data
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       this.errored = true
    //     })
    //     .finally(() => this.loading = false)
  },

  watch: {
    // re-fetch whenever currentBranch changes
    domain: 'fetchData'
  },

  methods: {
    async validate() {
      await this.$refs.form.validate()
    },
    async queryDns() {
      await this.validate()

      if (this.domainValid) {
        this.domain = this.domainInput
        this.fetchData()
      }
    },
    async fetchData() {
      // this.url = `${API_URL}${this.domain}`
      // this.records = await (await fetch(this.url)).json()
      if (this.domainValid) {
        this.url = `${API_URL}${this.domain}`
        axios
            .get(this.url)
            .then(response => {
              this.records = response.data
              this.errored = false
            })
            .catch(error => {
              console.log(error)
              this.errored = true
            })
            .finally(() => this.loading = false)
      } else {
        this.errored = true;
      }
    }
  }
}
</script>

<template>
  <v-app style="z-index: 0">
    <v-app-bar app color="blue-lighten-5">
      <v-app-bar-title>DNS Monitor</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
          <v-card class="pa-2">
            <v-form ref="form" v-model="domainValid">
              <v-text-field v-model="domainInput" :rules="domainRules" label="Domain"
                            required></v-text-field>
              <v-btn @click="queryDns()">Update</v-btn>
            </v-form>
          </v-card>
          <v-card class="mx-auto pt-4 pb-4 d-block">
            <v-card-header>
              <v-card-header-text>
                <v-card-title>Query Parameter</v-card-title>
              </v-card-header-text>
              <v-card-text>
              </v-card-text>
            </v-card-header>
          </v-card>
          <v-card>
            <v-card-header>
              <v-card-header-text>
                <v-card-title>Results for {{ domain }}</v-card-title>
                <v-card-subtitle>DNS records published for the domain</v-card-subtitle>
              </v-card-header-text>
            </v-card-header>
            <v-card-text>
              <v-list density="compact">
              </v-list>
              <v-alert type="error" v-if="errored">
                <v-alert-title v-if="domainValid">Unable to query DNS for {{domain}}</v-alert-title>
                <v-alert-title v-else>Unable to query for DNS unless domain is a valid domain</v-alert-title>
                <p>Check if you entered domain name correctly or try again later</p>
              </v-alert>
              <section v-else>
                <section type="info" v-if="loading">
                  <div>Loading...</div>
                  <!--    <button @click="fetchData()">Fetch Records from {{ url }}</button>-->
                </section>
                <div v-else>
                  <ul>
                    <li v-for="record in records.records">
                      {{ record }}
                    </li>
                  </ul>
                </div>
              </section>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="fetchData()">Refresh</v-btn>
            </v-card-actions>
          </v-card>
      </v-container>
    </v-main>
    <v-footer app>

    </v-footer>
  </v-app>

  <!--  <header>-->
  <!--&lt;!&ndash;    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>&ndash;&gt;-->
  <!--    <h1>DNS Monitor</h1>-->
  <!--  </header>-->

  <!--  <main>-->
  <!--    <h2>{{ domain }}</h2>-->

  <!--    -->

  <!--    <section v-if="errored">-->
  <!--      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>-->
  <!--    </section>-->

  <!--    <section v-else>-->
  <!--      <div v-if="loading">Loading...</div>-->
  <!--      &lt;!&ndash;    <button @click="fetchData()">Fetch Records from {{ url }}</button>&ndash;&gt;-->

  <!--      <div v-else>-->
  <!--        <p>Loaded data from {{ records.domain }}</p>-->
  <!--        <ul>-->
  <!--          <li v-for="record in records.records">-->
  <!--            {{ record }}-->
  <!--          </li>-->
  <!--        </ul>-->
  <!--      </div>-->
  <!--    </section>-->

  <!--  </main>-->
</template>

<style lang="scss">
//@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

/*header {*/
/*  line-height: 1.5;*/
/*}*/

/*.logo {*/
/*  display: block;*/
/*  margin: 0 auto 2rem;*/
/*}*/

/*a,*/
/*.green {*/
/*  text-decoration: none;*/
/*  color: hsla(160, 100%, 37%, 1);*/
/*  transition: 0.4s;*/
/*}*/

/*@media (hover: hover) {*/
/*  a:hover {*/
/*    background-color: hsla(160, 100%, 37%, 0.2);*/
/*  }*/
/*}*/

/*@media (min-width: 1024px) {*/
/*  body {*/
/*    display: flex;*/
/*    place-items: center;*/
/*  }*/

/*  #app {*/
/*    display: grid;*/
/*    grid-template-columns: 1fr 1fr;*/
/*    padding: 0 2rem;*/
/*  }*/

/*  header {*/
/*    display: flex;*/
/*    place-items: center;*/
/*    padding-right: calc(var(--section-gap) / 2);*/
/*  }*/

/*  header .wrapper {*/
/*    display: flex;*/
/*    place-items: flex-start;*/
/*    flex-wrap: wrap;*/
/*  }*/

/*  .logo {*/
/*    margin: 0 2rem 0 0;*/
/*  }*/
/*}*/
</style>
