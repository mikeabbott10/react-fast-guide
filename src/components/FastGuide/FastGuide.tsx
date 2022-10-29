import React from 'react'
import FastGuideMain from '../../mytypes/FastGuideMain';
import { DataProvider } from './context/DataContext';
import App from './App'

interface FastGuideProps {
    guide: FastGuideMain
}

const FastGuide = (props: FastGuideProps) => {
    return (
        <DataProvider guide={props.guide}>
            <App />
        </DataProvider>
    )
}

export default FastGuide
