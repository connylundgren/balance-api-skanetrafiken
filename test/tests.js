var chai = require('chai')
var should = chai.should()

var api = require('../index')
var credentials = require('./credentials.json')

describe('Skånetrafiken', function() {
  it('should fetch accounts', function(done) {
    api(credentials, function (error, accounts) {
      accounts.length.should.be.above(0)
      accounts[0].name.should.be.a('string')
      accounts[0].name.length.should.be.above(0)
      accounts[0].amount.should.be.a('number')
      accounts[0].amount.should.be.above(0)
      done()
    })
  })

  it('should return error when missing credentials', function(done) {
    api(null, function (error, accounts) {
      error.should.be.instanceof(Error)
      done()
    })
  })
})
