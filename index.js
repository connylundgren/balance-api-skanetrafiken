var request = require('request')
var cheerio = require('cheerio')

var accounting = require('accounting')
accounting.settings.number.decimal = ','

var API_URL = 'https://www.shop.skanetrafiken.se/kollasaldo.html'

/**
 * A simple api client for Skånetrafiken's Jojo Reskassa.
 *
 * @param {Object} options - The options object containing the credentials used
 *     when authenticating against Skåntetrafiken.
 * @param {String|Number} options.cardNumber - The card number used when
 *     authenticating.
 * @param {String} options.cvc - The card CVC code used when authenticating.
 * @param {Skanetrafiken~callback} callback - The callback function.
 */
module.exports = function Skanetrafiken(options, callback) {
  /**
   * @callback Skanetrafiken~callback
   * @param {Error|Null} error - An error that you can throw, or null.
   * @param {Object[]} [accounts] - An array of account objects.
   * @param {String} accounts[].name - The name of the account.
   * @param {Number} accounts[].amount - The amount on the account.
   */
  if (!options || !options.cardNumber || !options.cvc) {
    return callback(new Error('Bad credentials. Must pass `cardNumber` and `cvc` in `options` object.'))
  }
  request({
    url: API_URL,
    method: 'POST',
    form: {
      cardno: options.cardNumber,
      backno: options.cvc,
      ST_CHECK_SALDO: 'SE+SALDO+%26+B%EF%BF%BDST+F%EF%BF%BDRE'
    },
    encoding: null
  }, function (error, response, body) {
    if (error) return callback(error)
    if (response.statusCode != 200) return callback(new Error('Service replied with status: ' + response.statusCode))

    if (typeof body !== 'string') {
      body = require('iconv-lite').decode(body, 'iso-8859-1')
    }
    $ = cheerio.load(body)

    var accounts = []
    $('.saldo_ok_wrapper > table > tbody tr').each(function () {
      var name = $(this).find('.first').text().trim().replace(/:$/, '')

      if (name) {
        var rawAmount = $(this).find('.right').text().replace(/\s+/g, ' ').trim()
        if (name.startsWith('Periodkort')) {
          var amount = rawAmount
        } else {
          var amount = accounting.parse(rawAmount)
        }
        accounts.push({
          name: name,
          amount: amount
        })
      }
    })

    callback(null, accounts)
  })
}

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};