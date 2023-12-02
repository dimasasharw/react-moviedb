
const apiKey = 'b7002357efd051872e566d18e72e80ac'
const baseImageUrl = 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzAwMjM1N2VmZDA1MTg3MmU1NjZkMThlNzJlODBhYyIsInN1YiI6IjY1NjcyMThmYzJiOWRmMDEwMDRjYWEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZPTdjg4pK4kxcTWqPMr-H0RRTBJDFUfl54wUUlKfhqY'

export const options = {
    method: 'GET',
    params: { language: 'en-US', page: '1' },
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`
    }
};