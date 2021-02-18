import {useEffect, useState} from 'react'
import renderOrReroutOnValidToken from '../CrossCuttingFuncitons/renderOrReroutOnValidToken'

export default function(props){

    const [render, setRender] = useState(false);

    useEffect(() => {
        renderOrReroutOnValidToken(setRender, props.history, "/login")
    }, [])

    return render ? (
        <div id="home-page-wrapper">
            <p>Hello</p>
        </div>
    ) : null
}