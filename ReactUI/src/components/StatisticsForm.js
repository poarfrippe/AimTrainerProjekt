import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./StatisticsForm.css";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({mode}) {
  const classes = useStyles();

  const [rows, setRows]=useState();

  function getstats(mode) {
    fetch(`http://89.107.108.231:18787/profile/${mode}/` + localStorage.getItem("username")).then(response => response.json()).then(data => { setRows(data) }).catch(err => {
      setRows(undefined)
    }
    )
  }

  useEffect(() => {
    if (mode == "classic") {  
      getstats("classic");
    } else {
      getstats("flick");
    }
  }, [mode]);
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Try No.</StyledTableCell>
              <StyledTableCell >Score</StyledTableCell>
              <StyledTableCell >Accuracy</StyledTableCell>
              <StyledTableCell >Hits/sec</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{index + 1} </StyledTableCell>
                <StyledTableCell className="rowname">{row.score}</StyledTableCell>
                <StyledTableCell className="rowname">{row.trefferquote}</StyledTableCell>
                <StyledTableCell className="rowname">{row.anschlaege}</StyledTableCell>
              </StyledTableRow>
            )): <p>{`You have not played ${mode} mode yet.`}</p>}
          </TableBody>
        </Table>
        </TableContainer>
    );
}
  
