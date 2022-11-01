import React from "react"
import { useContext } from "react"
import DataContext from "../context/DataContext"
import Buttons from "./Buttons"
import { ContentWrapper } from "./ContentWrapper"
import Test from "./Test"

const Lessons = () => {
    const {currentLessonIndex, setCurrentState, getCurrentFGSection, getCurrentFGLesson} = useContext(DataContext);
    const section = getCurrentFGSection();
    const lesson = getCurrentFGLesson();

    const goToLesson = (index:number) => {
        setCurrentState({lesson: index})
    }

    const prevLesson = () => {
        setCurrentState({lesson: currentLessonIndex - 1})
    }

    const nextLesson = () => {
        setCurrentState({lesson: currentLessonIndex + 1})
    }
    

    return (
        <div style={{width:"100%"}}>
            <ContentWrapper 
                title={section.title} 
                goTo={goToLesson}
            >
              {lesson.body}
            </ContentWrapper>

            {lesson.test && <Test 
                key={getHash(JSON.stringify(lesson))} // key needed to differentiate lesson tests
            />}
            
            <Buttons 
                isFirstStep={currentLessonIndex===0} 
                isLastStep={currentLessonIndex===section.lessons.length-1} 
                onBack={prevLesson} 
                onNext={nextLesson}
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
