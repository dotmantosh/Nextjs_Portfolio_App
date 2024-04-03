const config = {
  headers: {
    Authorization: `Bearer`
  }
}
export const getAuthorization = (token: string) => {
  config.headers.Authorization = `Bearer ${token}`
  return config
}