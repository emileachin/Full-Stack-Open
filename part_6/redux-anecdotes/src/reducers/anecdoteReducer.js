import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
 name: 'anecdotes',
 initialState: [],
 reducers: {
   appendAnecdote: (state, action) => {
      state.push(action.payload)
   },
   setAnecdotes: (state, action) => {
      return action.payload
   },
   updateVote: (state, action) => {
    const id = action.payload
    const anecdoteToChange = state.find((a) => a.id === id)

    const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
    return state.map((anecdote) =>
      anecdote.id === id ? changedAnecdote : anecdote
    )
   }
 },
})

export const { appendAnecdote, setAnecdotes, updateVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.change(id)
    dispatch(updateVote(id))

  }
}

export default anecdoteSlice.reducer
