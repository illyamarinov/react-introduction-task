const unsetSelectedFavorite = (items, sortChunks, changeState) => {
  items.forEach((item) => {
    if (item.selected && item.favorite) {
      item.favorite = false;
    }
  });
  sortChunks(items);

  changeState('chunks', items);
};

export default unsetSelectedFavorite;
