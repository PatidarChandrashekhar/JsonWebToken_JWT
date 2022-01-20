# Node.js jsonwebtoken Example

> An example of how to protect routes and get a token

## Quick Start

``` bash
# Install jsonwebtoken
$ npm install jsonwebtoken

# Install dependencies
npm install

# Serve on localhost:3000
npm start
```


## Usage
``` bash
# 1. jwt.sign(payload, secretOrPrivateKey, [options, callback])
(Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.

(Synchronous) Returns the JsonWebToken as string

payload could be an object literal, buffer or string representing valid JSON.


# 2. jwt.verify(token, secretOrPublicKey, [options, callback])
(Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.

(Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.

token is the JsonWebToken string

secretOrPublicKey is a string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA. If jwt.verify is called asynchronous, secretOrPublicKey can be a function that should fetch the secret or public key

# 3. jwt.decode(token [, options])
(Synchronous) Returns the decoded payload without verifying if the signature is valid.
```

## Errors & Codes
Possible thrown errors during verification. Error is the first argument of the verification callback.

``` bash
# TokenExpiredError
Thrown error if the token is expired.

Error object:

name: 'TokenExpiredError'
message: 'jwt expired'
expiredAt: [ExpDate]
jwt.verify(token, 'shhhhh', function(err, decoded) {
  if (err) {
    /*
      err = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
        expiredAt: 1408621000
      }
    */
  }
});
```

``` bash
# JsonWebTokenError
Error object:

name: 'JsonWebTokenError'
message:
'jwt malformed'
'jwt signature is required'
'invalid signature'
'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
'jwt issuer invalid. expected: [OPTIONS ISSUER]'
'jwt id invalid. expected: [OPTIONS JWT ID]'
'jwt subject invalid. expected: [OPTIONS SUBJECT]'
jwt.verify(token, 'shhhhh', function(err, decoded) {
  if (err) {
    /*
      err = {
        name: 'JsonWebTokenError',
        message: 'jwt malformed'
      }
    */
  }
});
```

``` bash
# NotBeforeError
Thrown if current time is before the nbf claim.

Error object:

name: 'NotBeforeError'
message: 'jwt not active'
date: 2018-10-04T16:10:44.000Z
jwt.verify(token, 'shhhhh', function(err, decoded) {
  if (err) {
    /*
      err = {
        name: 'NotBeforeError',
        message: 'jwt not active',
        date: 2018-10-04T16:10:44.000Z
      }
    */
  }
});
```