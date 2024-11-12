"use client";
import {
  Box,
  Drawer,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Avatar,
  Paper,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useRouter } from "next/navigation";

const AppBar = () => {
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  // const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSubmenuClick = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/signin");
  };

  const menuItems = [
    { title: "About", submenu: [] },
    { title: "Contact", submenu: [] },
    { title: "Favourites", submenu: [] },
    { title: "Company", submenu: [] },
  ];

  const user_name = localStorage.getItem("user_name");
  const userId = localStorage.getItem("userId");

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 1,
          paddingBottom: 1,
          backgroundColor: "white",
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: "flex", ml: { md: 10, xs: 0 } }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 2 }}
          >
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "#075985",
                fontWeight: 750,
                fontSize: { md: 48, xs: 32 },
              }}
            >
              <span style={{ color: "#059212" }}>ScoreBoard</span>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" }, mr: 2 }}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box
          sx={{ display: { xs: "none", md: "flex" }, gap: 2, pr: 28, pt: 4 }}
        >
          <Typography sx={{ fontWeight: 500 }}>About</Typography>
          <Typography sx={{ fontWeight: 500 }}>Contacts</Typography>
          <Typography sx={{ fontWeight: 500 }}>Favourites</Typography>
          <Typography sx={{ fontWeight: 500 }}>Company</Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <>
            <Avatar
              sx={{ cursor: "pointer", bgcolor: "#075985" }}
              onClick={handleAvatarClick}
              alt={user_name}
              // src={"/avatar"}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 2 }}
            >
              <MenuItem disabled>User ID: {userId}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        </Box>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250, padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <>
                <Avatar
                  alt={user_name}
                  // src={avatar}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {user_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {userId}
                </Typography>
              </>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", color: "red" }}
                onClick={handleLogout}
              >
                Logout
              </Typography>
            </Box>

            <IconButton
              onClick={toggleDrawer}
              sx={{
                position: "absolute",
                top: 8,
                right: 4,
                height: 25,
                width: 23,
                backgroundColor: "#f44336",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "yellow",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <List>
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      button="true"
                      onClick={() => handleSubmenuClick(index)}
                    >
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: "medium",
                          textAlign: "left",
                        }}
                      />
                      {item.submenu.length > 0 &&
                        (openSubmenu === index ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        ))}
                    </ListItem>
                    {item.submenu.length > 0 && (
                      <Collapse
                        in={openSubmenu === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.submenu.map((subItem, subIndex) => (
                            <ListItem
                              button="true"
                              key={subIndex}
                              sx={{ pl: 3 }}
                              component={motion.div}
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: subIndex * 0.1,
                              }}
                            >
                              <ListItemText
                                primary={subItem}
                                primaryTypographyProps={{
                                  fontWeight: "light",
                                  textAlign: "left",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </motion.div>
          </Box>
        </Drawer>
      </Box>
    </Grid>
  );
};

export default AppBar;
