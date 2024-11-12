"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Button,
  Snackbar,
  TablePagination,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingScore, setEditingScore] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loggedInUserRank, setLoggedInUserRank] = useState(null);

  // let role=""
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  let roleUser = "";
  let userIdUser = "";
  // let tokenUser = "";
  useEffect(() => {
    if (typeof window !== "undefined") {
      roleUser = window.localStorage.getItem("role");
      userIdUser = window.localStorage.getItem("USER_ID");

      setRole(roleUser ?? "");
      setUserId(userIdUser ?? "");
    }
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_POINT}/get-all-users`,
        {
          params: { page: page + 1, limit: rowsPerPage, search: searchQuery },
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );

      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);

        const fullListResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_POINT}/get-all-users`,
          {
            params: { page: 1, limit: 1000 },
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );
        const sortedUsers = fullListResponse.data.users.sort(
          (a, b) => b.score - a.score
        );
        const userRankIndex = sortedUsers.findIndex(
          (user) => user._id === userId
        );
        setLoggedInUserRank(userRankIndex >= 0 ? userRankIndex + 1 : null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const editUserScore = async (index) => {
    const newScore = parseInt(editingScore, 10);
    if (isNaN(newScore)) {
      alert("Please enter a valid score.");
      return;
    }
    const userToUpdate = users[index];
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_POINT}/update-score/${userToUpdate._id}`,
        {
          score: newScore,
        }
      );
      setSnackbarMessage("User score updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setEditingIndex(null);
      setEditingScore("");
      fetchUsers();
    } catch (error) {
      console.error("Error updating score:", error);
      setSnackbarMessage("Failed to update score");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_POINT}/delete-user/${userToDelete}`
      );
      setSnackbarMessage("User deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenDeleteDialog(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setSnackbarMessage("Failed to delete user");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box p={1} sx={{ alignItems: "center", justifyItems: "center" }}>
      <Box sx={{ width: { md: 600, xs: "none" } }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          margin="normal"
        />
        {loggedInUserRank && (
          <Box mt={2}>
            <Typography variant="h6" color="primary">
              You are ranked #{loggedInUserRank} in the top users!
            </Typography>
          </Box>
        )}
        {users?.map((user, index) => (
          <Paper key={user._id} sx={{ p: 2, mt: 2, position: "relative" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: <span style={{ color: "red" }}>{user.userId}</span>
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: 16 }}
                >
                  Score: <span style={{ color: "green" }}>{user.score}</span>
                </Typography>
              </Box>
              <Box>
                {(role === "admin" || user._id === userId) && (
                  <>
                    {editingIndex === index ? (
                      <Box display="flex" gap={1} alignItems="center">
                        <TextField
                          label="Edit Score"
                          variant="outlined"
                          size="small"
                          value={editingScore}
                          onChange={(e) => setEditingScore(e.target.value)}
                        />
                        <Button
                          color="primary"
                          onClick={() => editUserScore(index)}
                          variant="contained"
                        >
                          Update Score
                        </Button>
                      </Box>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditingIndex(index);
                          setEditingScore(user.score.toString());
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {role === "admin" && (
                      <IconButton
                        color="error"
                        onClick={() => {
                          setUserToDelete(user._id);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </>
                )}
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "gold",
                fontWeight: "bold",
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              Rank:{" "}
              <span style={{ color: "black" }}>
                {index + 1 + page * rowsPerPage}
              </span>
            </Typography>
          </Paper>
        ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Page;
