export const api_config = {
  BASE_URL : process.env.NEXT_PUBLIC_BASE_URL,
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION,
  USERNAME : process.env.NEXT_PUBLIC_USERNAME,
  PASSWORD : process.env.NEXT_PUBLIC_PASSWORD,
}
const base64_auth = Buffer.from(
  `${api_config.USERNAME}:${api_config.PASSWORD}`,
  'utf8'
).toString('base64')

export const header_auth_server = {
  Authorization : `Basic ${base64_auth}`
}
export const headers_auth_client = {
  Authorization: `Basic ${btoa(
    `${api_config.USERNAME}:${api_config.PASSWORD}`
  )}`,
}