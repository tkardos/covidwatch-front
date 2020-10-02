const back = () => {
  if (process.env.REACT_APP_VERSION == 'production') {
  return 'https://covidwatch-back.herokuapp.com'
  }
  else {
  return 'http://localhost:8080'
  }
  }
  
  const front = () => {
  if (process.env.REACT_APP_VERSION == 'production') {
  return 'https://covidwatch-front.herokuapp.com'
  }
  else {
  return 'http://localhost:3000'
  }
  }
  
  export default {
  back: back(),
  front: front(),
  }