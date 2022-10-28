import React from "react"
import { useContext } from "react"
import DataContext from "../context/DataContext"

type TopCardProps = {
    link: string,
    linkText: string
}

const TopCard = ({link, linkText} : TopCardProps) => {
    const {points} = useContext(DataContext);
    return (
        <div className="fg-top-card">
            <div className="fg-points">
                <span><strong>{points}</strong> points</span>
            </div>
            
            {link && 
                <div className="fg-link">
                    <a href={link} target="_blank">{linkText}</a>
                </div>
            }
            {!link && 
                <div style={{
                    marginTop: ".5rem"
                }}></div>
            }
        </div>
    )
}

export default TopCard
