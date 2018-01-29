import React from 'react';
import queryString from 'query-string';
import _ from 'lodash';
import {Config} from 'saytools';

export const Request = {
  get: (url, params) => {
    if (params)
      url += "?" + queryString.stringify(params);
    return fetch(url)
      .then(response => response.json())
      .catch(err => console.error("get请求错误", err))
  },
  post: (url, body) => {
    let options = _.extend(Config.header, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }, {
      body: JSON.stringify(body)
    });
    return fetch(url, options).then(response => response.json())
      .catch(err => console.error("post请求错误", err))
  },
  put: (url, body) => {
    let options = _.extend(Config.header, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
    return fetch(url, options)
      .then(response => response.json())
      .catch(error => console.error("put请求错误", error))
  },
  delete: (url) => {
    return fetch(url, {method: "delete"})
      .then(response => response.json())
      .catch(error => console.error("delete请求错误", error))
  }
};


