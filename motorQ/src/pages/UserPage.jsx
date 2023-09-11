import { Box, Button, Container, Grid, MenuItem, TextField } from "@mui/material";
import BasicInput from "../components/BasicInput";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { set } from "mongoose";



function UserPage() {

    const [allData,setAllData] = useState([]);
    const [modelOptions,setModelOptions] = useState([]);
    const [makeOptions,setMakeOptions] = useState(["Loading..."]);
    const [yearOptions, setYearOptions] = useState([])
    const [Enrollments, setEnrollments] = useState([])
   

    const[isPending, startTransition] = useTransition();

    const[make,setMake] = useState('')
    const[model,setModel]=  useState('');
    const [year,setYear] = useState('');

    const [disabled1,setDisabled1] = useState(true);
    const [disabled2,setDisabled2] = useState(true);

    const [vin,setVIN] = useState('')

    const [isloaded,setIsLoaded] = useState(false)

    useEffect(()=>{
      if(make !== ''){
        setDisabled1(false)
      }
      let possible_models = []
      allData.map((curr)=>{
        if(make == curr.make){
          possible_models.push(curr.model)
        }
      })
      setModelOptions(possible_models);
      setModel(possible_models[0]);
    },[make])

    
    useEffect(()=>{
      if(model !== '' || model != null){
        if(modelOptions != []){
        setDisabled2(false)
      }
      }
      let possible_models = []
      allData.map((curr)=>{
        if(model == curr.model){
          possible_models.push(curr.year)
        }
      })
      setYearOptions(possible_models);
      setYear(possible_models[0])
    },[model, modelOptions,allData])

    useEffect(()=>{
       const currvin =  allData.find((element)=>{
         return (element.make  === make && element.model === model && element.year == year)
        })
        if(currvin != null){
        setVIN(currvin.VIN)
      }
    },[year,model,make])

    function getinfo(){
      axios.get('http://localhost:8000/getuserorders', {          
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173"
        },
        credentials: 'include',
      }).then((res)=>{
        //  setMakeOptions([]);
        setEnrollments(res)
        setIsLoaded(true)
        })
    }

    useEffect(()=>{
      getinfo()
    },[])

    useEffect(()=>{
      if(make !== ''){
        setDisabled1(false)
      }
      let possible_models = []
      allData.map((curr)=>{
        if(make == curr.make && !possible_models.includes(curr.model)){
          possible_models.push(curr.model)
        }
      })
      setModelOptions(possible_models);
      setModel(possible_models[0])
    },[make,allData])

    useEffect(()=>{

      axios.get('http://localhost:8000/getcars', {          
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173"
        },
        credentials: 'include',
      }).then((res)=>{
        //  setMakeOptions([]); 
        const temp_make = []
        setAllData(res.data);
        res.data.map((curr)=>{
          if(!temp_make.includes(curr.make)){
            temp_make.push(curr.make);
          }
        })
        
        startTransition(()=>{
        setMakeOptions(temp_make);
      })
        // setMake(temp_make[0])
      })
    
  },[])


  function makeChangeHandler(e){
    setMake(e.target.value);
  }

  function modelChangeHandler(e){
    setModel(e.target.value);
  }

  function vinChangeHandler(e){
    if(e.target.value.length < 8){
      return false;
    }

    setVIN(e.target.value)
  }

  function yearChangeHandler(e){
    setYear(""+e.target.value)
  }


  function submitHandler(){

    const formdata = {
     make: make,
     model:model,
     year:year,
     vin: vin
    }

    if(make !== '' && model !== ''){
      if(vin.length === 17){
        axios.post('http://localhost:8000/newenrollment', JSON.stringify(formdata), {          
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173"
          },
          credentials: 'include',
          body: formdata
          
        }).then((res)=>{
            if(res.status == 200){
            getinfo();
            }else{
              console.log('error in request')
            }
        })
      }
  }}

 
      return (
    <>
    <Container sx={{minWidth: '56rem'}}>
    <form>

    <Grid container sx={{minWidth: '10rem'}} rowGap={3} spacing={4} justifyContent={"space-between"}>
    <Grid item xs={12} sm={4}>
            <TextField
             id="make"
             select
             label="Make"
             defaultValue={"Loading..."}
             value={make}
             fullWidth
             onChange={(e)=>{makeChangeHandler(e)}}
            >
            {makeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
            <TextField
             id="model"
             select
             label="Model"
             defaultValue="Web"
             fullWidth
             disabled={disabled1}
             value = {model}
             onChange={(e)=>{modelChangeHandler(e)}}
            >
            {modelOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
             id="year"
             select
             label="Year"
             value= {year}
             onChange={(e)=>{yearChangeHandler(e)}}
             fullWidth
             disabled={disabled2}
            >
            {yearOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
    </Grid>
              <Box sx={{marginTop: '1rem'}}>
              <TextField
              id="vin"
              label="VIN Number"
              fullWidth
              value={vin}
              onChange={(e)=>{vinChangeHandler(e)}}
              >

              </TextField>
              </Box>
              <Container>
                <Button  onClick={submitHandler} variant="contained" sx={{marginTop: '1rem', minWidth: '10rem'}}>Submit</Button>
              </Container>
    </form>
    </Container>

    <Container>
      <h1>Current Enrollments</h1>
      {isloaded && Enrollments.data.map(curr=>{
        console.log(curr)
        return(
          <div key={curr.vin}>
            {curr.make} {curr.model} {curr.year} {curr.vin}
          </div>
        )
      })}
    </Container>
    </>
  )
}


export default UserPage;