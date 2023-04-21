import {useEffect, useState} from "react";
import './App.css';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=c133893e';

const movie1 = {
    Title: 'Star Wars',
    Year: '2019',
    Poster: 'N/A',
    Type : 'movie',
    imdbId : 'tt2345'
};

const App = () => {
    const[movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Star Wars');
    }, []);

    return(
        <div className="app">
            <h1>Movie Land</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => searchMovies(searchTerm)}>Search</button>
            </div>

            {
                movies.length > 0 
                    ? <div className="container">
                        { movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                    : <div className = "empty">
                        <h2>No movies found</h2>
                    </div>
            }
            
        </div>
    )
}

export default App;