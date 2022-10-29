import FastGuideLink from "../FastGuideLink"
import FastGuideChapter from "../FastGuideChapter"

type FastGuideMain = {
    title: string,
    cardLink?: FastGuideLink,
    chapters: FastGuideChapter[]
}

export default FastGuideMain