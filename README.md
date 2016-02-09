# Starter project for an ES6 RESTFul Koa2 API with Mongoose and OAuth2

currently in development...

## OAuth2 Provider

You need to create a `config.js` file in `server/auth` and add your oAuth2 provider credentials, like:

```js
'use strict';

export const facebook = {
  clientId: YOUR_CLIENT_ID,
  clientSecret: YOUR_CLIENT_SECRET,
  callbackUrl: 'http://localhost:3000/api/auth/facebook/callback',
};
```
