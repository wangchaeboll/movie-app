// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWM0MTU3OWYzYTMyNzU3Y2IwMzJmMDIwNjJmYWM4YyIsIm5iZiI6MTc1MzA2NDM4MS4wMSwic3ViIjoiNjg3ZGEzYmQzZjY3Y2ZkN2FhNTVjZTEyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Bu4QqgfVkjDgT_TIt9bKJmZJXyX8rGqJxjvmaIQmVm8'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

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