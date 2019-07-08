import sortChunks from 'utils/sort-chunks';

const setSelectedFavorite = (items, onChunksChange) => {
  const tempItems = items.map((item) => {
    if (item.isSelected) {
      item.isFavorite = true;
    }
    return item;
  });

  onChunksChange(sortChunks(tempItems));
};

export default setSelectedFavorite;
