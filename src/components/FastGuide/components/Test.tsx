import React from "react"
import { useContext } from "react"
import DataContext from "../context/DataContext"
import { FastGuideLesson, FastGuideTestAnswer } from "../../../types";
import { useLocalStorage } from "../hooks/useLocalStorage"
import TestAnswer from "./TestAnswer"
import TestResult from "./TestResult"

type NewType = {
    currentLesson: FastGuideLesson
}

const Test = ({currentLesson}: NewType) => {
    const appCtx = useContext(DataContext);

    const [questionAnswered, setQuestionAnswered] 
        = useLocalStorage<boolean>(`${appCtx.currentChapter}-${appCtx.currentSection}-${appCtx.currentLesson}q-a`, false);
    const [givenAnswer, setGivenAnswer] 
        = useLocalStorage<FastGuideTestAnswer>(`${appCtx.currentChapter}-${appCtx.currentSection}-${appCtx.currentLesson}a-i-a`, {text:"", isRight:false});

    const onAnswerClick = (answer:FastGuideTestAnswer) => {
        setQuestionAnswered(prevVal => {
            if(!prevVal){
                setGivenAnswer(answer);
                if(answer.isRight){
                    // add points
                    appCtx.setPoints((prevVal: number) => {
                        return prevVal + currentLesson.test.points;
                    })
                }
            }
            return true;
        });

        
    }

    let i = 0; // keys
    return (
        <>
            {currentLesson.test &&
                <div className="fg-test-container">
                    <p>
                        <strong>Quick Review: </strong> {currentLesson.test.question}
                    </p>
                    {currentLesson.test.answers.map(answer => 
                        <TestAnswer 
                            key={i++}
                            answer={answer}
                            handleClick={() => onAnswerClick(answer)}
                            disabled={questionAnswered}
                            highlighted={questionAnswered && givenAnswer.text === answer.text}
                        />
                    )}
                    {questionAnswered && 
                        <TestResult answerIsRight={givenAnswer.isRight}/>
                    }
                </div>
            }
        </>
    )
}

export default Test