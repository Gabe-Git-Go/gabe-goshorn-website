import { NavLink } from "react-router-dom";


function MyNavbar(){
  return (
    <div id="my-nav-bar-wrapper">
      <ul id="my-nav-bar-list">
        <li><NavLink style={({ isActive }) => ({  
                            color: isActive ? 'orange' : 'rgb(245, 205, 154)' })}  to="/">Home</NavLink></li>
        <li><NavLink style={({ isActive }) => ({  
                            color: isActive ? 'orange' : 'rgb(245, 205, 154)' })}  activeClassName="active" to="/music">Music</NavLink></li>
        <li><NavLink style={({ isActive }) => ({  
                            color: isActive ? 'orange' : 'rgb(245, 205, 154)' })}  activeClassName="active" to="/hire-me">Hire Me</NavLink></li>
      </ul>
    </div>
  );
}

export default MyNavbar;