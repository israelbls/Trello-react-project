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
        borderRadius: 5,
        mb: 1,
      }}
    >
      <CardContent>
        <Typography level="title-sm">{title}</Typography>
        <Typography level="body-xs">{description}</Typography>
      </CardContent>
    </Card>
  );
}

export default Task;
