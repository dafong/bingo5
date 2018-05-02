// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"
    }
  }
}
