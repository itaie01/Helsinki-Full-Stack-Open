import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const sortDescending = arr => {
        const compareAnecs = (a1, a2) => {
            return a2.votes - a1.votes
        }
        return arr.sort(compareAnecs);
    }

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => sortDescending(state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))))

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted for ${anecdote.content}`, 5))
    }

    return <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
    </>
}

export default AnecdoteList;