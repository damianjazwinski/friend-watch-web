import {
  Avatar,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  styled,
  useTheme,
} from "@mui/material";
import "./SideMenu.scss";
import { useCircleStore, useSideMenuStore, useUserStore } from "../../store";
import { apiLogout } from "../../api/auth-api";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "@tanstack/react-router";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { ChangeHandler, SubmitHandler, useForm } from "react-hook-form";
import { apiSetUserAvatar } from "../../api/user-api";
import { useSnackbar } from "notistack";
import { ErrorResponse } from "../../api/api-tool";

interface AvatarInput {
  avatarImageFile: FileList;
}

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
  const { enqueueSnackbar } = useSnackbar();
  const { username, userAvatarUrl, setUserAvatarUrl, logout } = useUserStore();
  const { owned, joined } = useCircleStore();
  const [open, setOpen] = useState(false);
  const [pictureName, setPictureName] = useState("Add circle picture");
  const [avatarPreview, setAvatarPreview] = useState<File | undefined>(
    undefined
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPictureName("Add circle picture");
    setAvatarPreview(undefined);
  };

  // user avatar submit handler
  const onSubmit: SubmitHandler<AvatarInput> = (data) => {
    apiSetUserAvatar(data.avatarImageFile[0])
      .then(({ userAvatarUrl }) => {
        setUserAvatarUrl(userAvatarUrl);
        enqueueSnackbar("New avatar set", { variant: "success" });
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar({
          message: error.messages.join("\n"),
          variant: "error",
        });
      });

    handleClose();
  };

  const onChange: ChangeHandler = async (event) => {
    setPictureName(event.target.files[0].name);
    setAvatarPreview(event.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AvatarInput>();
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
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100dvh",
          }}
          disablePadding
        >
          <ListItem key="profile" sx={{ padding: "4px 0px 4px 16px" }}>
            <IconButton onClick={handleClickOpen}>
              <Avatar alt="Avatar" src={userAvatarUrl} />
            </IconButton>
            <ListItemText
              sx={{ paddingLeft: "10px" }}
              primary={`Hello, ${username}!`}
              primaryTypographyProps={{ sx: { fontWeight: 800, fontSize: 18 } }}
            />
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
            <List
              component="div"
              disablePadding
              sx={{ maxHeight: 150, overflow: "auto" }}
            >
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
      {/**/}
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        fullWidth
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Set avatar</DialogTitle>
        <Box margin={"0 auto"}>
          <Avatar
            sx={{ width: "200px", height: "200px" }}
            src={
              avatarPreview
                ? URL.createObjectURL(avatarPreview!)
                : userAvatarUrl
            }
          />
        </Box>
        <DialogContent>
          <Button
            startIcon={<PhotoCamera />}
            fullWidth
            component="label"
            variant="contained"
            aria-label="upload picture"
            sx={{ mt: 3 }}
          >
            <input
              multiple={false}
              hidden
              accept="image/*"
              type="file"
              id="avatarImageFile"
              {...register("avatarImageFile", { onChange: onChange })}
            />
            {pictureName}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">OK</Button>
        </DialogActions>
      </Dialog>
    </SwipeableDrawer>
  );
};

export default SideMenu;
