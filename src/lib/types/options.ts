export type Options = {
  API_HOST: string
  API_PORT: number
  USER_URI: string
}

export const defaultOptions: Options = {
  API_HOST: 'localhost',
  API_PORT: 9944,
  USER_URI: '//Alice',
}
