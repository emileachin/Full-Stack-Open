import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    return (
        <form onSubmit={handleLogin}>
        <div>
          username 
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} 
          name="Username" data-testid='username'/>
        </div>
        <div>
          password
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}
          name="Password" data-testid='password' />
        </div>
        <button type = "submit">login</button>
      </form>
    )

}

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm