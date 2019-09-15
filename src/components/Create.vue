<template>
  <v-card>
    <v-card-title>
      <span class="title">Create</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="code" label="Code"></v-text-field>
        <v-text-field v-model="amount" label="Amount" suffix="WAVES"></v-text-field>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="generate">Generate</v-btn>
          </template>
          <span>Generate new random code phrase</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-5" v-on="on" @click="create">Create</v-btn>
          </template>
          <span>Create new code with specified amount</span>
        </v-tooltip>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import utils from '../utils'
  import api from '../api'

  export default {
    data: () => ({
      code: '',
      amount: '1'
    }),
    mounted: function () {
      this.generate()
    },
    methods: {
      generate: function () {
        this.code = 'WCODE-' + utils.randomValueHex(16)
      },
      create: async function () {
        try {
          await api.checkKeeper()
          const kp = utils.keyPair(this.code)
          await api.create({ pk: kp.publicKey, amount: this.amount })
        } catch (e) {
          this.$emit('set-status', { display: true, text: e.message })
        }
      }
    },
  }
</script>
