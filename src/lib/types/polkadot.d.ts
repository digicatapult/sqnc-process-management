declare namespace Polkadot {
  export type Options = {
    API_HOST: string
    API_PORT: number
    USER_URI: string
  }

  export type Polkadot = {
    api: import('@polkadot/api').ApiPromise
    keyring: import('@polkadot/api').Keyring
  }
}
