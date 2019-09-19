<template>
  <v-card>
    <v-card-title>
      <span class="title">Create</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="code" label="Code" required></v-text-field>
        <v-text-field v-model="amount" label="Amount" suffix="WAVES"></v-text-field>
        <!-- <v-text-field v-model="address" label="Address"></v-text-field> -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" outlined v-on="on" @click="generate">Generate</v-btn>
          </template>
          <span>Generate new random code phrase</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" :loading="loading" outlined class="ml-5" v-on="on" @click="create">Create
              <template v-slot:loader>Wait...</template>
            </v-btn>
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
  import { mapMutations } from 'vuex'

  export default {
    data: () => ({
      code: '',
      amount: '1',
      nominal: false,
      address: '',
      loading: false
    }),
    mounted: function () {
      this.generate()
    },
    methods: {
      ...mapMutations(['addCode']),
      generate: function () {
        this.code = 'W-' + utils.randomValue(16)
      },
      create: async function () {
        try {
          const code = this.code
          const amount = this.amount
          this.loading = true
          await api.checkKeeper()
          const kp = utils.keyPair(code)
          const pk = kp.publicKey
          const response = await api.create({ pk, amount })
          await api.waitForTxId(JSON.parse(response).id)
          this.addCode({ code, amount })
          this.loading = false
        } catch (e) {
          this.loading = false
          this.$emit('set-status', { display: true, text: e.message })
        }
      },
    },
  }
</script>
