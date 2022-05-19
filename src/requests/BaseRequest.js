import React from "react";
import _ from 'lodash';
import constant  from "../utils/constant";
import utils from "../utils";

const str = {
  "Blockchain address invalid": "BLOCK_CHAIN_ADDRESS_NOT_EXIST_ERROR",
  "Blockchain address not exist": "BLOCK_CHAIN_ADDRESS_NOT_EXIST_ERROR",
  "Transfer is blocked": 'TRANSFER_IS_BLOCKED',
  "Bad Request!": 'BAD_REQUEST',
  "Price to high" : 'PRICE_TO_HIGH',
  "Price to low": "PRICE_TO_LOW",
  "balance insufficient" : 'BALANCE_INSUFFICIENT_ERROR',
  "Trading is blocked" : 'TRADING_IS_BLOCKED',
  "Your account is lock dual to investigation process": 'your-account-is-lock',
}

const obj = {
  'must be greater than or equal ': "MUST_BE_GREATER_THAN_OR_EQUAL",
  'must be greater than ' : 'must be greater than '
}


export default class BaseRequest {
  version = "v1/cryptotrading";

  async get(url, params = {}, showNoti = true) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, { params });
      return this._responseHandler(response, showNoti);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async getWithTimeout(url, params = {}, timeout, showNoti = true) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, { params, timeout });
      return this._responseHandler(response, showNoti);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async put (url, data = {}, showNoti = true) {
    try {
      const response = await window.axios.put(`${this.version}/${url}`, data);
      return this._responseHandler(response, showNoti);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async post(url, data = {}, showNoti = true) {
    try {
      const response = await window.axios.post(`${this.version}/${url}`, data);
      return this._responseHandler(response, showNoti);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async del(url, params = {}, showNoti = true) {
    try {
      const response = await window.axios.delete(`${this.version}/${url}`, params);
      return this._responseHandler(response, showNoti);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async _responseHandler (response, showNoti) {
    const {data} = response;
    const errorCode = window._.get(data, 'error.code', 200);

    if (errorCode >= 400) {
      if (!showNoti) {
        throw new Error('Request failed');
      }


      const message = window.$t(data.error.message);
      let errorsNode;

      if (typeof(data.error.message) === 'string') {
        errorsNode = <div style={{ fontWeight: 'bold', color: 'red' }}>
          {utils.upperCaseFirst(window.$t(_.get(str, message) || message))}
        </div>
      } else {
        errorsNode = _.map(data.error.message, (message, field) => {
          if(field === 'address'){field = ''}
          const amount = _.split(message,' ')[_.split(message,' ').length - 1];
          const amountLength = amount.length;
          if (amount == parseFloat(amount)) message  = message.substring(0,message.length - amountLength);
          return (
            <>
              {/* {data.error.message.quantity==="must be greater than 0"?<div style={{ fontWeight: 'bold', color: 'red' }} id={field}>
                {utils.upperCaseFirst(window.$t('error.must_be_greater_than', {value: "0"}))}
              </div>:<div style={{ fontWeight: 'bold', color: 'red' }} id={field}>
                {utils.upperCaseFirst(window.$t(message, { field: window.$t(field) }))}
              </div>} */}
              <div style={{ fontWeight: 'bold', color: 'red' }} id={message}>
                {utils.upperCaseFirst(window.$t(field))} {window.$t(_.get(obj, message) || message)} {amount == parseFloat(amount) ? amount : ''}
              </div>
            </>
          )
        })
      }

      console.log(data.error.message, ': data.error.message src/requests/BaseRequest.js:82');

      utils.showNotification(<span style={{ color: 'red', fontWeight: 'bold' }}>{window.$t('Error')}</span>, errorsNode, constant.TYPE_ERROR);

      // if (errorCode === 405) {
      //   window.h.push("/login");
      //   window.dispatch({
      //     type: LOGOUT
      //   });
      //   localStorage.removeItem(constant.SESSION);
      // }

      throw new Error('Request failed');
    }

    return data;
  }

  _errorHandler(err) {
    if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
      window.location.href = '/';
    }
    throw err;
  }
}
