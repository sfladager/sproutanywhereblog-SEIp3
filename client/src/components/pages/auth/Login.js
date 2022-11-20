import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Imports
import axios from 'axios'
import { setToken } from '../../../helpers/auth'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {

  // ! Location Variables
  const navigate = useNavigate()

  // ! State
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formFields)
      console.log(data.token)
      setToken(data.token)
      navigate('/home')
    } catch (err) {
      setError(err.response.data.message)
    }
  }



  // ! JSX
  return (
    <main className="form-page">
      <Container className='mt-4'>
        <Row>
          <div className='col-10 offset-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              {/* Email */}
              <label htmlFor="email">Email <span>*</span></label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formFields.email}
                placeholder="Email Address"
                required
              />
              {/* Password */}
              <label htmlFor="password">Password <span>*</span></label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formFields.password}
                placeholder="Password"
                required
              />
              {/* Error Message */}
              {error && <small className='text-danger'>{error}</small>}
              {/* Submit */}
              <button className='btn btn-main w-100'>Login</button>
            </form>
          </div>
        </Row>
      </Container>
    </main>
  )
}

export default Login