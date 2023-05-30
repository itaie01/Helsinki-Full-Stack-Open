import peopleService  from '../services/people'
import Button from './Button'

const Persons = ({ persons }) => {

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            peopleService
                .deletePerson(id)
                .then(responseData => console.log(responseData))
        }
    }

    return (
        <>
            {persons.map(
                person => <div 
                                key={person.id}>{person.name} @ {person.number} 
                                <Button onClick={() => deletePerson(person.id, person.name)} text={'delete'}></Button>
                        </div>
            )}
        </>
    )
}

export default Persons