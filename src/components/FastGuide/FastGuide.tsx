import React from 'react'
import FastGuideMain from '../../mytypes/FastGuideMain';
import { DataProvider } from './context/DataContext';
import App from './App'

interface FastGuideProps {
    guide: FastGuideMain,
    enableHistory: boolean
}

const FastGuide = (props: FastGuideProps) => {
    return (
        <DataProvider guide={props.guide} enableHistory={props.enableHistory}>
            <App />
        </DataProvider>
    )
}

export default FastGuide
