import { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";

interface Props {
  editMode: boolean;
  initialTitle?: string;
  initialDescription?: string;
  onAdd?: (title: string, description: string) => void;
  onSave?: (title: string, description: string) => void;
}

function AddTask({
  editMode,
  initialTitle = "",
  initialDescription = "",
  onAdd,
  onSave,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleSubmit = () => {
    if (!title) return;

    if (editMode && onSave) {
      onSave(title, description);
    } else if (onAdd) {
      onAdd(title, description);

      setTitle("");
      setDescription("");
    }
  };

  const inputStyle = {
    "--Input-radius": "0px",
    borderBottom: "2px solid",
    borderColor: "neutral.outlinedBorder",
    "&:hover": {
      borderColor: "neutral.outlinedHoverBorder",
    },
    "&::before": {
      border: "1px solid var(--Input-focusedHighlight)",
      transform: "scaleX(0)",
      left: 0,
      right: 0,
      bottom: "-2px",
      top: "unset",
      transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
      borderRadius: 0,
    },
    "&:focus-within::before": {
      transform: "scaleX(1)",
    },
    fontSize: "sm",
  };

  return (
    <Stack
      spacing={2}
      sx={
        editMode
          ? {
              bgcolor: "background.surface",
              borderRadius: 3,
              p: 0.5,
            }
          : {}
      }
    >
      <Input
        placeholder="Title"
        variant="soft"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={inputStyle}
      />
      <Input
        placeholder="Description"
        variant="soft"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={inputStyle}
      />
      <Button type="button" onClick={handleSubmit}>
        {editMode ? "Save" : "Add Task"}
      </Button>
    </Stack>
  );
}

export default AddTask;
