import React from "react"

type LessonMarkButtonProps = {
    lessonNumber: number,
    onClick: (index:number)=>void,
    isHighlighted: boolean
}

const LessonMarkButton = ({lessonNumber, onClick, isHighlighted} : LessonMarkButtonProps) => {
    return (
        <>
            {!isHighlighted && 
                <button onClick={()=>onClick(lessonNumber-1)} className="fg-btn fg-white-btn" style={{
                    padding: "0.25rem 0.8rem",
                    marginRight: ".5rem",
                    width: "2rem",
                    height: "2rem"
                }}>
                    {lessonNumber}
                </button>
            }
            {isHighlighted && 
                <button onClick={()=>onClick(lessonNumber-1)} className="fg-btn fg-blue-btn" style={{
                    padding: "0.25rem 0.8rem",
                    marginRight: ".5rem",
                    width: "2rem",
                    height: "2rem"
                }}>
                    {lessonNumber}
                </button>
            }
        </>
        
    )
}

export default LessonMarkButton
