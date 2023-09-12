import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ICircle } from "../../../types";

interface CircleProps {
  circle: ICircle;
  onClick: () => void;
}

const Circle = ({ circle, onClick }: CircleProps): JSX.Element => {
  return (
    <>
      <Card
        elevation={10}
        square
        sx={{
          width: 200,
        }}
      >
        <CardActionArea onClick={onClick}>
          <Box
            component="div"
            sx={{
              padding: "8px",
            }}
          >
            <CardMedia
              component="img"
              image={circle.imageFile?.url ?? "/circle_card_photo.png"}
              height="100"
            />
          </Box>

          <CardContent sx={{ padding: "4px 10px" }}>
            <Typography variant="h6" component="div">
              {circle.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Circle;
