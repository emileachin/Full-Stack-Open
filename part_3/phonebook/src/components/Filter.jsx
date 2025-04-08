const Filter = (props) => {
    return (
        <>
            <label>filter shown with</label>
            <input value={props.filter} onChange={props.checkFilter} />
        </>
    )
}

export default Filter