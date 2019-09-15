import axios from 'axios';
import config from '../config';

export default {
  checkKeeper: async () => {
    if (!window.WavesKeeper) throw new Error('Install WavesKeeper')
    const publicState = await window.WavesKeeper.publicState()
    if (publicState.account.networkCode !== config.network) throw new Error('Change network to MAINNET')
  },
  getCodeAmount: async (pk) => {
    try {
      const response = await axios.get(`${config.apiBase}/addresses/data/${config.dApp}/${pk}_amount`);
      if (response && response.data) {
        return response.data.value;
      }
    } catch (e) {
      throw new Error(`The code doesn't exist`);
    }
  },
  checkCodeUsed: async (pk) => {
    try {
      const response = await axios.get(`${config.apiBase}/addresses/data/${config.dApp}/${pk}_used`);
      if (response && response.data && response.data.value) throw new Error(`The code have already been used`);
    } catch (e) {
      throw new Error(`The code doesn't exist`);
    }
  },
  create: async ({ pk, amount }) => {
    const tx = {
      type: 16,
      data: {
        dApp: config.dApp,
        call: {
          function: 'create',
          args: [
            { value: pk, type: 'string' },
          ],
        },
        fee: {
          assetId: 'WAVES',
          tokens: '0.005',
        },
        payment: [{
          tokens: amount,
          assetId: null,
        }],
      },
    }
    return await window.WavesKeeper.signAndPublishTransaction(tx)
  },
  withdraw: async ({ pk, sig }) => {
    const tx = {
      type: 16,
      data: {
        dApp: config.dApp,
        call: {
          function: 'withdraw',
          args: [
            { value: pk, type: 'string' },
            { value: sig, type: 'string' },
          ],
        },
        fee: {
          assetId: 'WAVES',
          tokens: '0.005',
        },
        payment: [],
      },
    }
    return await window.WavesKeeper.signAndPublishTransaction(tx)
  },
}
