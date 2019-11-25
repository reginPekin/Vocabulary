export const dropInputRefValues = (...refs) => {
  refs.forEach(ref => {
    if (ref.current && ref.current.value) ref.current.value = "";
  });
};

export const setBackgroundColor = partOfSpeech => {
  switch (partOfSpeech) {
    case "adv":
      return { backgroundColor: "var(--blue)" };
    case "noun":
      return { backgroundColor: "var(--red)" };
    case "verb":
      return { backgroundColor: "var(--green)" };
    case "pro":
      return { backgroundColor: "var(--dark-blue)" };
    case "conj":
      return { backgroundColor: "var(--orange)" };
    case "prep":
      return { backgroundColor: "var(--violet)" };
    case "inter":
      return { backgroundColor: "var(--dark-violet)" };
    case "adj":
      return { backgroundColor: "var(--yellow)" };
    default:
      return { backgroundColor: "var(--grey)" };
  }
};

export const shortSpeechOfPart = partOfSpeech => {
  switch (partOfSpeech) {
    case "adverb":
      return "adv";
    case "noun":
      return "noun";
    case "verb":
      return "verb";
    case "pronoun":
      return "pro";
    case "conjuction":
      return "conj";
    case "preposition":
      return "prep";
    case "interjection":
      return "inter";
    case "adjective":
      return "adj";
    default:
      return partOfSpeech;
  }
};
