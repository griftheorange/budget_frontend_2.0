import {JSCharting} from 'jscharting-react'
import {connect} from 'react-redux'
import '../CSS/Charts.css'

function Charts(props) {
    return (
        <div className='charts-display-wrapper'>
            <div className='line-chart'>
                {props.lineConfig ? <JSCharting options={props.lineConfig}/> : null}
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        lineConfig:state.lineConfig
    }
}

export default connect(mapStateToProps)(Charts)