import { ReactNode, useContext } from "react"
import DataContext from "../context/DataContext"
import { FastGuideSection } from "../../../mytypes";
import React from "react";

type NavSectionRowProps = {
    thisChapterIndex: number,
    thisSectionIndex: number,
    section: FastGuideSection,
    thisSectionLessonsList: ReactNode
}

const NavSectionRow = ({thisChapterIndex, thisSectionIndex, section, thisSectionLessonsList} : NavSectionRowProps) => {
    const appCtx = useContext(DataContext);
    
    return (
        <li>
            <div className="fg-nav-container fg-nav-section-container">
                {appCtx.currentSectionIndex === thisSectionIndex && appCtx.currentChapterIndex === thisChapterIndex ?
                    <span className="fg-marker" style={{backgroundColor: "#0070f3"}}></span> : <span className="fg-marker"></span> }
                <span className="fg-label" onClick={() => {
                    appCtx.setCurrentState({ chapter: thisChapterIndex, section: thisSectionIndex, lesson: 0 })
                }}>
                    {appCtx.currentSectionIndex === thisSectionIndex && appCtx.currentChapterIndex === thisChapterIndex ?
                        <strong>{section.title}</strong> : section.title}
                </span>
            </div>
            <ul className="fg-ul inner">
                {appCtx.currentChapterIndex===thisChapterIndex && appCtx.currentSectionIndex===thisSectionIndex && thisSectionLessonsList}
            </ul>
        </li>
    )
}

export default NavSectionRow