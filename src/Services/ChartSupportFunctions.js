export default class ChartSupportFunctions {
    static columnsToExclude = ["Transaction Name", "Date", "Type"]

    static fillPoints(seriesArr, tableEntries){
        tableEntries["Date"].forEach((element, index) => {
            seriesArr.forEach((series) => {
                series.points.push([element, tableEntries[series.name][index]])
            })
        });
    }
    
    static async generateLineConfig(tableEntries){
        const columnsToExclude = ["Transaction Name", "Date", "Type"]
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
        this.fillPoints(lineConfig.series, tableEntries)
        return lineConfig
    }
}