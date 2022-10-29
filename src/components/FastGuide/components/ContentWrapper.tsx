import React from "react";
import { ReactNode, useContext } from "react"
import DataContext from "../context/DataContext";
import LessonMarkButton from "./LessonMarkButton";

type ContentWrapperProps = {
    title: string,
    goTo: (index: number) => void;
    children: ReactNode
}

export const ContentWrapper = ({ title, goTo, children}: ContentWrapperProps) => {
    const {currentLessonIndex, getCurrentFGSection} = useContext(DataContext)
    const lessonMarks = []
    for (let i = 0; i < getCurrentFGSection().lessons.length; i++) {
        lessonMarks.push(<LessonMarkButton lessonNumber={i+1} key={i} onClick={goTo} isHighlighted={currentLessonIndex===i}/>)
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