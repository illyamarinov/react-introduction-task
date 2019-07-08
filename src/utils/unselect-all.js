const unselectAll = (items, onChunksChange) => {
  onChunksChange(items.map((item) => {
    item.isSelected = false;
    return item;
  }));
};

export default unselectAll;
