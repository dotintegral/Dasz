
function onRequest(config) {
  return Promise.resolve({
    message: config.message
  })
}

module.exports = {
  onRequest
}
