import { useEffect, useState } from "react";
import nations from "./nation-list";
import "../node_modules/flag-icons/css/flag-icons.css";
import "./App.css";

function App() { 
  const [nation, setNation] = useState([]);
  const [flag, setFlag] = useState({});
  const [score, setScore] = useState({ total: 0, correct: 0, incorrect: 0 });
  const [showAns, setShowAns] = useState(false);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(5);

  const generateRandomNations = () => {
    let countries = [];
    for (let i = 0; i < 4; i++) {
      const r = Math.floor(Math.random() * nations.length);
      countries.push(nations[r]);
    }
    setNation(countries);
    const selectedFlagIndex = Math.floor(Math.random() * 4);
    setFlag(countries[selectedFlagIndex]);
    // console.log(countries,countries[selectedFlagIndex]);
  };
  const generateNextNations = () => {
    generateRandomNations();
  };

  // to handle loader
  useEffect(() => {
    let id;
    if (showAns) {
      id = setInterval(() => {
        setLoading((l) => l - 1);
      }, 1000);
    } else {
      setLoading(5);
    }
    return () => clearInterval(id);
  }, [showAns]);

  useEffect(() => {
    generateRandomNations();
  }, []);
  function handleChoose(c) {
    setSelected(c);
    setShowAns(true);
    if (c.name === flag.name) {
      setScore({
        ...score,
        total: score.total + 5,
        correct: score.correct + 1,
      });
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
    }
    setTimeout(() => {
      setShowAns(false);
      generateNextNations();
    }, 5000);
  }
  return (
    <>
      <div className="App">
        <h1>Guess the Country Name</h1>
        <h2>
          Total Score = {score.total} ( +5 for each correct )<br></br>
          Correct = {score.correct} {","} {}
          Incorrect = {score.incorrect}
        </h2>
        {flag.name ? (
          <span className={`fi fi-${flag["alpha-2"].toLowerCase()}`}></span>
        ) : null}
        <div>
          {nation.map((country, index) => {
            return (
              <button
                disabled={showAns}
                className="option-btn"
                key={index}
                onClick={() => handleChoose(country)}
              >
                {country.name}
              </button>
            );
          })}
        </div>
        {showAns ? (
          flag.name === selected.name ? (
            <div>
              <h2 className="correct">That is Correct !!!</h2>
              <h3>Next Question Loading in {loading}...</h3>
            </div>
          ) : (
            <div>
              <h2 className="incorrect">Correct Ans was : {flag.name}</h2>
              <h3>Next Question Loading in {loading}...</h3>
            </div>
          )
        ) : null}
      </div>
    </>
  );
}

export default App;
