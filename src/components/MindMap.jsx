import React, { useState } from 'react';
import plantumlEncoder from 'plantuml-encoder';
import {
    showToMeOnSite, showToMeInPic
} from '../rikaskill.js'

const createUrl = (umlVersion) => {
    var encoded = plantumlEncoder.encode(umlVersion)
    var imgUrl = 'http://www.plantuml.com/plantuml/img/' + encoded
    return imgUrl
}

export const MindMap = (props) => {
    const { skills } = props

    const [jsonToUml, setJsonToUml] = useState(skills)
    const [showTheJson, setShowTheJson] = useState(showToMeOnSite(skills))
    const [umlVersion, setUmlVersion] = useState(showToMeInPic(skills))
    const [imgUrl, setImgUrl] = useState(createUrl(showToMeInPic(skills)))

    return (
        <>
            <div><img alt="" src={imgUrl}></img></div><br />
            <div><br /><p>Your JSON </p><br />
                <pre>{JSON.stringify(jsonToUml)}</pre>
                <br /><p>Your JSON-Tree</p><br />
                <pre>{`${showTheJson}`}</pre>
                <br /><p>Your JSON in plantUML</p><br />
                <pre>{`${umlVersion}`}</pre></div>
        </>
    )
}


