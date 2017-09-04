import fetch from 'isomorphic-fetch';

const BaseUrl = 'https://api.twitter.com';
const OAuth = ['oauth2', 'token'];
const V1_1 = ['1.1'];
const Search = V1_1.concat(['search', 'tweets.json']);
const Tweet = V1_1.concat(['statuses', 'show.json']);

const toBase64 = b => new Buffer(b || '').toString('base64');

export default class Twitter {
  constructor({ consumerKey, consumerSecret, bearerToken } = {}) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.bearerToken = bearerToken;
    this.authPromise = undefined;
  }

  _buildUrl(...params) {
    return [BaseUrl].concat(params).join('/');
  }

  _buildUrlWithQuery(query, ...params) {
    const q = Object.keys(query)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
      .join('&');
    return `${this._buildUrl(...params)}?${q}`;
  }

  _buildBasicAuth() {
    const consumerKeyRFC = encodeURIComponent(this.consumerKey);
    const consumerSecretRFC = encodeURIComponent(this.consumerSecret);
    const credentials = `${consumerKeyRFC}:${consumerSecretRFC}`;
    return `Basic ${toBase64(credentials)}`;
  }

  _authFetch(url, options = {}) {
    if (!this.bearerToken) {
      return Promise.reject({
        errors: [{ message: 'Twitter authentication error' }],
      });
    }

    return fetch(url, {
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${this.bearerToken}`,
        Accept: 'application/json',
      },
      ...options,
    }).then(r => {
      if (r.status === 200) return r.json();

      return r.json().then(json => Promise.reject(json));
    });
  }

  auth() {
    if (this.authPromise) return this.authPromise;
    return (this.authPromise = fetch(this._buildUrl(...OAuth), {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: this._buildBasicAuth(),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(r => {
        if (r.status === 200) return r.json();

        return r.json().then(json => Promise.reject(json));
      })
      .then(json => {
        this.bearerToken = json['access_token'];
        this.authPromise = undefined;
        return this;
      })
      .catch(err => {
        this.authPromise = undefined;
        return Promise.reject(err);
      }));
  }

  search(query) {
    return this._authFetch(
      this._buildUrlWithQuery(
        {
          q: query,
        },
        ...Search
      )
    );
  }

  getTweet(id) {
    return this._authFetch(
      this._buildUrlWithQuery(
        {
          id,
        },
        ...Tweet
      )
    );
  }
}
