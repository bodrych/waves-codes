<template>
  <v-card >
    <v-card-title>
      <span class="title">Withdraw</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="code" label="Code"></v-text-field>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" :loading="loading.check" outlined v-on="on" @click="check">
              Check
              <template v-slot:loader>Wait...</template>
            </v-btn>
          </template>
          <span>Check specified code</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" :loading="loading.withdraw" outlined class="ml-5" v-on="on" @click="withdraw">
              Withdraw
              <template v-slot:loader>Wait...</template>
            </v-btn>
          </template>
          <span>Withdraw funds assigned to the specified code</span>
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
      loading: {
        withdraw: false,
        check: false
      }
    }),
    methods: {
      withdraw: async function () {
        try {
          this.loading.withdraw = true
          await api.checkKeeper()
          const kp = utils.keyPair(this.code)
          const publicState = await window.WavesKeeper.publicState()
          const amount = await api.getCodeAmount(kp.publicKey)
          await api.checkCodeUsed(kp.publicKey)
          const sig = utils.signBytes({ privateKey:  kp.privateKey }, publicState.account.publicKey)
          const response = await api.withdraw({ pk: kp.publicKey, sig })
          await api.waitForTxId(JSON.parse(response).id)
          this.loading.withdraw = false
          this.$emit('set-status', { display: true, text: `${amount / 10 ** 8} WAVES were withdrawn` })
        } catch (e) {
          this.loading.withdraw = false
          this.$emit('set-status', { display: true, text: e.message })
        }
      },
      check: async function () {
        try {
          this.loading.check = true
          const kp = utils.keyPair(this.code)
          const amount = await api.getCodeAmount(kp.publicKey)
          await api.checkCodeUsed(kp.publicKey)
          this.loading.check = false
          this.$emit('set-status', { display: true, text: `${amount / 10 ** 8} WAVES code` })
        } catch (e) {
          this.loading.check = false
          this.$emit('set-status', { display: true, text: e.message })
        }
      },
    },
  }
</script>
