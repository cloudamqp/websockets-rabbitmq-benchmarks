function randomInterval() {
  const min = 1000
  const max = 5000
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default randomInterval
