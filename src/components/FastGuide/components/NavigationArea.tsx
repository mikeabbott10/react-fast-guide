import React from "react"
import { ReactElement, useContext, useEffect, useState } from "react"
import { FastGuideSection } from "../../../mytypes";
import DataContext from "../context/DataContext"
import NavChapter from "./NavChapter";
import NavLessonRow from "./NavLessonRow";
import NavSectionRow from "./NavSectionRow";
import TopCard from "./TopCard";

const NavigationArea = () => {
    const appCtx = useContext(DataContext);
    const [showMobileNavigation, setShowMobileNavigation] = useState(false);

    useEffect(() => {
        setShowMobileNavigation(false)
    }, [appCtx.currentChapterIndex, appCtx.currentSectionIndex, appCtx.currentLessonIndex])

    const navigationAreaList: ReactElement[] = [];
    let i = 0;
    let chapterIndex = 0;

    // get navigation area
    appCtx.guide.chapters.forEach((chapter: { sections: FastGuideSection[]; title: string; }) => {
        const thisChapterIndex = chapterIndex;

        let sectionIndex = 0;
        const thisChapterSectionsList: ReactElement[] = []
        chapter.sections.forEach(section => {
            const thisSectionIndex = sectionIndex;
            const thisSectionLessonsList: ReactElement[] = [];

            let lessonIndex = 0;
            section.lessons.forEach(lesson => {
                const thisLessonIndex = lessonIndex;
                thisSectionLessonsList.push(
                    <NavLessonRow
                        key={i++}
                        thisChapterIndex={thisChapterIndex}
                        thisSectionIndex={thisSectionIndex}
                        thisLessonIndex={thisLessonIndex}
                        lesson={lesson} />
                );
                lessonIndex++;
            });

            thisChapterSectionsList.push(
                <NavSectionRow
                    key={i++}
                    thisChapterIndex={thisChapterIndex}
                    thisSectionIndex={thisSectionIndex}
                    section={section}
                    thisSectionLessonsList={thisSectionLessonsList} />
            );
            sectionIndex++;
        });

        navigationAreaList.push(
            <NavChapter
                key={i++}
                chapterTitle={chapter.title}
                sectionsList={thisChapterSectionsList} />
        )
        chapterIndex++;
    });

    return (
        <>
            {/* desktop view */}
            {appCtx.width !== null && appCtx.width > 960 &&
                <div className="fg-navigation">
                    <TopCard/>
                    <div className="fg-navigation-area">
                        {navigationAreaList}
                    </div>
                </div>
            }

            {/* mobile view */}
            {appCtx.width !== null && appCtx.width <= 960 &&
                <div className="fg-navigation-mobile">
                    <div>
                        <div className="fg-navigation-area"
                            style={showMobileNavigation ? 
                                {} : { bottom: "100%" }
                        }>
                            {navigationAreaList}
                        </div>
                        <button type="button" onClick={() => setShowMobileNavigation(prev => { return !prev })}>
                            <span style={{ verticalAlign: "middle", marginRight: "7px", display: "inline-block", lineHeight: 0 }}>
                                <svg height="24" viewBox="0 0 24 24" width="24">
                                    <g fill="#111111"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
                                </svg>
                            </span>
                            <span style={{ 
                                display: "inline-block", 
                                maxWidth: "100%", 
                                overflow: "hidden", 
                                textOverflow: "ellipsis", 
                                whiteSpace: "nowrap", 
                                wordWrap: "normal" 
                            }}>
                                {appCtx.getCurrentFGSection().title}
                            </span>
                        </button>
                        <div className="fg-mobile-card">
                            <span
                                className="fg-points"
                                style={{ padding: 0, fontSize: ".8em", fontWeight: 600, marginRight: ".5rem" }}>
                                {appCtx.points === 0 && appCtx.guide.title}
                                {appCtx.points > 0 && `${appCtx.points} points`}
                            </span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default NavigationArea