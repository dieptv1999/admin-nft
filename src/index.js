import 'simplebar/src/simplebar.css';
import './bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import './i18n';

window.global = window;
// eslint-disable-next-line global-require
window.Buffer = window.Buffer || require('buffer').Buffer;

// ----------------------------------------------------------------------

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </HelmetProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
