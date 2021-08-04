import React,{useState, useEffect} from 'react';
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
import axios from 'axios';

const baseURL = "http://localhost:9000";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  
  const classes = useStyles();
  const [allData,setAllData] = useState([]);
  const [data,setData] = useState({pname:'',description:'',size:''})

  
  useEffect(() => { 
    getData();
  }, []);
  async function getData(){
    const {data} = await axios.get(`${baseURL}/properties`);
    if(data.length)
      setAllData(data);
    console.log(allData);
  }

  const deleteData = async (e) => {
    e.preventDefault();
    console.log(allData);
    const confirm = await axios.delete(`${baseURL}/properties/${e.target.id}`);
    if(confirm.status === 200)
      setAllData(allData.filter((data) => data._id !== e.target.id));
  }
  const sendData = async (e) => {
    e.preventDefault();
    const newData = await axios.post(`${baseURL}/properties`,data);
    if(newData)
      setAllData((allData) => [...allData,newData.data]);
    setData({pname:'',description:'',size:''});
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
                  <TableRow id="tblrow" key = {data._id}>
                    <TableCell align="center">{data.pname}</TableCell>
                    <TableCell align="center">{data.description}</TableCell>
                    <TableCell align="center">{data.size}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="text" color="primary" aria-label="text primary button group"> 
                        <Button id={data._id} className="submitbtn"  onClick={deleteData}>Delete</Button> 
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
