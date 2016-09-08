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

crkey.crypto( target, password, mode);
crkey.decrypto( target, password, mode, ChangeFile);

```