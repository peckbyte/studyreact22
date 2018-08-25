import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}$`
  }, '')
  return `${baseUrl}/${url}?${str.substr(0, str.length - 1)}`
}
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then(resp => {
        const data = resp.data
        if (data && data.success === true) {
          resolve(data)
    } else {
          reject(data)
        }
      }).catch((err) => {
        if(err.response) {
          reject(err.response.data)
        } else {
          reject({
            success: false,
            err_msg: err.message,
          })

        }
    })
  })
}
