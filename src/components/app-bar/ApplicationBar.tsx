import { Menu } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useUserStore } from "../../store";
import { useNavigate } from "@tanstack/react-router";

const ApplicationBar = (): JSX.Element => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch("https://localhost/api/auth/logout", {
      method: "GET",
      credentials: "include",
    }).catch((err) => console.error(err));
    localStorage.removeItem("tokenExpirations");
    logout();
    navigate({ to: "/login" });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
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
      </AppBar>
    </>
  );
};

export default ApplicationBar;
