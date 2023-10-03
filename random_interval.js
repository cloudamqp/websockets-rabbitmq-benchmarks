function randomInterval() {
  const min = 50000
  const max = 60000
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default randomInterval
