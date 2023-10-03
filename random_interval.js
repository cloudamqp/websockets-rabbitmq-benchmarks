function randomInterval() {
  const min = 20000
  const max = 30000
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default randomInterval
