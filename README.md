# balance-api-skanetrafiken

balance.io api client for Skånetrafiken's Jojo Reskassa. Works in node and in the browser (using browserify).

[![Build Status](https://travis-ci.org/krawaller/balance-api-skanetrafiken.svg?branch=master)](https://travis-ci.org/krawaller/balance-api-skanetrafiken)

## Installation

via npm:

```bash
$ npm install balance-api-skanetrafiken --save
```

## API

```js
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
require('balance-api-skanetrafiken')({
  cardNumber: 12345678987,
  cvc: 'ABC1'
}, function (error, accounts) {
  /**
   * @callback Skanetrafiken~callback
   * @param {Error|Null} error - An error that you can throw, or null.
   * @param {Object[]} [accounts] - An array of account objects.
   * @param {String} accounts[].name - The name of the account.
   * @param {Number} accounts[].amount - The amount on the account.
   */
  if (error) throw error;
  console.log('accounts', accounts);
});
```

## License

MIT

