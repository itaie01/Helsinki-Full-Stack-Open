import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { removeNotification, showNotficiation } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = event => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        dispatch(createNewAnecdote(content));
        dispatch(showNotficiation(content))
        setTimeout(function() {
            dispatch(removeNotification())
          }, 5000);
        event.target.anecdote.value = "";
    }

    return <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    </>
}

export default AnecdoteForm;