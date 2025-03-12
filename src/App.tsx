import { useEffect, useState } from "react";
import Board from "./components/Board";
import testData from "./test-data";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

interface BoardType {
  id: string;
  name: string;
  tasks: {
    title: string;
    description: string;
    editMode?: boolean;
  }[];
}

function App() {
  const [state, setState] = useState<BoardType[]>([]);

  const handleNewTask = (id: string, title: string, description: string) => {
    setState(
      state.map((b) =>
        b.id === id
          ? {
              ...b,
              tasks: [...b.tasks, { title, description, editMode: true }],
            }
          : b
      )
    );
    console.log(state);
  };

  useEffect(() => {
    setState(testData.boards);
  }, []);

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Typography level="h1" sx={{ pt: 2, pl: 2 }}>
        My Trello
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "scroll",
          p: 2,
          minHeight: "100vh",
          width: "auto",
          bgcolor: "#f5f5f5",
        }}
      >
        {state.map((board) => (
          <Board
            key={board.id}
            id={board.id}
            name={board.name}
            tasks={board.tasks}
            onAdd={handleNewTask}
          />
        ))}
      </Box>
    </Box>
  );
}

export default App;
