import { createSlice } from '@reduxjs/toolkit'
const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
   reducers: {
     setNotification(state, action) {
        return action.payload
     }
   }
})

export const createNotification = (notif, secs) => {
  return async (dispatch) => {
    dispatch(setNotification(notif))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, secs)
  }
}
export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer