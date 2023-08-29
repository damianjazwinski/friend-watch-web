import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import "./SideMenu.scss";
import { useSideMenuStore } from "../../store";
import HomeIcon from "@mui/icons-material/Home";
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
  const navigate = useNavigate();

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

  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={close} onOpen={open}>
      <Box p={1} width={250}>
        <List>
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
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default SideMenu;
