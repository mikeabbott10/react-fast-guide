import React from "react";
import { render } from "@testing-library/react";

import FastGuide from "./FastGuide";
import { FastGuideChapter } from "../../mytypes";

type ContentProps = {
    title: string,
}

const ContentSample = ({ title }: ContentProps) => {
    const firstParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices maximus maximus. Sed mauris risus, mattis eget consequat sit amet, fermentum sit amet sem. Vestibulum in tincidunt urna, eu euismod risus. Mauris auctor felis id dui bibendum ultrices. Aenean ut tempus est. Phasellus lacinia enim sit amet leo blandit sodales. Mauris vel molestie quam. Vestibulum nulla felis, ultricies at est vulputate, porta sodales nulla. Morbi sed efficitur lectus. Duis tellus nisi, efficitur non lobortis sit amet, aliquet eget sapien. Vestibulum at lectus sapien. Sed venenatis ac magna posuere bibendum. "
    const secondParagraph = "Morbi consequat mauris ut mi convallis, ac pharetra enim iaculis. Nam massa arcu, lobortis dignissim feugiat eu, laoreet a nunc. Donec vel est ut justo tempor congue. Proin suscipit orci non mauris porttitor sodales. Praesent luctus feugiat urna ac lobortis. Proin nunc arcu, condimentum quis magna consectetur, bibendum posuere ipsum. Sed blandit et est in venenatis. Aliquam elementum bibendum ultricies. Curabitur ut diam eros. Suspendisse potenti."
    return (
        <>
            <h3>{title}</h3>
            <p>{firstParagraph}</p>
            <h3>Other title</h3>
            <p>{secondParagraph}</p>
        </>
    )
}

const chapters: FastGuideChapter[] = [
    { // chapter
        title: "Fast Guide",
        sections: [
            { // section
                title: "First section title",
                lessons: [
                    { // lesson
                        title: "1. First lesson title",
                        body: <ContentSample title="1. First lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                    { // lesson
                        title: "1. Second lesson title",
                        body: <ContentSample title="1. Second lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                ]
            },
        ]
    },

    { // chapter
        title: "Title of the second chapter",
        sections: [
            { // section
                title: "First section title",
                lessons: [
                    { // lesson
                        title: "1. First lesson title",
                        body: <ContentSample title="1. First lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                    { // lesson
                        title: "1. Second lesson title",
                        body: <ContentSample title="1. Second lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                ]
            },
            { // section
                title: "Second section title",
                lessons: [
                    { // lesson
                        title: "2. First lesson title",
                        body: <ContentSample title="2. First lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                    { // lesson
                        title: "2. Second lesson title",
                        body: <ContentSample title="2. Second lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                    { // lesson
                        title: "2. Third lesson title",
                        body: <ContentSample title="2. Third lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                ]
            },
            { // section
                title: "Third section title",
                lessons: [
                    { // lesson
                        title: "3. First lesson title",
                        body: <ContentSample title="3. First lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                    { // lesson
                        title: "3. Second lesson title",
                        body: <ContentSample title="3. Second lesson title" />,
                        test: { // test
                            question: "How many fingers in one hand?",
                            points: 10,
                            answers: [
                                {
                                    text: "5",
                                    isRight: true
                                },
                                {
                                    text: "6",
                                    isRight: false
                                }
                            ]
                        }
                    },
                ]
            },
        ]

    }
];

const guide = {
    cardLink: { // chapter link
        url: "https://twitter.com/intent/tweet?url=https%3A%2F%2Freactfastguide.github.io&text=I%20just%20got%20185%20points✨%20on",
        text: "Tweet"
    },
    chapters: chapters
}

describe("FastGuide", () => {
    test("renders the FastGuide component", () => {
        render(<FastGuide guide={guide} />);

        
    });
});

