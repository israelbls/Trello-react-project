import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Task from "./Task";
import AddTask from "./AddTask";

interface Props {
  name: string;
  id: string;
  tasks: {
    title: string;
    description: string;
    editMode?: boolean;
  }[];
  onAdd: (boardId: string, title: string, description: string) => void;
  onSave?: () => void;
}

function Board({ name, id, tasks, onAdd, onSave }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        minWidth: "150px",
        width: "250px",
        blockSize: "xs",
        height: "fit-content",
        boxShadow: "sm",
        bgcolor: "background.level1",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <CardContent>
        <Typography level="title-md">{name}</Typography>{" "}
      </CardContent>
      {tasks.map((task, index) => {
        return (
          <Task title={task.title} description={task.description} key={index} />
        );
      })}
      <AddTask
        editMode={false}
        onAdd={(title, description) => onAdd(id, title, description)}
        onSave={() => onSave?.bind(id)}
      ></AddTask>
    </Card>
  );
}

export default Board;
