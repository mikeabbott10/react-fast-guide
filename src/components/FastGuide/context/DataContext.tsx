import React from "react"
import { createContext, ReactNode, Reducer, useReducer } from "react";
import { FastGuideChapter, FastGuideLesson, FastGuideMain, FastGuideSection } from "../../../mytypes";
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
    points: number;
    setPoints: (n: number | ((val: number) => number)) => void;
    currentChapterIndex: number;
    currentSectionIndex: number;
    currentLessonIndex: number;
    setCurrentState: (obj: Partial<StateObject>) => void;
}

export type StateObject = {
    chapter: number | undefined, 
    section: number | undefined, 
    lesson: number | undefined
}

interface GuideState {
    chapter: number,
    section: number,
    lesson: number
}

const DataContext = createContext({} as AppContextInterface);

export const DataProvider = ({ guide, children } : DataProviderProps) => {
    const {width} = useWindowSize();
    const [currentGuideState, setCurrentGuideState] = useReducer<Reducer<GuideState, Partial<GuideState>>>(
        (currentGuideState, newState) => ({...currentGuideState, ...newState}),
        {chapter: 0, section: 0, lesson: 0}
    );
    const [points, setPoints] 
        = useLocalStorage<number>("points", 0);

    const setCurrentState= (obj : Partial<StateObject>) => {
        let chapter = currentGuideState.chapter, 
            section = currentGuideState.section, 
            lesson = currentGuideState.lesson;
        if(obj.chapter !== undefined)
            chapter = obj.chapter
        if(obj.section !== undefined)
            section = obj.section
        if(obj.lesson  !== undefined)
            lesson = obj.lesson

        setCurrentGuideState({ chapter, section, lesson });
    }

    const getCurrentFGChapter = () => {
        return guide.chapters[currentGuideState.chapter];
    }

    const getCurrentFGSection = () => {
        return guide.chapters[currentGuideState.chapter].sections[currentGuideState.section];
    }

    const getCurrentFGLesson = () => {
        return guide.chapters[currentGuideState.chapter].sections[currentGuideState.section].lessons[currentGuideState.lesson];
    }

    return (
        <DataContext.Provider value={{
            width, guide,
            getCurrentFGChapter, getCurrentFGSection, getCurrentFGLesson,
            points, setPoints,
            currentChapterIndex: currentGuideState.chapter, 
            currentSectionIndex : currentGuideState.section, 
            currentLessonIndex : currentGuideState.lesson,
            setCurrentState
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;