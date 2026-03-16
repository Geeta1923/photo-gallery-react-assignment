const PhotoCard = ({ photo, favourites, dispatch }) => {
  const isFav = favourites.includes(photo.id);

  return (
    <div className={`bg-white shadow rounded overflow-hidden transition transform hover:scale-105 ${isFav ? "border-4 border-red-400" : ""}`}>
      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full h-60 object-cover"
      />

      <div className="p-4 flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">{photo.author}</p>

        <button
          onClick={() =>
            dispatch({
              type: "TOGGLE_FAV",
              payload: photo.id,
            })
          }
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;