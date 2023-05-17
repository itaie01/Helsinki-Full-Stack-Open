const Header = ({ text }) => {
    return (
      <>
        <h2>{text}</h2>
      </>
    )
  }
  
const Part = ({ course, exercises }) => {
  return (
    <>
      <p>{course} {exercises}</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
          <Part key={part.id} course={part.name} exercises={part.exercises}></Part>
      ))}
    </>
  )
}

const Total = ({ parts }) => {
  return (
    <p>
      <b>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default Course