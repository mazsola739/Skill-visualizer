import React from 'react';
import plantumlEncoder from 'plantuml-encoder';
import {
    showToMeOnSite, showToMeInPic
} from '../rikaskill.js'

const createUrl = umlVersion => `http://www.plantuml.com/plantuml/img/${plantumlEncoder.encode(umlVersion)}`

export const MindMap = ({ skills }) => {
    const showTheJson = showToMeOnSite(skills)
    const umlVersion = showToMeInPic(skills)
    const imgUrl = createUrl(showToMeInPic(skills))

    return (
        <>
            <div><img alt="" src={imgUrl}></img></div><br />
            <div><br /><p>Your JSON </p><br />
                <pre>{JSON.stringify(skills)}</pre>
                <br /><p>Your JSON-Tree</p><br />
                <pre>{`${showTheJson}`}</pre>
                <br /><p>Your JSON in plantUML</p><br />
                <pre>{`${umlVersion}`}</pre></div>
        </>
    )
}


