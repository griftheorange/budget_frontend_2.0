import {Icon, Accordion, Message} from 'semantic-ui-react'
import {useState} from 'react'
import {connect} from 'react-redux'

import UserAccountAdapter from '../Adapters/DBAdapter'

function HomeMenuForm(props){

    const [activeHash, setActiveHash] = useState({});
    const [tableNameInput, setTableNameInput] = useState("");
    const [tableFileName, setTableFileName] = useState("");
    const [tableFileInput, setTableFileInput] = useState(null);
    const [activeErrorHash, setActiveErrorHash] = useState({});

    const handleNewBlankTable = () => {
        UserAccountAdapter.fetchAddDataTable(tableNameInput)
        .then((response) => {
            if(response.Success){
                UserAccountAdapter.fetchDataTablesForUser()
                .then((tables) => {
                    props.setUserTables(tables)
                    setTableNameInput("")
                    setActiveErrorHash({...activeErrorHash, "new-data-table": null})
                })
            } else {
                setActiveErrorHash({...activeErrorHash, "new-data-table": response.Error})
            }
        })
    }

    const handleNewSeededTable = () => {
        UserAccountAdapter.fetchAddSeededDataTable(tableFileInput)
        .then((response) => {
            if(response.Success){
                UserAccountAdapter.fetchDataTablesForUser()
                .then((tables) => {
                    props.setUserTables(tables)
                    setTableFileInput(null)
                    setTableFileName("")
                    setActiveErrorHash({...activeErrorHash, "new-data-table": null})
                })
            } else {
                setActiveErrorHash({...activeErrorHash, "new-data-table": response.Error})
            }
        })
    }

    return (
        <div className="new-table-form">
            <Accordion styled>
                {/* FILTER TABLES */}
                <Accordion.Title active>
                    <h4>Filter Tables</h4>
                </Accordion.Title>
                <Accordion.Content active>
                    <label for="filter-by-name">Name: </label><input id="filter-by-name"/>
                </Accordion.Content>

                {/* ADD NEW DATA TABLE BY NAME OR FILE */}
                <Accordion.Title active>
                    {activeErrorHash["new-data-table"] != null ? (
                        <Message negative>
                            <Message.Header>Error</Message.Header>
                            <p>{activeErrorHash["new-data-table"]}</p>
                        </Message>
                    ) : null}
                    <h4>Add Data Table</h4>
                </Accordion.Title>
                <Accordion.Content active>
                    <Accordion styled>
                        <Accordion.Title active={activeHash["new-from-upload"]}
                        onClick={() => {
                            setActiveHash({...activeHash, "new-from-upload":!activeHash["new-from-upload"]})
                            }}>
                                <h4><Icon name="dropdown"/>Upload Seed Table</h4>
                        </Accordion.Title>
                        <Accordion.Content active={activeHash["new-from-upload"]}>
                            <label for="file-input">Upload file: </label>
                            <input type="file" id="file-input" value={tableFileName} onChange={(e) => {
                                setTableFileName(e.target.value)
                                setTableFileInput(e.target.files[0])}}/>
                            <button onClick={handleNewSeededTable}>Add Table</button>
                        </Accordion.Content>
                    </Accordion>
                    <Accordion styled>
                        <Accordion.Title active={activeHash["new-blank"]}
                        onClick={() => {
                            setActiveHash({...activeHash, "new-blank":!activeHash["new-blank"]})
                            }}>
                                <h4><Icon name="dropdown"/>New Blank Table</h4>
                        </Accordion.Title>
                        <Accordion.Content active={activeHash["new-blank"]}>
                            <label for="name-input">Table Name: </label>
                            <input id="name-input" value={tableNameInput} onChange={(e) => {setTableNameInput(e.target.value)}}/>
                            <button onClick={handleNewBlankTable}>Add Table</button>
                        </Accordion.Content>
                    </Accordion>
                </Accordion.Content>

            </Accordion>
        </div>
    )
}

function mapStateToProps(state){
    return {}
}

function mapDispatchToProps(dispatch){
    return {
        setUserTables:(tables) => {
            dispatch({
                type:"SET_USER_TABLES",
                content:tables
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMenuForm)