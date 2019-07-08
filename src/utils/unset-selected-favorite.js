import sortChunks from 'utils/sort-chunks';

const unsetSelectedFavorite = (items, onChunksChange) => {
  const tempItems = items.map((item) => {
    if (item.isSelected && item.isFavorite) {
      item.isFavorite = false;
    }
    return item;
  });
  onChunksChange(sortChunks(tempItems));
};

export default unsetSelectedFavorite;
