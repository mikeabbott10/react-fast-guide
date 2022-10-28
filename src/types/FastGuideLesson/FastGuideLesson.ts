import { ReactNode } from "react";
import FastGuideTest from "../FastGuideTest";

type FastGuideLesson = {
    title: string,
    body: ReactNode,
    test: FastGuideTest
}

export default FastGuideLesson;