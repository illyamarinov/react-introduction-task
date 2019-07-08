const sortChunks = (items) => {
  const sorted = items.slice();
  sorted.sort((first, second) => {
    if (first.isFavorite === second.isFavorite) {
      return 0;
    }

    if (first.isFavorite) {
      return -1;
    }

    return 1;
  });

  return sorted;
};

export default sortChunks;
