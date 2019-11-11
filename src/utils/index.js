export const dropInputRefValues = (...refs) => {
  refs.forEach(ref => {
    if (ref.current && ref.current.value) ref.current.value = "";
  });
};
