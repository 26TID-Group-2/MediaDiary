export async function searchTvSeries(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(trimmed)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Errore durante la ricerca delle serie TV su TVmaze");
  }

  const data = await response.json();

  return data.map(({ show }) => {
    const year = show.premiered ? show.premiered.slice(0, 4) : "";
    const networkOrChannel =
      show.network?.name || show.webChannel?.name || "";

    return {
      id: show.id,
      title: show.name || "",
      creator: networkOrChannel,
      releaseYear: year,
      pictureUrl: show.image?.medium || show.image?.original || "",
      mediaType: "tv",
    };
  });
}