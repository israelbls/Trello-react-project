import { IconButton } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState, useRef } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function Task({ id, title, description, onEdit, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (componentRef.current) {
      const { width, height } = componentRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div style={{ margin: "8px 0" }} ref={componentRef}>
      {" "}
      <Card
        component="div"
        ref={setNodeRef}
        style={
          transform
            ? {
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
                position: "absolute" as const,
                zIndex: 1000,
                width: dimensions.width,
                height: dimensions.height,
                border: "2px solid blue",
              }
            : undefined
        }
        orientation="horizontal"
        size="sm"
        sx={{
          bgcolor: "background.surface",
          borderRadius: 3,
          p: 0.5,
          position: "relative",
          minWidth: "170px",
        }}
      >
        <div
          {...listeners}
          {...attributes}
          style={{
            width: "80%",
            cursor: "grab",
            zIndex: 1,
          }}
        >
          <CardContent sx={{ p: 1 }}>
            <Typography level="title-sm">{title}</Typography>
            <Typography level="body-xs" sx={{ fontSize: "0.75rem" }}>
              {description}
            </Typography>
          </CardContent>
        </div>

        <IconButton
          sx={{
            position: "absolute",
            right: "0px",
            top: "0px",
            cursor: "pointer",
            zIndex: 100,
          }}
          onClick={handleEditClick}
        >
          <FaRegEdit size="0.75rem" />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "0px",
            cursor: "pointer",
            zIndex: 100,
          }}
          onClick={handleDeleteClick}
        >
          <AiOutlineDelete size="0.75rem" />
        </IconButton>
      </Card>
    </div>
  );
}

export default Task;
