export const token = Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`, 'utf8').toString(
  'base64'
)