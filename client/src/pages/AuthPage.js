import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSignup = async event => {
    try {
      const data = await request('/api/auth/signup', 'POST', { ...form })
      message(data.message)
    } catch(e) {
      console.log(e)
    }
  }

  const handleLogin = async event => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shrink Link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Login</span>
            <div>

            <div className="input-field">
              <input
                placeholder="example@domain.com"
                id="email"
                type="text"
                name="email"
                className="validate yellow-input"
                value={form.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input
                placeholder="Must have at least 6 characters"
                id="password"
                type="password"
                name="password"
                className="validate yellow-input"
                value={form.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={handleSignup}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}