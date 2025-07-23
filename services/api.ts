export const TMDB_CONFIG = {
    BASE_URL:  'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers : {
        accept: 'applicatio/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ( { query }: { query: string }) => {
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity_desc`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers
    })

    if(!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', response?.statusText)
    }

    return await response.json()
}

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: "GET",
            headers: TMDB_CONFIG.headers
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch movie details', response?.statusText);
        }

        return await response.json() as MovieDetails;

    }catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}