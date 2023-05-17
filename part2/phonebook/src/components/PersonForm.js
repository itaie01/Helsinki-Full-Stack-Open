const PersonForm = ({ state, handleState }) => {
      
    return (
        <form onSubmit={handleState.addPerson}>
            <div>
            name: <input value={state.newName} onChange={handleState.handleNameChange} />
            </div>
            <div>
            number: <input value={state.newNumber} onChange={handleState.handleNumberChange} />
            </div>
            <div>
            <button type={"submit"}>add</button>
            </div>
      </form>
    )
}

export default PersonForm