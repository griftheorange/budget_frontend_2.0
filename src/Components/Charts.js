import {JSCharting} from 'jscharting-react'
import '../CSS/Charts.css'

const columnsToExclude = ["Transaction Name", "Date", "Type"]

const fillPoints = (seriesArr, tableEntries) => {
    tableEntries["Date"].forEach((element, index) => {
        seriesArr.forEach((series) => {
            series.points.push([element, tableEntries[series.name][index]])
        })
    });
}

const generateLineConfig = (tableEntries) => {
    const lineCols = Object.keys(tableEntries).filter((key => !columnsToExclude.includes(key))).sort()
    const lineConfig = {
        type: 'line',
        legend: {
            template:'%name %icon'
        },
        xAxis: { 
            label_text: 'Date',
            scale: { type: 'time' } 
        }, 
        yAxis: { 
            label_text: 'Amount',
            orientation: 'opposite', 
            formatString: 'c'
        }, 
        defaultSeries: { 
            defaultPoint_marker: { 
            type: 'circle', 
            size: 1, 
            fill: 'white', 
            outline: { width: 1, color: 'currentColor' } 
            } 
        }, 
        title_label_text: 'Accounts Over Time', 
        series:lineCols.map((columnName) => {
            return ({
                name:columnName,
                points:[]
            })
        })
    }
    fillPoints(lineConfig.series, tableEntries)
    return lineConfig
}

export default function(props) {
    let lineConfig = props.tableEntries ? generateLineConfig(props.tableEntries) : null
    return (
        <div className='charts-display-wrapper'>
            <div className='line-chart'>
                {props.tableEntries ? <JSCharting options={lineConfig}/> : null}
            </div>
        </div>
    )
}