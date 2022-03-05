import React, { useState, useEffect } from "react";
import "./App.css";
import { Hangman } from "./components";
import getAnswer from "./utils";

function App() {
  const [errors, setErrors] = useState(0);
  const [answer, setAnswer] = useState(getAnswer);
  const [gameOver, setGameOver] = useState(true);
  const [userKey, setUserKey] = useState([]);
  const [invisibleAnswer, setInvisibleAnswer] = useState([]);

  const StartGame = () => {
    setGameOver();
    setInvisibleAnswer(
      answer
        .split("")
        .map((letter) => (userKey.includes(letter) ? letter : "_ "))
    );
  };

  const Reset = () => {
    setGameOver(false);
    window.location.reload();
  };

  useEffect(() => {
    errors === 6 && window.confirm("YOU LOST!!TRY AGAIN??") && Reset();
    setInvisibleAnswer(
      answer
        .split("")
        .map((letter) => (userKey.includes(letter) ? letter : "_ "))
    );
  }, [userKey]);

  useEffect(() => {
    invisibleAnswer.join("") === answer &&
      window.confirm("YOU WON !!") &&
      Reset();
  }, [invisibleAnswer]);

  const GenerateKeyboard = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        className="bg-blue-400 w-full h-full px-4 py-3 disabled:opacity-30 rounded-lg"
        onClick={(e) => PushUserKey(e)}
        key={letter}
        value={letter}
        disabled={userKey.includes(letter)}
      >
        {letter}
      </button>
    ));
  };

  const PushUserKey = (e) => {
    setUserKey((currentArray) => [...currentArray, e.target.value]);
    setErrors(answer.includes(e.target.value) ? errors + 0 : errors + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center text-white bg-gray-800 w-screen h-screen">
      {gameOver ? (
        <button
          className="bg-gray-900 text-2xl font-semibold p-12 rounded-full"
          onClick={() => StartGame()}
        >
          Play
        </button>
      ) : (
        <>
          <div className="flex md:justify-around pt-7">
            <Hangman errors={errors} />
            <span>Wrong Answers : {errors}</span>
          </div>
          <div className="flex flex-col items-center ">
            <span className=" font-bold text-4xl my-4">{invisibleAnswer}</span>
            <div className="grid gap-1 items-center grid-cols-9 mt-5">
              {GenerateKeyboard()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
