const unselectAll = (items, onChunksChange) => {
  items.forEach((item) => {
    item.selected = false;
  });
  onChunksChange(items);
};

export default unselectAll;
