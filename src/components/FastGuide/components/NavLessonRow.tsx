import React from "react";
import { useContext } from "react";
import { FastGuideLesson } from "../../../mytypes";
import DataContext from "../context/DataContext";

type NavLessonRowProps = {
    thisChapterIndex: number,
    thisSectionIndex: number,
    thisLessonIndex: number,
    lesson: FastGuideLesson
}

const NavLessonRow = ({thisChapterIndex, thisSectionIndex, thisLessonIndex, lesson} : NavLessonRowProps) => {
    const appCtx = useContext(DataContext);

    return (
        <li>
            <div className="fg-nav-container fg-nav-lesson-container">
                {appCtx.currentSectionIndex === thisSectionIndex && appCtx.currentChapterIndex === thisChapterIndex && appCtx.currentLessonIndex === thisLessonIndex ?
                    <span className="fg-marker" style={{backgroundColor: "#0070f3"}}></span> : <span className="fg-marker"></span> }
                <span className="fg-label" onClick={() => {
                    appCtx.setCurrentState({ chapter: thisChapterIndex, section: thisSectionIndex, lesson: thisLessonIndex })
                }}>
                    {appCtx.currentSectionIndex === thisSectionIndex && appCtx.currentChapterIndex === thisChapterIndex && appCtx.currentLessonIndex === thisLessonIndex ?
                        <strong>{lesson.title}</strong> : lesson.title}
                </span>
            </div>
        </li>
    )
}

export default NavLessonRow
