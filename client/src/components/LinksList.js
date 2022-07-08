import React from "react"
import { Link } from "react-router-dom"

export const LinksList = ({ links }) => {
  if(!links.length) {
    return (
      <p className="center">No links yet</p>
    )
  }

  return (
    <table className="highlight" style={{ maxWidth: '100%', tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '5%' }}/>
        <col style={{ width: '50%' }}/>
        <col style={{ width: '35%' }}/>
        <col style={{ width: '10%' }}/>
      </colgroup> 
      <thead>
        <tr>
            <th>№</th>
            <th>Original</th>
            <th>Shortened</th>
            <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link.id}>
            <td>{index + 1}</td>
            <td style={{ wordWrap: 'break-word' }}>{link.from}</td>
            <td style={{ wordWrap: 'break-word' }}>{link.to}</td>
            <td>
              <Link to={`/detail/${link.id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}