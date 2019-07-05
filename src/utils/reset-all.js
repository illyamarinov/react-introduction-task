const resetAll = (items, onChunksChange) => {
  items.forEach((item) => {
    item.selected = false;
    item.favorite = false;
  });

  items.sort((first, second) => first.id - second.id);
  onChunksChange(items);
};

export default resetAll;
