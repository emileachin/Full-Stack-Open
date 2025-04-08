const Notification = props => {
    if (!props.message) {
        return null
    }

    const className = props.isError ? 'error' : 'note'
  return <div className={className}>{props.message}</div>
}

export default Notification