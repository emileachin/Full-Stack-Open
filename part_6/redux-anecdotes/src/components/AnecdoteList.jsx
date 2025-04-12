import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
 return (
   <div key={anecdote.id} className="anecdote">
     <div>{anecdote.content}</div>
     <div>
       has {anecdote.votes}
       <button onClick={handleClick}>vote</button>
     </div>
   </div>
 )
}


const AnecdoteList = () => {
 const dispatch = useDispatch()

 const vote = (id) => {
   dispatch(voteAnecdote(id))
   dispatch(createNotification(`you voted for '${anecdotes.find((a) => a.id === id).content}'`))
 }


 const anecdotes = useSelector(({ filter, anecdotes }) => {
   if (filter === '') {
     return anecdotes
   }


   return anecdotes.filter((anecdote) => {
     return anecdote.content.toLowerCase().includes(filter.toLowerCase())
   })
 })


 return [...anecdotes]
   .sort((a, b) => b.votes - a.votes)
   .map((anecdote) => (
     <Anecdote
       key={anecdote.id}
       anecdote={anecdote}
       handleClick={() => vote(anecdote.id)}
     />
   ))
}


export default AnecdoteList
