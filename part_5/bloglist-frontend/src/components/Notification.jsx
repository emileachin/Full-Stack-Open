const Notification = ({ message, error }) => {
    if (message === null) {
      return ""
    }
  
    const className = error ? 'error' : 'blog'
    return <div className={className}>{message}</div>
  }

  export default Notification