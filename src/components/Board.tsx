import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Task from "./Task";
import AddTask from "./AddTask";
import { useDroppable } from "@dnd-kit/core";
import Box from "@mui/joy/Box";

interface Props {
  name: string;
  id: string;
  tasks: {
    id?: string;
    title: string;
    description: string;
    editMode?: boolean;
  }[];
  onAdd: (boardId: string, title: string, description: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onSave: (taskId: string, title: string, description: string) => void;
}

function Board(props: Props) {
  const { name, id, tasks, onAdd, onEdit, onSave, onDelete } = props;
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <Card
      sx={{
        borderRadius: 3,
        minWidth: "190px",
        width: "250px",
        blockSize: "xs",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        boxShadow: "sm",
        bgcolor: isOver ? "background.level2" : "background.level1",
        border: isOver ? "2px solid green" : "none",
      }}
    >
      <CardContent>
        <Typography level="title-md">{name}</Typography>
      </CardContent>

      <Box
        ref={setNodeRef}
        sx={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "visible",
          flex: "flex-grow",
        }}
      >
        {tasks.map((task) =>
          task.editMode ? (
            <AddTask
              key={task.id}
              editMode={true}
              initialTitle={task.title}
              initialDescription={task.description}
              onSave={(title, description) =>
                onSave(task.id || "", title, description)
              }
            />
          ) : (
            <Task
              key={task.id}
              id={task.id || ""}
              title={task.title}
              description={task.description}
              onEdit={() => onEdit(task.id || "")}
              onDelete={() => onDelete(task.id || "")}
            />
          )
        )}
      </Box>

      <Box sx={{ p: 1 }}>
        <AddTask
          editMode={false}
          onAdd={(title, description) => onAdd(id, title, description)}
        />
      </Box>
    </Card>
  );
}

export default Board;
