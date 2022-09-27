import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "https://swapi.dev/api/planets";  //base url for get planets list

export const Planets = () => {
  const [results, setResults] = useState([]);
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState();


  useEffect(() => {    
      getbaseUrlWithAxios(baseUrl);   
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
        //if search query ,set curpage =1; if first query, set curpage =1
        ((url===baseUrl))
        ? 1
        : Number(url.substr(url.length-1,1))
    )   
    
         
  };
   
 

  return (
    <div >
        <h1 class="text-center">Planet List</h1>
          
    
        { count>0 ?  <h5 class="text-right">{count} records</h5>: <h5>No Records</h5>}
        
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
              <th scope="col">Diameter</th>
              <th scope="col">Rotation Period</th>
              <th scope="col">Orbital Period</th>
              <th scope="col">Gravity</th>            
              <th scope="col">Population</th>
              <th scope="col">Climate</th>            
              <th scope="col">Terrain</th>
              <th scope="col">Surface Water</th>
              {/*<th scope="col">Residents</th>
              <th scope="col">Films</th>             
              <th scope="col">URL</th>   */}         
            </tr>
            </thead>
            <tbody>

         {count>0 && results.map( (result,index) => {
            // get id
            const urlParts = result.url.split("/").filter(Boolean);
            const planetId = urlParts[urlParts.length - 1];

            
            return (    
              <tr class="table-primary" key={planetId}>
              <td >{planetId}</td>   
              <td>{result.name}</td>
              <td>{result.diameter} km</td>
              <td>{result.rotation_period} hours</td>
              <td>{result.orbital_period} days</td>
              <td>{result.gravity}G</td>
              <td>{result.population}</td>
              <td>{result.climate}</td>          
              <td>{result.terrain}</td>         
              <td>{result.surface_water}%</td>
              {/*<td>{result.residents}</td>
              <td>{result.films}</td>           
              <td>{result.url}</td>*/}
            </tr>
            ); 
            })}    
            </tbody>
            </table>      
    </div>
  );
}

