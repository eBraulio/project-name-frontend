//Spotify Authentication API

export const BASE_URL = import.meta.env.VITE_SPOTIFY_BASE_URL;

export const authParamSpotify = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body:
    "grant_type=client_credentials&client_id=" +
    import.meta.env.VITE_SPOTIFY_CLIENT_ID +
    "&client_secret=" +
    import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
};

export const fetchSpotifyToken = async () => {
  try {
    const response = await fetch(BASE_URL, authParamSpotify);
    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    throw error;
  }
};
