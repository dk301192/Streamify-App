import React from 'react';
import { FcRating } from "react-icons/fc";
import { FaStar } from "react-icons/fa";


function MovieImage({ link, movieName }) {
    if (link!=null && link!=undefined && link!='') {
        console.log("link :"+link);

      return <img  src={link} alt={movieName} className='img-movie'/>
    }
    console.log("non link :"+link);

    return <img src='https://incakoala.github.io/top9movie/film-poster-placeholder.png' className='img-movie' alt={movieName} />

  }

const MovieCard = ({movie}) => {
    return (
        <div className='card movie-card'>
            <div className='card-body movie-card-body'>
                <MovieImage key={movie.id} link={movie.image_link} movieName={movie.title}/>
                <div className='px-3'>
                <h6 className='card-title pt-2'>{movie.title}</h6>
                <p className='card-text text-secondary'><span ><FaStar color='yellow' /></span><span className='rating'>{movie.rating}</span></p>
                <p className='card-text'>Genre:{movie.genre_name}</p>
                </div>
            </div>
        </div>
    )

}

export default MovieCard;