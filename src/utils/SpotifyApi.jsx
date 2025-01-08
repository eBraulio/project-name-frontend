export async function searchAlbumsByArtist(searchInput, accessToken) {
  const artistParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const artistResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchInput
      )}&type=artist`,
      artistParams
    );

    const artistData = await artistResponse.json();
    const artistID = artistData.artists?.items?.[0]?.id;

    if (!artistID) {
      throw new Error("Artist not found");
    }

    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=ES&limit=15`,
      artistParams
    );

    const albumsData = await albumsResponse.json();
    return albumsData.items;
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}
