import {JSCharting} from 'jscharting-react'
import '../CSS/Charts.css'

export default function(props) {
    return (
        <div className='charts-display-wrapper'>
            <div className='line-chart'>
                {props.lineConfig ? <JSCharting options={props.lineConfig}/> : null}
            </div>
        </div>
    )
}