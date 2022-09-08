import React from "react"
import Question from "./Question"

export default function App(){
    const [questions, setQuestions] = React.useState([]);
    const [playing, setPlaying] = React.useState(false);
    const [correctAnswers, setCorrectAnswers] = React.useState([]);
    const [selectedAnswers, setSelectedAnswers] = React.useState({});
    const [result, setResult] = React.useState(0);
    const [gameOver, setGameOver] = React.useState(false);
    
    React.useEffect(() => {
        if(!gameOver){
            fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        }
    }, [gameOver])
      
    function newGame(){
        setResult(0);
        setGameOver(false);
        setPlaying(true);
        setCorrectAnswers(() => {
            return questions.map(item => {
                return item.correct_answer;
            })
        });
    }
    
    function saveSelectedAnswer(questionId, id){
        setSelectedAnswers(prev => {
            return {
                ...prev,
                [questionId]: id
            }
        })
    }
    
    function checkAnswers(){
        let counter = 0;
        const myAnswers = Object.values(selectedAnswers);
        for(let i=0; i<myAnswers.length; i++){
            const item = myAnswers[i];
            if(correctAnswers.find(obj => obj === item)){
                counter++
            }
        }
        setResult(counter);
        setGameOver(true);
    }
    
    const questionElements = questions.map(item => { 
        return <Question 
            key={item.question}
            id={item.question}
            question={atob(item.question)}
            answers={[item.correct_answer, ...item.incorrect_answers]}
            correctAnswer={item.correct_answer}
            selectedAnswers={selectedAnswers}
            saveSelectedAnswer={saveSelectedAnswer}
            isOver={gameOver}
        />
    })
    
    const buttonElement = gameOver ?
            <button onClick={newGame} className="check-btn">New Game</button> :
            <button onClick={() => checkAnswers()} className="check-btn">Check answers</button>
    
    return (
        <main>
            {playing &&
                <div className="trivia-wrapper">
                    <h1 className="title">Quizfest</h1>
                    {questionElements}
                    {gameOver && <p>You have {result}/5 correct answers!</p>}
                    {buttonElement}
                </div>
            }
            {!playing &&
                <div className="wrapper">
                    <h1 className="title">Quizfest</h1>
                    <h2 className="description">A trivia game for all ages</h2>
                    <button className="play-btn" onClick={newGame}>Play</button>
                </div>
            }
        </main>
    )
}