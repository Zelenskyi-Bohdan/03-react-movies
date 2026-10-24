import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovie } from '../../services/movieService.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';

function App() {
    const [movies, setMovies] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSearch = async (query: string) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const moviesData = await fetchMovie(query);
            if (moviesData.length === 0) {
                toast.error('No movies found for your request.');
            }
            setMovies(moviesData);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
}

    return (
        <SearchBar onSearch={handleSearch} />
    );
}

export default App;
