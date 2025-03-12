import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Task from "./Task";
import AddTask from "./AddTask";

interface Props {
  name: string;
  tasks: {
    title: string;
    description: string;
    editMode?: boolean;
  }[];
  handleNewTask?: () => void;
  handelEdit?: () => void;
}

function Board({ name, tasks, handleNewTask, handelEdit }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3, // Reduced from 5
        width: "250px", // Set explicit width (was "300")
        blockSize: "xs", // Changed from "sm"
        height: "fit-content",
        boxShadow: "sm",
        bgcolor: "background.level1",
        maxHeight: "80vh", // Added max height
        overflow: "auto", // Added scrolling for overflow
      }}
    >
      <CardContent>
        <Typography level="title-md">{name}</Typography>{" "}
        {/* Changed from title-lg */}
      </CardContent>
      {tasks.map((task, index) => {
        return (
          <Task title={task.title} description={task.description} key={index} />
        );
      })}
      <AddTask
        editMode={false}
        onAdd={handleNewTask}
        onSave={handelEdit}
      ></AddTask>
    </Card>
  );
}

export default Board;
