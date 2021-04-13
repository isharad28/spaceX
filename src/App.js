import axios from 'axios';
import { useState, useEffect } from 'react';
import logo from './logo.svg';


function App() {
  const array = [0, 1, 2, 3]
  const bas_url="https://api.spacexdata.com/v3/launches?limit=100"
  const [cards, setcards] = useState([])
  const [years, setYears] = useState('')
  const [radioButton, setradioButton] = useState(false)

  const [launch, setLaunch] = useState('')
  const [launch2, setLaunch2] = useState(false)

  const [landing, setLanding] = useState('')
  const [landing2, setLanding2] = useState(false)


  useEffect(() => {
 callSpaceXApi('')
  }, [])

  const callSpaceXApi=(_payload)=>{
    axios.get(bas_url,{params:_payload}).then(res=>{console.log(res,"spacex")
    setcards(res.data)
  
    })
  }
  const noOfYeras=(years)=>{
   let totalYears=[]
   for(var i=0;i<years;i++)
   {totalYears.push(i)}
   return totalYears
  }
  const setYearsFunction=(e,i)=>{
    console.log(e.target.checked,"setYearsFunction")
    setYears(e.target.value)
    setradioButton(i)
  }
  return (
    <>
    <header><h3 className="m-3">SpaceX Launch Programs</h3></header>
    <section style={{backgroundColor:'rgb(232,232,232)'}}>
      {console.log(years,"years")}
      <div className="row">
        <div style={{backgroundColor:'white'}}  className="col-md-2">
         <div className="row">
           <div className="col-md-12 m-2"><h4>Filters</h4></div>
           <div className="col-md-12 m-2"><h5 className="text-center">Launch Year</h5>
           
           <div className="col-md-12"><hr></hr></div>
          
           
           <div className="row">
           {noOfYeras(14).map((yrs,index)=>{
             var year =2006
             return(
       
          
           <div className="col-md-6 col-sm-6 col-6 mt-2"><div className="float-right">
             <input 
             hidden
              checked={radioButton===index?true:false} 
             value={year+yrs} 
             onChange={(e)=>{setYearsFunction(e,index);
              callSpaceXApi({launch_success:landing,landing_success:launch,launch_year:e.target.value}) }} 
             type="radio"
             class="btn-check" 
             id={`btn-check-${year+yrs}`}  
             autocomplete="off"/>
             <label class={`btn btn-${radioButton===index?'success':'primary'}`} for={`btn-check-${year+yrs}`}  >{year+yrs}</label>
             </div>
             </div>
          
           

  )
       
})
}


         </div>
           </div>
           
           <div className="col-md-12 m-2"><h5 className="text-center">Successful Launch </h5>
           
           <div className="col-md-12"><hr></hr></div>
           <div className="row">
           <div className="col-md-6 col-sm-6 col-6 "><div className="float-right">
           <input hidden checked={launch} onChange={()=>{setLaunch(true);setLaunch2(false);callSpaceXApi({launch_success:true,landing_success:landing,launch_year:years})}} type="radio" class="btn-check" id="btn-check1" autocomplete="off"/>
<label class={`${launch?'btn btn-success':'btn btn-primary'}`} for="btn-check1"> True</label>  
           </div>
             </div>
           <div className="col-md-6 col-sm-6 col-6 "><div className="float-right">
           <input hidden checked={launch2} type="radio" class="btn-check" id="btn-check2" autocomplete="off"/>
<label class={`${launch2?'btn btn-success':'btn btn-primary'}`} onClick={()=>{setLaunch2(true);setLaunch(false); callSpaceXApi({launch_success:false,landing_success:landing,launch_year:years})}}  for="btn-check2"> False</label>    
         </div>
         </div>

         </div>
           </div>
           <div className="col-md-12 m-2"><h5 className="text-center">Successful Landing </h5>
           
           <div className="col-md-12"><hr></hr></div>
          
           <div className="row">
           <div className="col-md-6 col-sm-6 col-6 "><div className="float-right">
           <input hidden checked={landing} onChange={()=>{setLanding(true);setLanding2(false);
            callSpaceXApi({launch_success:launch,landing_success:true,launch_year:years})}} type="radio" class="btn-check" id="btn-check3" autocomplete="off"/>
<label class={`${landing?'btn btn-success':'btn btn-primary'}`} for="btn-check3"> True</label>  
           </div>
             </div>
           <div className="col-md-6 col-sm-6 col-6 "><div className="float-right">
           <input hidden checked={landing2} type="radio" class="btn-check" id="btn-check4" autocomplete="off"/>
<label class={`${landing2?'btn btn-success':'btn btn-primary'}`} onClick={()=>{setLanding2(true);setLanding(false); callSpaceXApi({launch_success:launch2,landing_success:false,launch_year:years})}}  for="btn-check4"> False</label>    
         </div>
         </div>

         </div>
           </div>
         </div>
       
        </div>
      
        <div className="col-md-10">
        
 <div className="row">
 {
            cards.map((data,index)=>{
              console.log(data,"customcard")
              return(
            <div  className=" col-md-6  col-lg-3">
                <div className="card mt-2 customcard" >
                  <div className="p-2 imageBackground">
                <img className="cardImage card-img-top w-50" src={data.links.mission_patch}alt="Card image cap" />
                </div>
                <div className="card-body">
                <p className="card-text font-weight-bold text-primary">{data.mission_name}</p>

                  <p className="card-text font-weight-bold d-inline-block">Mission Ids:
                  
                  </p>
                  <p class="font-weight-light d-inline-block">{data.mission_id.length!==0? data.mission_id.map(mis=>mis,):'Not Availale'}</p>
                  <p className="card-text font-weight-bold d-inline-block  ">Launch Year:</p>
                  <p class="font-weight-light d-inline-block">{new Date(data.launch_year).getUTCFullYear()}</p>
                  <p className="card-text font-weight-bold d-inline-block">Successful Launch:</p>
                  <p class="font-weight-light d-inline-block">{data.launch_success&&"true" || "false"}</p>
                  <p className="card-text font-weight-bold d-inline-block">Successful Landing:</p>
                  <p class="font-weight-light d-inline-block">{''}</p>

                </div>
              </div>
 
        </div>
          )
        })}
        </div>
        </div>
                 
        



      </div>
    </section>
    </>
  );
}

export default App;
