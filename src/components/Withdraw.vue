<template>
  <v-card>
    <v-card-title>
      <span class="title">Withdraw</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="code" label="Code"></v-text-field>
        <v-btn @click="withdraw">Withdraw</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import utils from '../utils'
  import api from '../api'

  export default {
    data: () => ({
      code: ''
    }),
    methods: {
      withdraw: async function () {
        try {
          const kp = utils.keyPair(this.code)
          const pk = kp.publicKey
          const publicState = await window.WavesKeeper.publicState()
          const amount = await api.getCodeAmount(pk)
          if (amount == null) {
            this.$emit('set-status', { display: true, text: `The code doesn't exist` })
            return;
          }
          const sig = utils.signBytes({ privateKey:  kp.privateKey }, publicState.account.publicKey)
          await api.withdraw({ pk, sig })
          this.$emit('set-status', { display: true, text: `${amount / 10 ** 8} WAVES` })
        } catch (e) {
          this.$emit('set-status', { display: true, text: e.data })
        }
      }
    },
  }
</script>
