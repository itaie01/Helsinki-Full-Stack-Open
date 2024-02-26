import axios from 'axios';

const baseUrl = 'http://localhost:3001/annecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const anecdote = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdote);
    return response.data
}

const vote = async votedAnecdote => {
    const response = await axios.put(`${baseUrl}/${votedAnecdote.id}`, {...votedAnecdote, votes: votedAnecdote.votes + 1})
    return response.data;
}

export default { getAll, createAnecdote, vote }