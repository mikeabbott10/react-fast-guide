import React from "react"
import { useContext, useEffect } from "react"
import DataContext from "../context/DataContext"
import { useMultistepContainer } from "../useMultistepContainer"
import Buttons from "./Buttons"
import { ContentWrapper } from "./ContentWrapper"
import Test from "./Test"

const Lessons = () => {
    const {currentLesson, setCurrentState, getCurrentFGSection} = useContext(DataContext);
    const section = getCurrentFGSection();

    const lessonsBodies = section.lessons.map(lesson=> {return lesson.body})

    const { steps: lessons, 
            currentStepIndex: currentLessonIndex, 
            step: currentLessonNode, 
            isFirstStep: isFirstLesson, 
            isLastStep: isLastLesson, 
            /*next: nextLesson, 
            back: prevLesson, */
            goTo: goToLesson 
        } 
    = useMultistepContainer(lessonsBodies)

    useEffect(() => {
        goToLesson(currentLesson)
    }, [currentLesson])

    const myGoToLesson = (index:number) => {
        setCurrentState({lesson: index})
    }

    const myPrevLesson = () => {
        setCurrentState({lesson: currentLesson - 1})
    }

    const myNextLesson = () => {
        setCurrentState({lesson: currentLesson + 1})
    }
    

    return (
        <div style={{width:"100%"}}>
            <ContentWrapper 
                title={section.title} 
                stepsNumber={lessons.length} 
                currentStep={currentLessonIndex} 
                goTo={myGoToLesson}
            >
              {currentLessonNode}
            </ContentWrapper>

            {<Test 
                currentLesson={section.lessons[currentLessonIndex]} 
                key={getHash(JSON.stringify(section.lessons[currentLessonIndex]))}
            />}
            
            <Buttons 
                isFirstStep={isFirstLesson} 
                isLastStep={isLastLesson} 
                onBack={myPrevLesson} 
                onNext={myNextLesson}
            />
        </div>
    )
}

function getHash(input: string){
    var hash = 0, len = input.length;
    for (var i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
    }
    return hash;
}

export default Lessons
