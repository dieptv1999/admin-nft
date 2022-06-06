import {BASE_URL, BASE_URL_PROD, BASE_URL_STAGGING} from "./constant";

const getBaseURL = () => {
    switch (process.env.REACT_APP_STAGE) {
        case 'stagging':
            return BASE_URL_STAGGING;
        case 'prod':
            return BASE_URL_PROD;
        default:
            return BASE_URL;
    }
};

const logout = () => {
    window.localStorage.clear()
    window.location.replace('/login')
}

export default {
    getBaseURL,
    logout,
}
