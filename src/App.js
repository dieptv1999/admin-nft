import "./index.scss";
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import {BaseOptionChartStyle} from './components/chart/BaseOptionChart';
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import actions from "./redux/actions/user"
import {useEffect} from "react";
import {isEmpty, map} from "lodash";

export default function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    if (!isEmpty(user)) dispatch(actions.getPermission({ids: map(user?.roles, r => r.id)}))
  }, [user])

  return (
    <ThemeProvider>
      <ScrollToTop/>
      <BaseOptionChartStyle/>
      <Router/>
      <ToastContainer/>
    </ThemeProvider>
  );
}
