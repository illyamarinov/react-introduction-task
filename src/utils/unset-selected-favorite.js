const unsetSelectedFavorite = (items, sortChunks, onChunksChange) => {
  items.forEach((item) => {
    if (item.selected && item.favorite) {
      item.favorite = false;
    }
  });
  sortChunks(items);
  onChunksChange(items);
};

export default unsetSelectedFavorite;
