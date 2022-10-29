import React from "react";
import { useContext } from "react"
import DataContext from "../context/DataContext"

const TopCard = () => {
    const {points, guide} = useContext(DataContext);

    const link = guide.cardLink ? guide.cardLink.url : null;
    const linkText = guide.cardLink ? guide.cardLink.text : null;

    return (
        <div className="fg-top-card">
            {points > 0 &&
                <>
                    <div className="fg-points">
                        <span><strong>{points}</strong> points</span>
                    </div>
                    
                    {link && 
                        <div className="fg-link">
                            <a href={link} target="_blank">{linkText}</a>
                        </div>
                    }
                    {!link && linkText && 
                        <div className="fg-link">
                            <span>{linkText}</span>
                        </div>
                    }
                    {!linkText && 
                        <div style={{
                            marginTop: ".5rem"
                        }}></div>
                    }
                </>
            }
            {points===0 &&
                <div className="fg-title">
                    <span><strong>{guide.title}</strong></span>
                </div>
            }
        </div>
    )
}

export default TopCard
