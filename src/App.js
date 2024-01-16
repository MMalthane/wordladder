
import React, { useState, useEffect , useCallback} from "react";
import Wordladders from "./wordLadder.json";
import ScrollableWordLadder from "./components/scrollableLadder"
import "./App.css";
import loader from './images/loading.gif';


const App = () => {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [wordLadder, setWordLadder] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleScroll = useCallback(() => {
    console.log("scrolling123");
  }, []);

  
  useEffect(() => {
    const isValidInput =
      word1.length > 0 &&
      word2.length > 0 &&
      word1.length === word2.length &&
      word1 !== word2 &&
      !isCalculating  && word1.match(/[a-zA-Z]+/) && word2.match(/[a-zA-Z]+/)

    if ((/^0|[1-9]\d*$/).test(word1) && (/^0|[1-9]\d*$/).test(word2)) {
      setShowModal(true);
      setIsButtonActive(false);
    } else {
      setShowModal(false);
      setIsButtonActive(false);
    }
    setIsButtonActive(isValidInput); 
  }, [word1, word2, isCalculating]);


  const handleSolveClick = () => {
    setIsCalculating(true);
    // Simulating a delayed calculation
    setTimeout(() => {
      setIsCalculating(false);
      // Simulating a successful calculation
      const ladder = Wordladders && Wordladders.map((wordLadder) => {
                    return (
                      <p key={wordLadder.id}>
                        {wordLadder.word}
                      </p>
                    );
        });
      setWordLadder(ladder);
      setWord1("")
      setWord2("")
    }, 1000);
  };

  const handleInputChange = (input, value) => {
        if (wordLadder.length > 0){
          setWordLadder([]);
        } 
        if (input === "word1") {
          setWord1(value);
        } else if (input === "word2") {
          setWord2(value);
        
        }

  };

  const handleModalClose = () => {
    setErrorMessage("Sorry, No word ladder found");
      setShowModal(false);
      setIsButtonActive(true)
      setWord1("")
      setWord2("")
  };

  return (
    <div className="inputWord">
      <h1>Generate Word Ladder</h1>
      <label> first word </label>
        <input
          type="text"
          className="input1"
          value={word1}
          label="word 1"
          onChange={(e) => handleInputChange("word1", e.target.value.trim())}
          required pattern="[a-zA-Z]+" />
        <label> second word</label>
        <input
          type="text"
          className="input2"
          value={word2}
          label="word2"
          onChange={(e) => handleInputChange("word2", e.target.value.trim())}
          required pattern="[a-zA-Z]+" />
        <button
          className="solveButton"
          onClick={handleSolveClick}
          disabled={!isButtonActive}>
          Solve
        </button>

      {isCalculating && (<div> <img className="loader" width={50} height={50} src={loader} alt="laoder"/></div>) }
                  {wordLadder.length > 0 && (
                    <div  className="wordladder"> 
                    <h3>Word Ladder</h3>
                    <ScrollableWordLadder wordLadder={wordLadder} onScroll={handleScroll}/>
                    </div>
                    )
                  }
                  {   showModal && (
                        <div className="popupModal">
                          <div className="model-content"> 
                          <div>{errorMessage}</div>
                          <button className="closeButton" onClick={handleModalClose}>Close</button>
                          </div>
                        </div>
                      )
                  }      
    </div>
  );
};



export default App;
