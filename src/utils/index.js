export const dropInputRefValues = (...refs) => {
  refs.forEach(ref => {
    if (ref.current && ref.current.value) ref.current.value = "";
  });
};

export const setBackgroundColor = partOfSpeech => {
  switch (partOfSpeech) {
    case "adverb":
      return { backgroundColor: "var(--blue)" };
    case "noun":
      return { backgroundColor: "var(--red)" };
    case "verb":
      return { backgroundColor: "var(--green)" };
    case "pronoun":
      return { backgroundColor: "var(--dark-blue)" };
    case "conjuction":
      return { backgroundColor: "var(--orange)" };
    case "preposition":
      return { backgroundColor: "var(--violet)" };
    case "interjection":
      return { backgroundColor: "var(--dark-violet)" };
    case "adjective":
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
