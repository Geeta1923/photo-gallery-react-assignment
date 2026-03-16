import { useCallback, useMemo, useReducer, useState, useEffect } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouritesReducer } from "../reducer/favouritesReducer";
import PhotoCard from "./PhotoCard";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

  if (error) {
  return (
    <p className="text-center text-red-500 text-lg mt-10">
      Failed to load photos: {error}
    </p>
  );
}

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search by author..."
        value={search}
        onChange={handleSearch}
        className="w-full p-3 border rounded-lg shadow-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.length > 0 ? (
  filteredPhotos.map((photo) => (
    <PhotoCard
      key={photo.id}
      photo={photo}
      favourites={favourites}
      dispatch={dispatch}
    />
  ))
) : (
  <p className="text-center col-span-4">No matching author found</p>
)}
          
        
      </div>
    </div>
  );
};

export default Gallery;