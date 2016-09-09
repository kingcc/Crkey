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
  static crypto(target, password, mode, func) {
    fs.exists(target, (exists) => {

      if (exists) {

        fs.readFile(target, 'utf-8',function(e, data) {

          if (e) throw err;
          var encry = '';
          var cipher = crypto.createCipher(mode, password);

          encry += cipher.update(data, 'utf-8', 'binary');
          encry += cipher.final('binary');

          fs.writeFile(target, encry, 'utf-8', function(err) {
            if (err) throw err;
            func(encry);
          });

        });
      } else {

        log(EXISTERR);

      }

    });
  }

  static decrypto(target, password, mode, toFile ,func) {

    fs.exists(target, (exists) => {

      if (exists) {

        fs.readFile(target, 'utf-8', function(e, data) {

          if (e) throw err;
          var decry = '';
          var decipher = crypto.createDecipher(mode, password);
          decry += decipher.update(data, 'binary', 'utf-8');

          try {
            decry += decipher.final('utf-8');
          } catch (e) {
            log(DECRERR);
            return;
          }

          if (toFile) {

            fs.writeFile(target, decry, 'utf-8', function(err) {

              if (err) throw err;
              func(decry);

            });
          } else {

            func(decry);
            return decry;
          }

        });
      } else {

        log(EXISTERR);

      }
    });
  }
}

module.exports = Crkey;
