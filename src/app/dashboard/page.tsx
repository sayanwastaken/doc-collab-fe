"use client";
import {
  Box,
  Typography,
  Button,
  Card,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafbfc" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            DocCollab
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Card sx={{ p: 4, borderRadius: "16px", boxShadow: 3 }}>
          <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
            Welcome to DocCollab Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You are successfully logged in and ready to collaborate on
            documents.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Card sx={{ p: 3, minWidth: 200, backgroundColor: "#f8f9fa" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                User Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Name: {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
            </Card>

            <Card sx={{ p: 3, minWidth: 200, backgroundColor: "#f8f9fa" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Quick Actions
              </Typography>
              <Button
                variant="contained"
                sx={{ mb: 1, width: "100%" }}
                onClick={() => {
                  const roomId = Math.random().toString(36).substring(2, 10);
                  router.push(`/whiteboard/${roomId}`);
                }}
              >
                Create Room
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "100%" }}
                onClick={() => {
                  const roomId = prompt("Enter Room ID to join:");
                  if (roomId) router.push(`/whiteboard/${roomId}`);
                }}
              >
                Join Room
              </Button>
            </Card>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
