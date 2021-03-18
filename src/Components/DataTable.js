import { Table } from "semantic-ui-react"

export default function(props){
    const tableData = props.tableData
    const tableCategories = props.tableCategories
    const depth = tableData.Amount ? tableData.Amount.length : 0

    const getKeyOrdering = () => {
        let keys = ["Transaction Name", "Date", "Type", "Amount"]
        let accountKeys = []
        let fetchedKeys = Object.keys(tableData)
        fetchedKeys.forEach((key) => {
            if(!keys.includes(key)){
                accountKeys.push(key)
            }
        })
        return [...keys, ...accountKeys.sort()]
    }

    const handleCategoryClick = (key, index) => {
        console.log(tableCategories)
        console.log(`Clicked ${key} column index ${index}`)
    }

    const getCellWithListeners = (key, index) => {
        switch(key){
            case "Type":
                return (
                    <td className="table-cell" key={key+index} onClick={() => {handleCategoryClick(key, index)}}>{tableData[key][index]}</td>
                )
            case "Transaction Name":
                return (
                    <td className="table-cell" key={key+index}>{""+(index+1)}. {tableData[key][index]}</td>
                )
            case "Date":
                return (
                    <td className="table-cell" key={key+index}>{tableData[key][index]}</td>
                )
            default:
                return (
                    <td className="table-cell" key={key+index}>${tableData[key][index].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                )
        }
    }

    const columnKeys = getKeyOrdering()

    const generateRows = () => {
        let rows = []
        for(let i=0;i<depth;i++){
            rows.push(
                <tr key={i}>
                    {columnKeys.map(key => getCellWithListeners(key, i))}
                </tr>
            )
        }
        return rows
    }

    return (
        <table className="table">
            <thead>
                <tr className="table-row">
                    {columnKeys.map((key) => {
                        return (
                            <th className="header-cell" key={key}>{key}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {generateRows()}
            </tbody>
        </table>
    )
}