import axios from 'axios';
import qs from 'qs';
import BigNumber from 'bignumber.js';
import utils from './utils';

window.axios = axios.create({
  baseURL: utils.getBaseURL(),
  paramsSerializer(params) {
    return qs.stringify(params);
  },
});

window.axiosProfile = axios.create({
  baseURL: 'https://api.trustkeys.network',
  paramsSerializer(params) {
    return qs.stringify(params);
  },
});

BigNumber.config({
  FORMAT: {
    // string to prepend
    prefix: '',
    // decimal separator
    decimalSeparator: '.',
    // grouping separator of the integer part
    groupSeparator: ',',
    // primary grouping size of the integer part
    groupSize: 3,
    // secondary grouping size of the integer part
    secondaryGroupSize: 0,
    // grouping separator of the fraction part
    fractionGroupSeparator: ' ',
    // grouping size of the fraction part
    fractionGroupSize: 0,
    // string to append
    suffix: '',
  },
});

// BigNumber.prototype.toFixedAndTrim = function (dp = 8, roundingMode = BigNumber.ROUND_DOWN) {
//   return utils.trimRightZeroAndDot(this.toFixed(dp, roundingMode));
// };
//
// yup.addMethod(yup.number, 'isValidBalance', (number, total, currentBalance) => number.test({
//   name: 'is-valid-balance',
//   message: 'Số dư không đủ để thực hiện giao dịch',
//   test: () => new BigNumber(currentBalance).isGreaterThanOrEqualTo(total),
// }));
//
// window._ = _;
// window.c = consts.default;
// // yup.addMethod(yup.number, 'greater')
// // --end boot
