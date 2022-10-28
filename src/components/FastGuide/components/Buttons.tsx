import React from "react"

type ButtonsProps = {
    isFirstStep: boolean,
    isLastStep: boolean,
    onBack: (ev: React.MouseEvent<HTMLButtonElement>) => void,
    onNext: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

const Buttons = ({ isFirstStep, isLastStep, onBack, onNext }: ButtonsProps) => {
    return (
        <div style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end"
        }}
        >
            {!isFirstStep &&
                <button className="fg-btn fg-white-btn" onClick={onBack}>
                    <svg height="24" viewBox="0 0 24 24" width="24"><g fill="#0070f3">
                        <path d="M14,17.414l-4.707-4.707c-0.391-0.391-0.391-1.023,0-1.414L14,6.586L15.414,8l-4,4l4,4L14,17.414z" fill="#0070f3"></path>
                    </g></svg>
                    <span style={{ marginLeft: ".3em" }}></span>
                    Prev
                </button>
            }

            {!isLastStep &&
                <button className="fg-btn fg-blue-btn" onClick={onNext}>
                    Next
                    <span style={{ marginLeft: ".3em" }}></span>
                    <svg height="24" viewBox="0 0 24 24" width="24"><g fill="white">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </g></svg>
                </button>
            }
        </div>
    )
}

export default Buttons
