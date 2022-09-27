import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "https://swapi.dev/api/starships";  //base url for get startships list

export const Starships = () => {
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
        <h1 class="text-center">Starship List</h1>
          
    
        { count>0 ?  <h5 class="text-right">{count} records </h5>: <h5>No Records</h5>}        
        
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
              <th scope="col">Model</th>
              <th scope="col">Starship Class </th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Cost In Credits </th>
              <th scope="col">Length</th>            
              <th scope="col">Crew</th>
              <th scope="col">Passengers </th>            
              <th scope="col">Max Atmosphering Speed </th>
              <th scope="col">Hyperdrive_Rating</th>
              <th scope="col">MGLT</th>
              <th scope="col">Cargoc Capacity </th>            
              <th scope="col">Consumables </th>
              {/*<th scope="col">Films</th>  
              <th scope="col">Pilots</th>  */}
            </tr>
            </thead>
            <tbody>

         {count>0 && results.map( (result,index) => {
            // get id
            const urlParts = result.url.split("/").filter(Boolean);
            const shipId = urlParts[urlParts.length - 1];            
            
            return (    
              <tr class="table-primary" key={shipId}>
              <td >{shipId}</td>   
              <td>{result.name}</td>
              <td>{result.model}</td>
              <td>{result.starship_class}</td>
              <td>{result.manufacturer}</td>
              <td>{result.cost_in_credits}</td>
              <td>{result.length}m</td>
              <td>{result.crew}</td>          
              <td>{result.passengers }</td>         
              <td>{result.max_atmosphering_speed }</td>
              <td>{result.hyperdrive_rating}</td>
              <td>{result.MGLT}</td>   
              <td>{result.cargo_capacity}kg</td>
              <td>{result.consumables}</td>
              {/*<td>{result.films}</td> -->  
              <td>{result.pilots}</td>   */}
            
            </tr>
            ); 
            })}    
            </tbody>
            </table>      
    </div>
  );
}

