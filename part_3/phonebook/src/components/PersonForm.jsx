const PersonForm = props => {
    return (
        <>
            <div>
            name: <input value={props.newName} onChange={props.nameChange} />
            </div>
            <div>
            number: <input value={props.newNumber} onChange={props.numberAdd} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </>
    )
}

export default PersonForm