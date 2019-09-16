<template>
  <v-card>
    <v-card-title>
      <span class="title">My codes (local storage)</span>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="codes" :items-per-page="10">
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteCode(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import utils from '../utils'
  import api from '../api'
  import { mapState, mapMutations } from 'vuex'

  export default {
    data: () => ({
      headers: [
        { text: 'Code', value: 'code' },
        { text: 'Amount', value: 'amount' },
        { text: 'Actions', value: 'action' },
      ]
    }),
    mounted: function () {
    },
    computed: {
      ...mapState(['codes'])
    },
    methods: {
      ...mapMutations(['deleteCode'])
    },
  }
</script>
