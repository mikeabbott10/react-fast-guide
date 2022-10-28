import React, { ReactElement } from "react";
import { ReactNode } from "react"
import LessonMarkButton from "./LessonMarkButton";

type ContentWrapperProps = {
    title: string,
    stepsNumber: number,
    currentStep: number,
    goTo: (index: number) => void;
    children: ReactNode
}

export const ContentWrapper = ({ title, stepsNumber, currentStep, goTo, children}: ContentWrapperProps) => {
    const lessonMarks : ReactElement[] = []
    for (let i = 0; i < stepsNumber; i++) {
        lessonMarks.push(<LessonMarkButton lessonNumber={i+1} key={i} onClick={goTo} isHighlighted={currentStep===i}/>)
    }

    return(
        <>
            <h2 style={{
                margin: ".8rem 0px 2rem 0px"
            }}>
                {title}
            </h2>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                {lessonMarks}
            </div>
            <div style={{marginTop:"2rem"}}>
                {children}
            </div>
        </>
    )
}