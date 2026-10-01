import { Box, LinearProgress, Typography } from "@mui/material";

interface BarChartType {
  label: string;
  percentage: number;
  input: string;
}

const BarChart = ({ label, percentage, input }: BarChartType) => {
  return (
    <div>
      <Typography
        variant="body1"
        component="div"
        sx={{ flexGrow: 1, mr: "1rem" }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "90%",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: "2rem",
            width: "100%",
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {input}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default BarChart;
