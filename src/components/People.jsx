import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "https://swapi.dev/api/people";  //base url for get people list

export const People = () => {
  const [results, setResults] = useState([]);
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState();

  //const [homeworlds,setHomeworlds]= useState([]);
  const [homeworld,setHomeworld]= useState();
  //const [films,setFilems]= useState([]);
  //const [starships,setStarships]= useState([]);
  //const [vehicles,setVehicles]= useState([]);

  useEffect(() => {    
      getbaseUrlWithAxios(baseUrl);
      //setCurrentPage(1);  
  }, []);

  //get people list result
  const getbaseUrlWithAxios = async (url) => {
    const response = await axios.get(url);
    console.log(response.data.results);
    setResults(response.data.results);
    setNext(response.data.next);
    setPrevious(response.data.previous);
    setCount(response.data.count);
    
    setCurrentPage(
        //if search query ,set curpage =1; if it is first query, set curpage =1
        ((url.indexOf("?")>-1 && (url.indexOf("page=")=== -1)) ||(url===baseUrl))
        ? 1
        : Number(url.substr(url.length-1,1))
    )            
  };
   
  // for search box
  const [textBoxValue, setTextBoxValue] = useState("");
  const pressedSubmit = e => {
        e.preventDefault();        
        console.log(baseUrl+"?search="+textBoxValue);
        getbaseUrlWithAxios(baseUrl+"?search="+textBoxValue);
        setTextBoxValue("");
  };

  return (
    <div >
        <h1 class="text-center">People List</h1>
        <div >
          <form onSubmit={pressedSubmit} class="input-group mb-3" >           
              <input 
                  onChange={e => setTextBoxValue(e.target.value)}                
                  type="text" 
                  placeholder="Enter Name here...."
                  value={textBoxValue}
                  class="form-control"                  
              />
              <button class="btn btn-primary"  >
                  Search
              </button>            
          </form> 
        </div>    
    
        
        {count>0 ?  <h5 class="text-right">{count} records</h5>: <h5>No Records</h5>}

        <div class="btn-group" role="group" aria-label="Basic example">          
          {previous && <button type="button" class="btn btn-light "onClick={() => getbaseUrlWithAxios(previous)} >&laquo;</button>  }        
          {count>0 && <button type="button" class="btn btn-secondary">{currentPage}</button>}
          {next && <button type="button"  class="btn btn-light" onClick={() => getbaseUrlWithAxios(next)} >&raquo;</button>  }   
        </div>


        <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">ID</th>  
              <th scope="col">Name</th>
              <th scope="col"> Birth Year</th>
              <th scope="col">Eye Color</th>
              <th scope="col">Gender</th>
              <th scope="col">Hair Color</th>            
              <th scope="col">Height</th>
              <th scope="col">Mass</th>            
              <th scope="col">Skin Color</th>
              {/*<th scope="col">Home World</th>
              <th scope="col">Films</th>
              <th scope="col">Speices</th>
              <th scope="col">Starships</th>
              <th scope="col">Vehicles</th>
              <th scope="col">URL</th>     */}       
            </tr>
            </thead>
            <tbody>

         {count>0 && results.map(  (result,index) => {
            // get id
            const urlParts = result.url.split("/").filter(Boolean);
            const peopleId = urlParts[urlParts.length - 1];                
            
            return (    
              <tr class="table-primary" key={peopleId}>
              <td >{peopleId}</td>   
              <td>{result.name}</td>
              <td>{result.birth_year}</td>
              <td>{result.eye_color}</td>
              <td>{result.gender}</td>
              <td>{result.hair_color}</td>
              <td>{result.height}cm</td>
              <td>{result.mass}kg</td>          
              <td>{result.skin_color}</td>         
              {/*<td>{result.homeworld}</td>
              <td>{result.films}</td>
              <td>{result.species}</td>
              <td>{result.starships}</td>
              <td>{result.vehicles}</td>
              <td>{result.url}</td>*/}
            </tr>
            ); 
            })}    
            </tbody>
            </table>      
    </div>
  );
}

