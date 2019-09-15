<template>
  <v-card>
    <v-card-title>
      <span class="title">Withdraw</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="code" label="Code"></v-text-field>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="withdraw">Withdraw</v-btn>
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
      code: ''
    }),
    methods: {
      withdraw: async function () {
        try {
          await api.checkKeeper()
          const kp = utils.keyPair(this.code)
          const publicState = await window.WavesKeeper.publicState()
          const amount = await api.getCodeAmount(kp.publicKey)
          await api.checkCodeUsed(kp.publicKey)
          const sig = utils.signBytes({ privateKey:  kp.privateKey }, publicState.account.publicKey)
          await api.withdraw({ pk: kp.publicKey, sig })
          this.$emit('set-status', { display: true, text: `${amount / 10 ** 8} WAVES were withdrawn` })
        } catch (e) {
          this.$emit('set-status', { display: true, text: e.message })
        }
      }
    },
  }
</script>
