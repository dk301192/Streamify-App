import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { IoSearchOutline } from "react-icons/io5";
import './LoginForm.css';

const Movies = () => {
    const[movies,setMovies] = useState([]);
    const[error, setError] = useState('');
    const[searchTerm,setSearchTerm] = useState('');
    const[buttonClicked, setButtonClicked] = useState(false);
    const[all,title,rating,genere] = ["All","Title","Rating","Genere"];
    const[searchBy,setSearchBy]=useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for progress dialog
    
    //setSearchBy(all);

    var url = "";
    
    const fetchMovies = async() =>{
        setIsLoading(true);
        try{
                const response = await fetch('http://localhost:3000/movies');
            const data = await response.json();
            setError("");

            setMovies(data);


        }
        catch(error){
            console.log('Error fetching data', error);
            setMovies([]);
            setError("Movies not found");
        }finally{
            setIsLoading(false);
        }
    }

 
    const fetchMovieByFilter = async() => {
        try{
            setIsLoading(true);

            if(searchTerm==null || searchTerm==""){                         
                fetchMovies();

            }else
            {
            switch(searchBy){
            case title : url ='http://localhost:3000/movies/search/title';
            break;
            case rating : url ='http://localhost:3000/movies/search/rating';
            break;
            case genere : url ='http://localhost:3000/movies/search/genre';
            break;
            case all :url='http://localhost:3000/movies/search/all';
            break;
            default : url='http://localhost:3000/movies/search/all';
            break;


            }

            const response = await axios.get(url,{
                params:{
                    searchText:searchTerm
                }
            });
            setError("");

            setMovies(response.data);


        }
            
          
        }  
        
        catch(e){
            console.log(e);
            setMovies([]);
            setError("Movies not found");        }
        finally{
            setIsLoading(false);

        }

    }

    const handleChange = (event)=>{
        setSearchTerm(event.target.value);
        setButtonClicked(true);
    }
    const handleButtonClick = (filter) => {
        setSearchBy(filter);
        setButtonClicked(true);

    }

    useEffect(() => {
        fetchMovies();
    },[]);

    useEffect(() => {
        if(buttonClicked){
            fetchMovieByFilter();
            setButtonClicked(false)
        }        
    },[buttonClicked])

    return(
       
        <div className='compo-main-div'>
         <form>
         <div className="d-flex alig-items-center justify-content-center m-5 ">
            <div className="input-group rounded-circle">
            <button className="btn btn-outline-secondary dropdown-toggle p-3"  type="button" data-bs-toggle="dropdown" aria-expanded="false">{searchBy}</button>
           <ul class="dropdown-menu">
            <li className='filter-type'><a class="dropdown-item" onClick={() => handleButtonClick(all)}>{all}</a></li>
            <li className='filter-type'><a class="dropdown-item" onClick={() => handleButtonClick(title)}>{title}</a></li>
            <li className='filter-type'><a class="dropdown-item" onClick={() => handleButtonClick(rating)}>{rating}</a></li>
            <li className='filter-type'><a class="dropdown-item" onClick={() => handleButtonClick(genere)}>{genere}</a></li>
          </ul>
         <input type="text" className="form-control p-3 " aria-label="Text input with dropdown button" 
        value={searchTerm}
        onChange={handleChange}/>
        <button class="btn btn-secondary p-3" type="button" id="button-addon2"><IoSearchOutline /></button>
          </div>
        </div>
        
         </form>
         {searchTerm!=''?
         (<h1 className='text-secondary text-center'>Search <span>"{searchTerm}"</span></h1>)
         :(<div className='text-secondary text-center'><h1>Search Streamify
            </h1><h5>Search Streamify by typing a word or phrase in the search box at the top of this page.</h5></div>)
         }
        {searchBy!='' &&( <div className='v1'><h3>{searchBy}</h3></div>)}

        {error && <div  className='text-secondary mt-3 text-center h3' role='alert'>{error}</div>}

        <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
    <div className='modal-content'>
      <div className='loader'></div>
    </div>
  </div>
           {movies && (
                <div className='movie-list'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

        </div>

    )
}
export default Movies;