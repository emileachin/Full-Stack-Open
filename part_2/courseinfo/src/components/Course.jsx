const Course = (props) => {

    return (
        <>
            <Header course={props.course}/>
        </>
    )

}

const Header = props => {
    const array = props.course
    return (
        <>
        {array.map(courseName => 
        <>
                <h1>{courseName.name}</h1>
                {courseName.parts.map(co => 
                        <p>{co.name} {co.exercises}</p>
                )}
                <h4>total of {courseName.parts.reduce((acc, num) => {return acc + num.exercises}, 0)} exercises</h4>  
        </>        
)}  
        </>
    )
}

export default Course

