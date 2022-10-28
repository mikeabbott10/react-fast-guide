import React from "react"

type NewType = {
    answerIsRight: boolean
}

const TestResult = ({answerIsRight}: NewType) => {
    return (
        <div style={{marginTop: "2rem"}}>
            {!answerIsRight && 
                <>
                    <span className="result">
                        <svg height="16" viewBox="0 0 24 24" width="16">
                            <g fill="#e00"><path d="M12,0A12,12,0,1,0,24,12,12.035,12.035,0,0,0,12,0Zm4.95,15.536L15.536,16.95,12,13.414,8.464,16.95,7.05,15.536,10.586,12,7.05,8.464,8.464,7.05,12,10.586,15.536,7.05,16.95,8.464,13.414,12Z" fill="#e00"></path></g>
                        </svg>
                    </span>
                    <span className="result" style={{color: "red"}}>
                        <strong>Incorrect,</strong> but nice try!
                    </span>
                </>
            }
            {answerIsRight && 
                <>
                    <span className="result">
                        <svg height="16" viewBox="0 0 16 16" width="16"><g fill="#0070f3">
                            <path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M7,11.4L3.6,8L5,6.6l2,2l4-4L12.4,6L7,11.4z" fill="#0070f3"></path></g>
                        </svg>
                    </span>
                    <span className="result" style={{color: "#0070f3"}}>
                        <strong>Correct.</strong> Good job!
                    </span>
                </>
            }
        </div>
    )
}

export default TestResult