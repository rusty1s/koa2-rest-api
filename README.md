# ES6 RESTFul Express API with Mongoose and OAuth2

## IN DEVELOPMENT!

## Add facebook credentials

Create the file `server/oauth2.secrets.js` and put your [facebook](https://developers.facebook.com) credentials in there:

```js
'use strict';

export const facebook = {
  id: '',
  secret: '',
  callbackURL: 'http://localhost:3000/api/login/facebook/callback',
};
```
