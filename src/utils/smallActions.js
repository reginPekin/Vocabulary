export const setSearchText = searchText => {
  return {
    type: "CHANGE_SEARCH_TEXT",
    searchText
  };
};

export const getCurrentFolderId = history => {
  const currentFolderLink = history.location.pathname;

  return currentFolderLink.slice(1, currentFolderLink.indexOf("/", 2));
};

export const isSuitable = (searchText, folder) => {
  if (
    !searchText ||
    folder.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  )
    return true;
  else return false;
};
