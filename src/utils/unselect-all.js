const unselectAll = (items, changeState) => {
  items.forEach((item) => {
    item.selected = false;
  });

  changeState('chunks', items);
};

export default unselectAll;
