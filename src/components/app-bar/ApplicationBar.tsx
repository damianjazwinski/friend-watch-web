import { Menu } from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSideMenuStore } from "../../store";

import useLogoutTrigger from "../../hooks/logout-trigger";
import SideMenu from "../side-menu/SideMenu";
import "./ApplicationBar.scss";

const ApplicationBar = (): JSX.Element => {
  const { open } = useSideMenuStore();
  useLogoutTrigger();

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className="application-bar">
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
        </Toolbar>
        <SideMenu />
      </AppBar>
    </>
  );
};

export default ApplicationBar;
