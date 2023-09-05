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
}

const Circle = ({ circle }: CircleProps): JSX.Element => {
  return (
    <>
      <Card
        square
        sx={{
          width: 200,
        }}
      >
        <CardActionArea>
          <Box
            component="div"
            sx={{
              padding: "8px",
            }}
          >
            <CardMedia
              component="img"
              image="/biznes-ludzie-grupa-ludzi.jpg?url"
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
