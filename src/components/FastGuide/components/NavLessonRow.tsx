import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { FastGuideLesson } from "../../../mytypes";

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
                {appCtx.currentSection === thisSectionIndex && appCtx.currentChapter === thisChapterIndex && appCtx.currentLesson === thisLessonIndex ?
                    <span className="fg-marker" style={{backgroundColor: "#0070f3"}}></span> : <span className="fg-marker"></span> }
                <span className="fg-label" onClick={() => {
                    appCtx.setCurrentState({ chapter: thisChapterIndex, section: thisSectionIndex, lesson: thisLessonIndex })
                }}>
                    {appCtx.currentSection === thisSectionIndex && appCtx.currentChapter === thisChapterIndex && appCtx.currentLesson === thisLessonIndex ?
                        <strong>{lesson.title}</strong> : lesson.title}
                </span>
            </div>
        </li>
    )
}

export default NavLessonRow
