import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

interface Props {
  title: string;
  description: string;
}

function Task({ title, description }: Props) {
  return (
    <Card
      orientation="horizontal"
      size="sm"
      sx={{
        bgcolor: "background.surface",
        borderRadius: 3, // Reduced from 5
        p: 0.5, // Added smaller padding
      }}
    >
      <CardContent sx={{ p: 1 }}>
        {" "}
        {/* Reduced padding */}
        <Typography level="title-sm">{title}</Typography>
        <Typography level="body-xs" sx={{ fontSize: "0.75rem" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Task;
