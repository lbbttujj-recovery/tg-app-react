export const useBackUrl = () => {
  return process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL_DEV
}
