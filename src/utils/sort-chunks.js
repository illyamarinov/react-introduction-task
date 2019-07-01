const sortChunks = (items) => {
  items.sort((first, second) => (
    (first.favorite === second.favorite)
      ? 0
      : first.favorite ? -1 : 1));
};

export default sortChunks;
