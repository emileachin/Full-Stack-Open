const Persons = (props) => {
    return (
        <>
        {props.persons.map(person => {
            return (
            <>
                <p key={person.id}>{person.name} {person.number}</p> 
                <button onClick={() => props.deletePerson(person.id, person.name)}>delete</button>
            </>
            )})
        }
        </>
    )
}

export default Persons