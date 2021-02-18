import {useEffect, useState} from 'react'
import Rerouters from '../CrossCuttingFunctions/Rerouters'

import NavBar from '../Components/NavBar'

export default function(props){

    const [render, setRender] = useState(false);

    useEffect(() => {
        Rerouters.refreshTokenOrRerout(props.history, "/login").then((success) => {
            console.log(success)
            if(success){
                setRender(true)
            }
        })
    }, [])

    return render ? (
        <>
        <NavBar history={props.history}/>
        <div id="home-page-wrapper">
            <p>Hello {window.localStorage.getItem("id")}</p>
        </div>
        </>
    ) : null
}