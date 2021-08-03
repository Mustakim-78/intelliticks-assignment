import React,{useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const classes = useStyles();
  const [tempID, setTempID] = useState(0);
  const [allData,setAllData] = useState([]);
  const [data,setData] = useState({pname:'',description:'',size:''})
  const deleteData = (e) => {
    e.preventDefault();
    console.log(allData);
    setAllData(allData.filter((data) => +data.id !== +e.target.id));
  }
  const sendData = (e) => {
    e.preventDefault();
    setTempID(prevcount => prevcount + 1);
    data['id'] = tempID;
    console.log(data);
    setAllData([...allData,data]);
    setData({pname:'',description:'',size:''});
    console.log(tempID);
    console.log(allData);
  }
  return (
    <div className="App">
      <h1>Property Management System</h1>
      <div className="formclass">
          <form className="form"  noValidate autoComplete="off">
              <TextField id="standard-basic"  type="text" className="txtfield" label="Property Name" value={data.pname} onChange = {(e)=>setData({...data,pname:e.target.value})} />
              <TextField id="standard-basic"  type="text" className="txtfield" label="Description"  value={data.description} onChange = {(e)=>setData({...data,description:e.target.value})} />
              <TextField id="standard-basic"  type="text" className="txtfield" label="Size (In sqft)"  value={data.size} onChange = {(e)=>setData({...data,size:e.target.value})} />
              <Button id="tempid" className="submitbtn" variant="contained" color="primary" onClick={sendData} value="Primary">Submit</Button>
          </form>
      </div>
      <div className="data">
        {allData ?
              <TableContainer component={Paper}>
          <Table className={classes.table}  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Size(sq.ft)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData.map((data) => (
                  <TableRow id="tblrow" key = {data.id}>
                    <TableCell align="center">{data.pname}</TableCell>
                    <TableCell align="center">{data.description}</TableCell>
                    <TableCell align="center">{data.size}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="text" color="primary" aria-label="text primary button group"> 
                        <Button id={data.id} className="submitbtn"  onClick={deleteData}>Delete</Button> 
                      </ButtonGroup>
                    </TableCell>
                </TableRow>
              ))}
                
            </TableBody>
          </Table>
      </TableContainer> : null }
      </div>
    </div>
  );
}

export default App;
