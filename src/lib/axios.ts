import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.spacexdata.com/v4',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
