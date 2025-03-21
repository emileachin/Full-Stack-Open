const Notification = props => {
    if (props.message === null) {
        return null
    }

    const className = props.isError ? 'error' : 'note'
  return <div className={className}>{props.message}</div>
}

export default Notification