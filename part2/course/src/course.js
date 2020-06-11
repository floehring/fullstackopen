import React from "react";

const Header = ({course}) => {
    return <h1>{course.name}</h1>
}

const Total = ({course}) => {
    console.log('Total content:', course)

    const sum = course.parts
        .map((part) => part.exercises)
        .reduce((x, y) => x + y)

    return <p><strong>total of {sum} exercises </strong></p>
}

const Part = ({content}) => {
    console.log('Part content:', content)
    return <p> {content.name} {content.exercises} </p>
}

const Content = ({course}) => {
    console.log('Content course:', course)
    return course.parts.map(part => {
            return <Part key={part.id} content={part}/>;
        }
    )
}

const Course = ({content}) => {
    console.log(content)
    return (
        <div>
            < Header
                course={content}
            />
            <Content course={content}/>
            <Total course={content}/>

        </div>)
}

export default Course
