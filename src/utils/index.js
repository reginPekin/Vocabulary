export const dropInputRefValues = (...refs) => {
  refs.forEach(ref => {
    if (ref.current && ref.current.value) ref.current.value = "";
  });
};

export const setBackgroundColor = partOfSpeech => {
  switch (partOfSpeech) {
    case "adv":
      return { borderBottom: "3px solid var(--blue)" };
    case "noun":
      return { borderBottom: "3px solid var(--red)" };
    case "verb":
      return { borderBottom: "3px solid var(--green)" };
    case "pro":
      return { borderBottom: "3px solid var(--dark-blue)" };
    case "conj":
      return { borderBottom: "3px solid var(--orange)" };
    case "prep":
      return { borderBottom: "3px solid var(--violet)" };
    case "inter":
      return { borderBottom: "3px solid var(--dark-violet)" };
    case "adj":
      return { borderBottom: "3px solid var(--yellow)" };
    default:
      return { borderBottom: "3px solid var(--grey)" };
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
