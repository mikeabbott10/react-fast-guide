import React from "react";
import { ReactNode } from "react";

type NavChapterProps = {
    chapterTitle: string,
    sectionsList: ReactNode
}

const NavChapter = ({chapterTitle, sectionsList} : NavChapterProps) => {
    return (
        <div className="fg-nav-chapter">
            <h3 style={{textTransform: "uppercase", fontSize: ".8em", marginBottom:"12px"}}>
                {chapterTitle}
            </h3>
            <ul className="fg-ul">
                {sectionsList}
            </ul>
        </div>
    )
}

export default NavChapter