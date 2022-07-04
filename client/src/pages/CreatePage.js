import React, { useState, useEffect, useContext } from "react"
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const handlePress = async event => {
    event.preventDefault()
    
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        navigate(`/detail/${data.link.id}`)
      } catch(e) {

      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ padding: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Enter link"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={handlePress}
          />
          <label htmlFor="link">Enter link</label>
        </div>
      </div>
    </div>
  )
}