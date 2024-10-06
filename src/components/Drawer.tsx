import * as React from "react";
import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import {
  EditOutlined,
  ArchiveOutlined,
  DeleteOutlined,
  LightbulbOutlined,
  DescriptionTwoTone,
  Delete,
} from "@mui/icons-material";
import { Button, InputBase, alpha } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface INotesProps {
  onSearch: (term: string) => void;
  drawerState: boolean;
  setDrawerOpened: (drawerOpened: boolean) => void;
  homePage: boolean;
  setHomePage: (home: boolean) => void;
  labelPage: boolean;
  setLabelPage: (label: boolean) => void;
  archivePage: boolean;
  setArchivePage: (archive: boolean) => void;
  binPage: boolean;
  setBinPage: (bin: boolean) => void;
}

const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function MiniDrawer({
  onSearch,
  drawerState,
  setDrawerOpened,
  homePage,
  setHomePage,
  labelPage,
  setLabelPage,
  archivePage,
  setArchivePage,
  binPage,
  setBinPage,
}: INotesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpened(!drawerState);
    setOpen(true);
  };

  const handlePageChange = (page: "home" | "label" | "archive" | "bin") => {
    setHomePage(page === "home");
    setLabelPage(page === "label");
    setArchivePage(page === "archive");
    setBinPage(page === "bin");
  };

  const handleDrawerClose = () => {
    setDrawerOpened(!drawerState);
    setOpen(false);
  };

  const handleLogout = () => {
    clearAuthToken();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: "grey",
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <DescriptionTwoTone sx={{ color: "green" }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "GrayText" }}
          >
            JotSpot
          </Typography>
          <Search sx={{ color: "black", border: 0.1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputProps={{ "aria-label": "search" }}
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Link to="/">
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: "green",
                color: "green",
                "&:hover": {
                  borderColor: "blue",
                  color: "blue",
                },
              }}
            >
              Log out
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Notes", "Edit labels", "Archive", "Bin"].map((text, index) => {
            let IconComponent;
            switch (index) {
              case 0:
                IconComponent = <LightbulbOutlined />;
                break;
              case 1:
                IconComponent = <EditOutlined />;
                break;
              case 2:
                IconComponent = <ArchiveOutlined />;
                break;
              case 3:
                IconComponent = !binPage ? <DeleteOutlined /> : <Delete />;
                break;
              default:
                console.log("Unknown action for icon");
            }

            const handleClick = () => {
              switch (index) {
                case 0:
                  handlePageChange("home");
                  break;
                case 1:
                  handlePageChange("label");
                  break;
                case 2:
                  handlePageChange("archive");
                  break;
                case 3:
                  handlePageChange("bin");
                  break;
                default:
                  console.log("Unknown action");
              }
            };

            return (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handleClick}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {IconComponent}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
