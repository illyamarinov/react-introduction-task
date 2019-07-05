const setSelectedFavorite = (items, sortChunks, onChunksChange) => {
  items.forEach((item) => {
    if (item.selected) {
      item.favorite = true;
    }
  });
  sortChunks(items);
  onChunksChange(items);
};

export default setSelectedFavorite;
