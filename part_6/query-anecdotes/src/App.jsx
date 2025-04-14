import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getAll, update } from './requests'

import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
       const updatedAnecdotes = anecdotes.map((anecdote) =>
         anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
       )
       queryClient.setQueryData(['anecdotes'], updatedAnecdotes)

       notificationDispatch({type: 'SET_NOTIFICATION', payload: `you voted '${updatedAnecdote.content}'`})

     }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 2
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
