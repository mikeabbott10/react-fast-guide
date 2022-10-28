import { useState, useEffect } from 'react';

interface TWindowSize {
    width: number | null,
    height: number | null
}

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<TWindowSize>({
        width: null,
        height: null
    })

    useEffect(()=>{
        const handleResize = () => {
            setWindowSize(prevVal => {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            })
        };
        
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return windowSize;
}

export default useWindowSize;