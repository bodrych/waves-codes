import crypto from 'crypto'
import { keyPair, signBytes } from '@waves/ts-lib-crypto'
import { waitForTx } from '@waves/waves-transactions'


export default {
	randomValueHex: (len) => {
		return crypto
		.randomBytes(Math.ceil(len / 2))
		.toString('hex')
		.slice(0, len)
	},
	keyPair,
	signBytes,
	waitForTx
}