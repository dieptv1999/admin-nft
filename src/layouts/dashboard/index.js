import {useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import constant from "../../utils/constant";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({theme}) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    return (
        <RequireAuth>
            <RootStyle>
                <DashboardNavbar onOpenSidebar={() => setOpen(true)}/>
                <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>
                <MainStyle>
                    <Outlet/>
                </MainStyle>
            </RootStyle>
        </RequireAuth>
    );
}

function RequireAuth({children}) {
    const user = window.localStorage.getItem(constant.USER)
    const token = window.localStorage.getItem(constant.TOKEN);
    if (!token || !user) {
        return <Navigate to="/login" replace/>;
    }

    return children;
}
