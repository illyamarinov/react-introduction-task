const setSelectedFavorite = (items, sortChunks, changeState) => {
  items.forEach((item) => {
    if (item.selected) {
      item.favorite = true;
    }
  });
  sortChunks(items);

  changeState('chunks', items);
};

export default setSelectedFavorite;
