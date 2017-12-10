import React from 'react';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  render() {
    return <aside className="left-panel">
      <nav className='menu'>
        <h3>Menu</h3>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/tags">Tags</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </aside>
  }
}

export default SideMenu;
