import {Icon, Divider, Button} from 'semantic-ui-react'
import {useState, useEffect} from 'react'

import DBAdapter from '../Adapters/DBAdapter'

function EditAccountDetailsForm(props){

    const [accountNameField, setAccountNameField] = useState(props.account.accountName);
    const [accountSeedField, setAccountSeedField] = useState(props.account.seedBalance);
    const [accountRelationships, setAccountRelationships] = useState({})

    const handleUpdateCategoryRelationship = (category, relationship) => {
        setAccountRelationships({...accountRelationships, [category]:relationship})
    }

    const finalizeAccountEdits = () => {
        if(accountNameField.trim() != "" && accountSeedField >= 0){
            DBAdapter.patchCategoryAccountRelationships(props.tableName, props.account.accountName, accountRelationships)
            .then((response) => {
                if(response.Success){
                    DBAdapter.patchAccountNameAndValue(props.tableName, props.account.accountName, accountNameField, accountSeedField)
                    .then((response) => {
                        if(!response.Success){console.log(response)}
                        props.refreshSuite.forEach(func => {
                            func()
                        });
                        props.setEditAccountSidebarView(null)
                    })
                } else {
                    console.log(response)
                }
            })
        }
    }

    useEffect(() => {
        DBAdapter.fetchAccountCategoryRelationships(props.tableName, props.account.accountName)
        .then((response) => {
            if(response.Success){
                setAccountRelationships(response.Success)
            } else {
                console.log(response)
            }
        })
    }, [])

    return (
        <div className='edit-account-form-wrapper'>
            <Icon className="sidebar-close" name="delete" color="red" size="large"
                onClick={() => {props.setEditAccountSidebarView(null)}}/>
            <h3>Edit Account "{props.account.accountName}"</h3>
            <Divider/>
                <div>
                <Button color='blue' onClick={finalizeAccountEdits}>Save Changes</Button>
                </div>
            <Divider/>
            <div className='account-name-seed-block'>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name: </label></td>
                            <td><input value={accountNameField} onChange={(e) => {setAccountNameField(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td><label>Seed Balance: </label></td>
                            <td><input type='number' value={accountSeedField} onChange={(e) => {
                                if(e.target.value >= 0){
                                    setAccountSeedField(Math.round(e.target.value*100)/100)
                                }
                            }}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='category-relationships'>
                {Object.entries(accountRelationships).map((entry) => {
                    const [category, relationship] = entry
                    return (
                        <div className='relationship-card' category={entry}>
                            <p>{category}</p>
                            <Divider/>
                            <div className='radio-field'>
                                <div><input type='radio' checked={relationship == "ADD"} onChange={() => {handleUpdateCategoryRelationship(category, "ADD")}}/><label>Add</label></div>
                                <div><input type='radio' checked={relationship == "SUBTRACT"} onChange={() => {handleUpdateCategoryRelationship(category, "SUBTRACT")}}/><label>Subtract</label></div>
                                <div><input type='radio' checked={relationship == "NONE"} onChange={() => {handleUpdateCategoryRelationship(category, "NONE")}}/><label>None</label></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EditAccountDetailsForm