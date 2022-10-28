import React from "react";
import { createContext, ReactNode, useState } from "react";
import { FastGuideChapter, FastGuideLesson, FastGuideMain, FastGuideSection } from "../../../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useWindowSize from "../hooks/useWindowSize";

type DataProviderProps = {
    guide: FastGuideMain,
    children: ReactNode
}

interface AppContextInterface {
    width: number | null;
    guide: FastGuideMain;
    getCurrentFGChapter: () => FastGuideChapter;
    getCurrentFGSection: () => FastGuideSection;
    getCurrentFGLesson: () => FastGuideLesson;
    points: number | null;
    setPoints: (n: number | ((val: number) => number)) => void;
    currentChapter: number;
    currentSection: number;
    currentLesson: number;
    setCurrentState: (obj: Partial<StateObject>) => void;
}

export type StateObject = {
    chapter: number | undefined, 
    section: number | undefined, 
    lesson: number | undefined
}

const DataContext = createContext({} as AppContextInterface);

export const DataProvider = ({ guide, children } : DataProviderProps) => {
    const {width} = useWindowSize();
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [currentLesson, setCurrentLesson] = useState(0);
    const [points, setPoints] 
        = useLocalStorage<number>("points", 0);

    const setCurrentState= (obj : Partial<StateObject>) => {
        if(obj.chapter !== undefined)
            setCurrentChapter(obj.chapter)
        if(obj.section !== undefined)
            setCurrentSection(obj.section)
        if(obj.lesson  !== undefined)
            setCurrentLesson(obj.lesson)
    }

    const getCurrentFGChapter = () => {
        return guide.chapters[currentChapter];
    }

    const getCurrentFGSection = () => {
        return guide.chapters[currentChapter].sections[currentSection];
    }

    const getCurrentFGLesson = () => {
        return guide.chapters[currentChapter].sections[currentSection].lessons[currentLesson];
    }

    return (
        <DataContext.Provider value={{
            width, guide,
            getCurrentFGChapter, getCurrentFGSection, getCurrentFGLesson,
            points, setPoints,
            currentChapter, currentSection, currentLesson,
            setCurrentState
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;