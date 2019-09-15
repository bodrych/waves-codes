<template>
  <v-card>
    <v-card-title>
      <span class="title">Create code</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="code" label="Code"></v-text-field>
        <v-btn @click="generate">Generate</v-btn>
        <v-text-field v-model="amount" label="Amount"></v-text-field>
        <v-btn @click="create">Create</v-btn>
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
      amount: ''
    }),
    methods: {
      generate: function () {
        this.code = 'WCODE-' + utils.randomValueHex(16)
      },
      create: async function () {
        try {
          const kp = utils.keyPair(this.code)
          await api.create({ pk: kp.publicKey, amount: this.amount })
        } catch (e) {
          this.$emit('set-status', { display: true, text: e.message })
        }
      }
    },
  }
</script>
