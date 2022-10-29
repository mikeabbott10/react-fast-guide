import { useContext } from "react"
import DataContext from "../context/DataContext"
import { FastGuideTestAnswer } from "../../../mytypes";
import { useLocalStorage } from "../hooks/useLocalStorage"
import TestAnswer from "./TestAnswer"
import TestResult from "./TestResult"
import React from "react";


const Test = () => {
    const appCtx = useContext(DataContext);
    const currentLesson = appCtx.getCurrentFGLesson();

    const [questionAnswered, setQuestionAnswered] 
        = useLocalStorage<boolean>(`${appCtx.currentChapterIndex}-${appCtx.currentSectionIndex}-${appCtx.currentLessonIndex}q-a`, false);
    const [givenAnswer, setGivenAnswer] 
        = useLocalStorage<FastGuideTestAnswer>(`${appCtx.currentChapterIndex}-${appCtx.currentSectionIndex}-${appCtx.currentLessonIndex}a-i-a`, {text:"", isRight:false});

    const onAnswerClick = (answer:FastGuideTestAnswer) => {
        setQuestionAnswered(prevVal => {
            if(!prevVal){
                setGivenAnswer(answer);
                if(answer.isRight){
                    // add points
                    appCtx.setPoints((prevVal: number) => {
                        if(!currentLesson.test) return prevVal;
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
                    {currentLesson.test.answers.map((answer: { text: string; isRight: boolean; }) => 
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