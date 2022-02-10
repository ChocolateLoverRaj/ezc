interface Reader {
  getNextChar: () => string;
  doneWithCurrentChar: () => void;
}

export default Reader;
