import { keyPair, signBytes, randomBytes, base58Encode } from '@waves/ts-lib-crypto'
import { waitForTx } from '@waves/waves-transactions'


export default {
	randomValue: (len) => {
		return base58Encode(randomBytes(len))
	},
	keyPair,
	signBytes,
	waitForTx
}