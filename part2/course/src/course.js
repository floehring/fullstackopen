import React from "react";

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}

// const Total = ({course}) => {
//     const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
//     return (
//         <p>Number of exercises {sum}</p>
//     )
// }

const Part = ({content}) => {
    console.log(content)
    return (
        <p>
            {content.name} {content.exercises}
        </p>
    )
}

const Content = ({course}) => {
    console.log('course:', course)
    return (course.parts.map(part => {
            console.log('part', part)
            return <Part key={part.id} content={part}/>;
        }
    ))
}

const Course = ({content}) => {
    return (<
        div>
        < Header
            course={content}
        />
        <Content course={content}/>
        {/*<Total course={course}/>*/
        }
    </div>)
}

export default Course
