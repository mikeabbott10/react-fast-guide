import React from "react";
import { createContext, ReactNode, Reducer, useEffect, useReducer } from "react";
import { FastGuideChapter, FastGuideLesson, FastGuideMain, FastGuideSection } from "../../../mytypes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useReactHash from "../hooks/useReactHash";
import useWindowSize from "../hooks/useWindowSize";

type DataProviderProps = {
    guide: FastGuideMain, 
    enableHistory: boolean,
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

export const DataProvider = ({ guide, enableHistory, children } : DataProviderProps) => {
    const hash = useReactHash();

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

        if(enableHistory)
            window.location.hash = `${chapter}-${section}-${lesson}`
        else
            setCurrentGuideState({ chapter, section, lesson });
    }

    const isHashValid = (hash:string) => {
        let splitted_hash = hash.split('-');
        if(splitted_hash.length!=3) return;
        let chapter = Number(splitted_hash[0].substring(1));
        let section = Number(splitted_hash[1]);
        let lesson = Number(splitted_hash[2]);
        if(isNaN(chapter) || isNaN(section) || isNaN(lesson)) return false;
        if(chapter < 0 || chapter >= guide.chapters.length) return false;
        if(section < 0 || section >= guide.chapters[chapter].sections.length) return false;
        if(lesson < 0 || lesson >= guide.chapters[chapter].sections[section].lessons.length) return false;
        return { chapter, section, lesson };
    }

    useEffect(()=>{
        if(!enableHistory) return;
        try{
            let nextState = isHashValid(hash);
            if(!nextState) return;
            setCurrentGuideState(nextState);
        }catch(err){
            console.error(err)
        }
    }, [hash])

    useEffect(()=>{
        if(!enableHistory) return;
        let nextState = isHashValid(hash);
        if(!nextState){
            window.location.hash = `0-0-0`;
            return;
        }
        setCurrentGuideState(nextState);
    }, []);

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