const resetAll = (items, changeState) => {
  items.forEach((item) => {
    item.selected = false;
    item.favorite = false;
  });

  items.sort((first, second) => first.id - second.id);

  changeState('chunks', items);
};

export default resetAll;
