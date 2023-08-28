import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSideMenuStore, useUserStore } from "../../store";
import { apiLogout } from "../../api/auth-api";
import useLogoutTrigger from "../../hooks/logout-trigger";
import SideMenu from "../side-menu/SideMenu";

const ApplicationBar = (): JSX.Element => {
  const { open } = useSideMenuStore();
  const { logout } = useUserStore();
  useLogoutTrigger();

  const handleLogout = () => {
    apiLogout().catch((error) => {
      console.error(error);
    });
    logout();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            id="side-menu"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={open}
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            FriendWatch
          </Typography>

          <Button color="inherit" variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
        <SideMenu />
      </AppBar>
    </>
  );
};

export default ApplicationBar;
