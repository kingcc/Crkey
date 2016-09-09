# Crkey
A simple crypto tool for nodeJs.
Need OpenSSL-Crypto support.

###Install
```
npm install crkey -g
```

###Usage
```js
const crkey = require('crkey');

// To crypto a file.
crkey.crypto(targetFile, 
				password, 
				cryptoMode, 
				callBack(res));

// To decrypto a file.
crkey.decrypto(targetFile, 
				password, 
				cryptoMode, 
				ifToFile ,
				callBack(res));

```