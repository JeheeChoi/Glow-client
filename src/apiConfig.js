let apiUrl
const apiUrls = {
  // production: 'https://glow-on-you.herokuapp.com',
  // development: 'http://localhost:8000'
  // Working locally, use below:
  production: 'https://aqueous-atoll-85096.herokuapp.com',
  development: 'http://localhost:8000'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
