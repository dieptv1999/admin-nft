import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import withPermission from "../../../hooks/withPermission";

// ----------------------------------------------------------------------

export default function UserMoreMenu({update = () => {}}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {withPermission(["permission::all"], <MenuItem sx={{color: 'text.secondary'}}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Block" primaryTypographyProps={{variant: 'body2'}}/>
        </MenuItem>)}

        {withPermission(["permission::all"], <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Unlock" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>)}

        {withPermission(["permission::user::type::sale"], <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approve for sale" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>)}
      </Menu>
    </>
  );
}
