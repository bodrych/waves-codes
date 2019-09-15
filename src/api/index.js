import axios from 'axios';
import config from '../config';

export default {
  getCodeAmount: async (pk) => {
    try {
      const response = await axios.get(`${config.apiBase}/addresses/data/${config.dApp}/${pk}_amount`);
      if (response && response.data) {
        return response.data.value;
      }
      return null;
    } catch (e) {
      return null;
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
