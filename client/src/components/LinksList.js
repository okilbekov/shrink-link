import React from "react"
import { Link } from "react-router-dom"

export const LinksList = ({ links }) => {
  if(!links.length) {
    return (
      <p className="center">No links yet</p>
    )
  }

  return (
    <table className="highlight">
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
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link.id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}