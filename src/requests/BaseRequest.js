import {API_VERSION} from "../utils/constant";

export default class BaseRequest {
  version = API_VERSION;

  async get(url, params = {}, showNotification = true) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, { params });
      return this._responseHandler(response, showNotification);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async getWithTimeout(url, params = {}, timeout, showNotification = true) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, { params, timeout });
      return this._responseHandler(response, showNotification);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async put (url, data = {}, showNotification = true) {
    try {
      const response = await window.axios.put(`${this.version}/${url}`, data);
      return this._responseHandler(response, showNotification);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async post(url, data = {}, showNotification = true) {
    try {
      const response = await window.axios.post(`${this.version}/${url}`, data);
      return this._responseHandler(response, showNotification);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async del(url, params = {}, showNotification = true) {
    try {
      const response = await window.axios.delete(`${this.version}/${url}`, params);
      return this._responseHandler(response, showNotification);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async _responseHandler (response, showNotification) {
    const {data, status} = response;

    if (status >= 400) {
      if (!showNotification) {
        throw new Error('Request failed');
      }


      // const message = window.$t(data.error.message);
      // let errorsNode;
      //
      // if (typeof(data.error.message) === 'string') {
      //   errorsNode = <div style={{ fontWeight: 'bold', color: 'red' }}>
      //     {utils.upperCaseFirst(window.$t(_.get(str, message) || message))}
      //   </div>
      // } else {
      //   errorsNode = _.map(data.error.message, (message, field) => {
      //     if(field === 'address'){field = ''}
      //     const amount = _.split(message,' ')[_.split(message,' ').length - 1];
      //     const amountLength = amount.length;
      //     if (amount == parseFloat(amount)) message  = message.substring(0,message.length - amountLength);
      //     return (
      //       <>
      //         {/* {data.error.message.quantity==="must be greater than 0"?<div style={{ fontWeight: 'bold', color: 'red' }} id={field}>
      //           {utils.upperCaseFirst(window.$t('error.must_be_greater_than', {value: "0"}))}
      //         </div>:<div style={{ fontWeight: 'bold', color: 'red' }} id={field}>
      //           {utils.upperCaseFirst(window.$t(message, { field: window.$t(field) }))}
      //         </div>} */}
      //         <div style={{ fontWeight: 'bold', color: 'red' }} id={message}>
      //           {utils.upperCaseFirst(window.$t(field))} {window.$t(_.get(obj, message) || message)} {amount == parseFloat(amount) ? amount : ''}
      //         </div>
      //       </>
      //     )
      //   })
      // }
      //
      // console.log(data.error.message, ': data.error.message src/requests/BaseRequest.js:82');
      //
      // utils.showNotificationfication(<span style={{ color: 'red', fontWeight: 'bold' }}>{window.$t('Error')}</span>, errorsNode, constant.TYPE_ERROR);

      // if (errorCode === 405) {
      //   window.h.push("/login");
      //   window.dispatch({
      //     type: LOGOUT
      //   });
      //   localStorage.removeItem(constant.TOKEN);
      // }

      throw new Error('Request failed');
    }

    return data;
  }

  _errorHandler(err) {
    console.log(err)
    if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
      window.location.href = '/';
    }
    throw err;
  }
}
