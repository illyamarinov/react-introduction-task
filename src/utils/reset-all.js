const resetAll = (items, onChunksChange) => {
  const tempItems = items.map((item) => {
    item.isSelected = false;
    item.isFavorite = false;
    return item;
  });

  tempItems.sort((first, second) => first.id - second.id);
  onChunksChange(tempItems);
};

export default resetAll;
