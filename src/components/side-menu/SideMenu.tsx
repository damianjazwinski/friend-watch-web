import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import "./SideMenu.scss";
import { useSideMenuStore, useUserStore } from "../../store";
import { apiLogout } from "../../api/auth-api";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useNavigate } from "@tanstack/react-router";

interface SideMenuItem {
  name: string;
  key: string;
  clickHandler: (path: string) => void;
}

const SideMenu = (): JSX.Element => {
  const { isOpen, close, open } = useSideMenuStore();
  const { username } = useUserStore();
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const homeButtonHandler = () => {
    navigate({ to: "/" });
    close();
  };

  const circlesButtonHandler = () => {
    navigate({ to: "/circles" });
    close();
  };

  const watchesButtonHandler = () => {
    navigate({ to: "/watches" });
    close();
  };

  const handleLogout = () => {
    apiLogout().catch((error) => {
      console.error(error);
    });
    close();
    logout();
  };

  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={close} onOpen={open}>
      <Box width={250}>
        <List
          sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}
          disablePadding
        >
          <ListItem key="profile" disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="1.png" />
              </ListItemAvatar>
              <ListItemText primary={username} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key="home" disablePadding>
            <ListItemButton onClick={homeButtonHandler}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem key="circles" disablePadding>
            <ListItemButton onClick={circlesButtonHandler}>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Circles" />
            </ListItemButton>
          </ListItem>
          <ListItem key="watches" disablePadding>
            <ListItemButton onClick={watchesButtonHandler}>
              <ListItemIcon>
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText primary="Watches" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ marginTop: "auto" }} />
          <ListItem key="logout" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default SideMenu;
