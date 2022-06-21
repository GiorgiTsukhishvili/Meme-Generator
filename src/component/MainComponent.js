import React, { useEffect, useState } from "react";

import "./MainComponent.css";

function MainComponent() {
  const [state, setState] = useState({
    topText: "",
    bottomText: "",
    img: "",
  });

  const [memes, setMemes] = useState();

  useEffect(() => {
    async function getMeme() {
      const data = await fetch("https://api.imgflip.com/get_memes");
      const meme = await data.json();
      const memeInfo = meme.data.memes;

      setMemes(memeInfo);
    }

    getMeme();
  }, []);

  function getMemeImage() {
    const random = Math.floor(Math.random() * memes.length);
    const memeUrl = memes[random].url;
    setState({ ...state, img: memeUrl });
  }

  function updateText(evt) {
    const val = evt.target.value;
    const name = evt.target.name;
    setState({ ...state, [name]: val });
  }

  function clearText() {
    setState({ ...state, topText: "", bottomText: "" });
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="form--input"
          placeholder="Top text"
          onChange={(evt) => updateText(evt)}
          value={state.topText}
          name="topText"
        ></input>
        <input
          type="text"
          className="form--input"
          placeholder="Bottom text"
          onChange={(evt) => updateText(evt)}
          value={state.bottomText}
          name="bottomText"
        ></input>
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image
        </button>
        <button className="form--button" onClick={clearText}>
          Clear Text
        </button>

        <div className="form--content">
          <h1 className="text-top">{state.topText}</h1>
          <img src={state.img} className="form--image"></img>
          <h1 className="text-bottom">{state.bottomText}</h1>
        </div>
      </div>
    </main>
  );
}

export default MainComponent;
