import queryString from 'query-string';
import _ from 'lodash';
import {ConstURL} from 'ggdomain/def';

export let Request = {
  get: (url, params) => {
    if (params) {
      url += "?" + queryString.stringify(params);
    }
    return fetch(url)
      .then(response => response.json())
      .catch(err => console.log(err))
  },
  post: (url, body) => {
    let options = _.extend(ConstURL.header, {
      body: JSON.stringify(body)
    });
    return fetch(url, options)
      .then(response => response.json())
  }
};




