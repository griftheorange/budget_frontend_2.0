export default function(props){
    return (
        <div className={props.visible ? 'sidebar-overlay' : 'sidebar-overlay hidden'}>
            <div className={'sidebar'}>
                {props.children}
            </div>
        </div>
    )
}