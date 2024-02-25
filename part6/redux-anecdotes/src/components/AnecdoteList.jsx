import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { removeNotification, showNotficiation } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const sortDescending = arr => {
        const compareAnecs = (a1, a2) => {
            return a2.votes - a1.votes
        }
        return arr.sort(compareAnecs);
    }

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => sortDescending(state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))))

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteForAnecdote(id))
        dispatch(showNotficiation(anecdotes.filter(a => a.id === id)[0].content))
        setTimeout(function() {
            dispatch(removeNotification())
          }, 5000);
    }

    return <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </>
}

export default AnecdoteList;