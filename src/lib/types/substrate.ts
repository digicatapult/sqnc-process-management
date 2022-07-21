import { ApiPromise, Keyring } from '@polkadot/api'

export type Polkadot = {
  api: ApiPromise
  keyring: Keyring
}
