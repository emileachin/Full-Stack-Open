const Content = props => {
    return (
      <>
        <p>find countries</p>
        <input value={props.search} onChange={props.searching} />
      </>
    )
  }


export default Content