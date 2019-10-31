export const setSearchText = searchText => {
  return {
    type: "CHANGE_SEARCH_TEXT",
    searchText
  };
};

export const getCurrentFolderId = currentFolderLink => {
  return currentFolderLink.slice(5);
};

export const isSuitable = (searchText, folder) => {
  if (
    !searchText ||
    folder.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  )
    return true;
  else return false;
};
