import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CloudCircle, NavigateBefore, NavigateNext } from "@mui/icons-material";

const WeatherTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function formatTimeString(datetimeString) {
    const datetime = new Date(datetimeString);

    const hours = datetime.getHours().toString().padStart(2, "0");
    const minutes = datetime.getMinutes().toString().padStart(2, "0");
    const seconds = datetime.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center", // Horizontally center the content
        alignItems: "center", // Vertically center the content
        flexDirection: "column",
      }}
    >
      <Box height={100} width={"100%"} mb={0.8}>
        <Paper sx={{ width: "100%", height: "92%" }} elevation={5}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <IconButton
              disabled={page === 0}
              onClick={() => handleChangePage(null, page - 1)}
              aria-label="Previous Day"
            >
              <NavigateBefore />
            </IconButton>
            <span>{`Day ${page + 1}`}</span>
            <IconButton
              disabled={(page + 1) * rowsPerPage >= data.length}
              onClick={() => handleChangePage(null, page + 1)}
              aria-label="Next Day"
            >
              <NavigateNext />
            </IconButton>
          </Stack>
        </Paper>
      </Box>
      <Paper sx={{ width: "100%" }} elevation={5}>
        <TableContainer>
          <Table aria-label="weather table">
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.dt}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      height: "52.7px",
                      padding: "5px",
                      display: "flex",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ backgroundColor: "white", flex: 1 }} // Adjust the padding as needed
                    >
                      {formatTimeString(row.dt_txt)}
                    </TableCell>
                    <TableCell
                      align="right"
                      
                      sx={{ backgroundColor: "white", flex: 1 ,justifyContent:"center"}}
                    >
                      <IconButton aria-label="delete" >
                        <CloudCircle sx={{ fontSize: 30 }}></CloudCircle>
                      </IconButton>
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "white", flex: 1 }}
                      align="right"
                    >
                      {row.weather[0].description}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default WeatherTable;
