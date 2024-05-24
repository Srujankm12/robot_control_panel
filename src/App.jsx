import { useEffect, useState } from "react";

import { Box, IconButton } from "@mui/material";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowLeftSharpIcon from "@mui/icons-material/ArrowLeftSharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import StopSharpIcon from "@mui/icons-material/StopSharp";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.215.85:5000");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message) => {
    socket.send(message);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton size="large" onClick={() => sendMessage("f")}>
            <ArrowDropUpSharpIcon />
          </IconButton>
          <IconButton size="large" onClick={() => sendMessage("b")}>
            <ArrowDropDownSharpIcon />
          </IconButton>
          <IconButton size="large" onClick={() => sendMessage("s")}>
            <StopSharpIcon />
          </IconButton>
          <IconButton size="large" onClick={() => sendMessage("l")}>
            <ArrowLeftSharpIcon />
          </IconButton>
          <IconButton size="large" onClick={() => sendMessage("r")}>
            <ArrowRightSharpIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default App;
