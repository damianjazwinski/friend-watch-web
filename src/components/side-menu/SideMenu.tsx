import { Box, SwipeableDrawer, Typography } from "@mui/material";
import "./SideMenu.scss";
import { useSideMenuStore } from "../../store";

const SideMenu = (): JSX.Element => {
  const { isOpen, close, open } = useSideMenuStore();

  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={close} onOpen={open}>
      <Box p={2} width={250}>
        <Typography variant="h6" component="div">
          Drawer
        </Typography>
      </Box>
    </SwipeableDrawer>
  );
};

export default SideMenu;
