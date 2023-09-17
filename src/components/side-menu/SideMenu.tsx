import {
  Avatar,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  useTheme,
} from "@mui/material";
import "./SideMenu.scss";
import { useCircleStore, useSideMenuStore, useUserStore } from "../../store";
import { apiLogout } from "../../api/auth-api";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "@tanstack/react-router";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const SideMenu = (): JSX.Element => {
  const {
    isDrawerOpen,
    isCircleSubmenuOpen,
    isWatchesSubmenuOpen,
    closeDrawer,
    openDrawer,
    setCircleSubmenuOpen,
    setWatchesSubmenuOpen,
  } = useSideMenuStore();
  const { username, logout } = useUserStore();
  const { owned, joined } = useCircleStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const allCircles = [...joined, ...owned];

  const homeButtonHandler = () => {
    navigate({ to: "/" });
    closeDrawer();
  };

  const circlesButtonHandler = () => {
    if (!isCircleSubmenuOpen) setCircleSubmenuOpen(true);
    else setCircleSubmenuOpen(false);
  };

  const watchesButtonHandler = () => {
    if (!isWatchesSubmenuOpen) setWatchesSubmenuOpen(true);
    else setWatchesSubmenuOpen(false);
  };

  const joinedCirclesButtonHandler = () => {
    navigate({ to: "/circles/joined" });
    closeDrawer();
  };

  const ownedCirclesButtonHandler = () => {
    navigate({ to: "/circles/owned" });
    closeDrawer();
  };

  const invitationsButtonHandler = () => {
    navigate({ to: "/invitations" });
    closeDrawer();
  };

  const handleLogout = () => {
    apiLogout().catch((error) => {
      console.error(error);
    });
    closeDrawer();
    logout();
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={isDrawerOpen}
      onClose={closeDrawer}
      onOpen={openDrawer}
    >
      <Box width={250}>
        <List
          sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}
          disablePadding
        >
          <ListItem key="profile" disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Avatar" src="/2.png?url" />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ sx: { fontWeight: 800 } }}
                primary={`Hello, ${username}!`}
              />
            </ListItemButton>
          </ListItem>
          {/**/}
          <Divider />
          <ListItem key="home" disablePadding>
            <ListItemButton onClick={homeButtonHandler}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          {/**/}
          <ListItem key="circles" disablePadding>
            <ListItemButton onClick={circlesButtonHandler}>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Circles" />
              {isCircleSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {/**/}
          <Collapse in={isCircleSubmenuOpen} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                key="joined-circles"
                disablePadding
                sx={{
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <ListItemButton onClick={joinedCirclesButtonHandler}>
                  <ListItemText primary="Joined" />
                </ListItemButton>
              </ListItem>
              {/**/}
              <ListItem
                divider
                key="owned-circles"
                disablePadding
                sx={{
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <ListItemButton onClick={ownedCirclesButtonHandler}>
                  <ListItemText primary="Owned" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          {/**/}
          <ListItem key="watches" disablePadding>
            <ListItemButton onClick={watchesButtonHandler}>
              <ListItemIcon>
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText primary="Watches" />
              {isWatchesSubmenuOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isWatchesSubmenuOpen} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {allCircles.map((circle) => (
                <ListItem
                  disablePadding
                  key={circle.id}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      navigate({ to: `/watches/circle/${circle.id}` });
                      closeDrawer();
                    }}
                  >
                    <ListItemText primary={circle.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem key="invitations" disablePadding>
            <ListItemButton onClick={invitationsButtonHandler}>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Invitations" />
            </ListItemButton>
          </ListItem>
          {/**/}
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
