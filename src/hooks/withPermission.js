import {useSelector} from "react-redux";
import _ from "lodash";
import PageNotPermission from "../pages/NotPermission";

function withPermission(permissionsOfUser, children, type = 'component') {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {permissions} = useSelector(state => state.user);

  function checkPermission() {
    let check = false;
    _.forEach(permissionsOfUser, (permission) => {
      if (_.find(permissions, p => p.action === permission)) {
        check = true;
      }
    })

    return check
  }

  if (permissions && checkPermission()) {
    return children
  }
  return type == 'page' ?
    <PageNotPermission/>
    : <div/>
}

export default withPermission;
