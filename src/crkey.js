#! /usr/bin/env node

'use strict';

const fs = require('fs');
const ERRTEXT = ' [ Crkey ] Crypto support is disabled!';
const EXISTERR = ' [ Crkey ] Target not exist!';
const DECRERR = ' [ Crkey ] Decrypto Failed!';
var log = console.log;

var crypto;
try {
  crypto = require('crypto');
} catch (err) {
  log(ERRTEXT);
}

class Crkey {
  static crypto(target, password, mode) {
    fs.exists(target, (exists) => {

      if (exists) {

        fs.readFile(target, function(e, data) {

          if (e) throw err;
          var encry = '';
          var cipher = crypto.createCipher(mode, password);

          encry += cipher.update(data, 'binary', 'binary');
          encry += cipher.final('binary');

          fs.writeFile(target, encry, 'binary', function(err) {
            if (err) throw err;
            log(encry);
          });

        });
      } else {

        log(EXISTERR);

      }

    });
  }

  static decrypto(target, password, mode, toFile) {

    fs.exists(target, (exists) => {

      if (exists) {

        fs.readFile(target, 'binary', function(e, data) {

          if (e) throw err;
          var decry = '';
          var decipher = crypto.createDecipher(mode, password);
          decry += decipher.update(data, 'binary', 'binary');

          try {
            decry += decipher.final('binary');
          } catch (e) {
            log(DECRERR);
            return;
          }

          if (toFile) {

            fs.writeFile(target, decry.toString('utf-8'), function(err) {

              if (err) throw err;
              log(decry.toString('utf-8'));

            });
          } else {
            log(decry.toString('utf-8'));
          }

        });
      } else {

        log(EXISTERR);

      }
    });
  }
}

module.exports = Crkey;
