import Words from "./data/Words";

const getAnswer = () => {
  return Words[Math.floor(Math.random() * Words.length)];
};

export default getAnswer;
