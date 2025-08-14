import { useState } from 'react'
import './index.less'
import { useNavigate } from 'react-router-dom'
export default function SideMenu()
{
    const [active,setActive]=useState('')
    const data=['Browse','Radio','']
    const library=['Recently played','Songs','Albums','Artists']
    const navigate=useNavigate()
    return (
      <>
        <ul className="side-menu-container">
          {data.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                    setActive(index)
                    navigate(`/${item.replace(' ','').toLowerCase()}`)
                }}
                className={`side-menu-item ${active === index && "active"}`}
              >
                {item}
              </li>
            );
          })}
          <h3 className="user-library-header">YOUR LIBRARY</h3>
          {library.map((item, index) => {
            return (
              <li
                key={index + data.length}
                onClick={() => {
                    setActive(index + data.length)
                    navigate(`/${item.replace(" ", "").toLowerCase()}`);
                }}
                className={`side-menu-item ${
                  active === index + data.length && "active"
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </>
    );
}