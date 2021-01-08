import { normalize, Schema } from 'normalizr'
import { camelizeKeys } from 'humps'
require('isomorphic-fetch');
// import Cookies from 'js-cookie'

// TODO FIX THIS SHIT OF CODE
const API_ROOT = process.env.REACT_APP_API_URL || ''

const URI = process.env.REACT_APP_URI || ''

interface IConfig {
  method?: string,
  payload?: any,
  schema?: Schema,
  headers?: {},
}

/**
 * Fetch data
 *
 * @param {string} url
 * @param {Object} options
 * @param {string} [options.method] - Request method ( GET, POST, PUT, ... ).
 * @param {string} [options.payload] - Request body.
 * @param {Object} [options.headers]
 * @param {Object} [options.schema]
 *
 * @returns {Promise}
 */
export const request = (url = '', options= {}) => {
  const config: IConfig = {
    method: 'GET',
    headers: {},
    ...options,
  };
  const errors = [];

  if (!url) {
    errors.push('url');
  }

  if (!config.payload && (config.method !== 'GET' && config.method !== 'DELETE')) {
    console.log('ERROR PAYLOAD')
    errors.push('payload');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...config.headers,
  };

  let params = config.method !== 'GET' ? {
    headers,
    method: config.method,
    body: JSON.stringify(config.payload)
  } : {
    headers,
    method: config.method,
  };

  const fullUrl = (url.indexOf(API_ROOT) === -1) ? API_ROOT + url : url

  return fetch(`${URI}${fullUrl}`, params).then(async response => {
    const contentType = response.headers.get('content-type');

    if (response.status > 299) {
      const error = {
        status: 400,
        response: '',
      }
      error.status = response.status;

      if (contentType && contentType.includes('application/json')) {
        error.response = await response.json();
      } else {
        error.response = await response.text();
      }

      throw error;
    } else {
      if (contentType && contentType.includes('application/json')) {
        return response.json().then(jsonBody => {
          const camelizedJson = camelizeKeys(jsonBody)
          if (config.schema) {
            return Object.assign({}, normalize(camelizedJson, config.schema))
          }

          return camelizedJson
        })
      }

      return response.text();
    }
  });
}
