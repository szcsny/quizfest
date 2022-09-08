import React from "react"

export default function Question(props){
    const [answers, setAnswers] = React.useState(props.answers);
    
    React.useEffect(() => {
        setAnswers(prev => {
            let newArr = [];
            for(let i=0; i<prev.length; i++){
                let index = Math.floor(Math.random()*4)
                newArr.splice(index, 0, prev[i])
            }
            return newArr;
        })
    }, [])
    
    function getClassName(item){
        let selected = props.selectedAnswers[props.id]
        if(props.isOver){
            if(item === props.correctAnswer){
                return 'answer-correct'
            }
            else if(item === selected){
                return 'answer-incorrect'
            }
        }
        else {
            if(item === selected){
                return 'answer-clicked'
            }
            else {
                return 'answer'
            }
        }
    }
      
    const answerElements = answers.map(item => {
        return <button
            key={item}
            className={getClassName(item)}
            onClick={() => props.saveSelectedAnswer(props.id, item)}
            >
                {atob(item)}
        </button>
    })
    
    return <div className="question-wrapper">
                <p className="question">{props.question}</p>
                {answerElements}
            </div>
}