

const Filter = ({ searchName, handleSearchName}) => {

    return (
        <form>
            <div>
            filter by name: <input value={searchName} onChange={handleSearchName}/>
            </div>
         </form>
    )
}

export default Filter