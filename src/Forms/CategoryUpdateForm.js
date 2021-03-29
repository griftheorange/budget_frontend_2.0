import {Button, Icon, List} from 'semantic-ui-react'

export default function(props){
    return (
        <>
        <Icon className="sidebar-close" name="delete" color="red" size="large"
              onClick={() => {props.setCategorySidebarView(false)}}/>
        <h3>{props.tableEntries ? props.tableEntries['Transaction Name'][props.editCategorySelectedRow] : null}</h3>
        <List>
            {props.dataTableCategories ? props.dataTableCategories.map((category) => {
                return (
                    <List.Item key={category}><Button onClick={() => {props.handleCategoryUpdate(category)}}>{category}</Button></List.Item>
                )
            }) : null}
        </List>
        </>
    )
}