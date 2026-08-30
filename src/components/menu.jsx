import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => (
  <nav>
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/categories">Categories</Link></li>
      <li><Link to="/tags">Tags</Link></li>
      <li><Link to="/imageheaders">Image Headers</Link></li>
      <li><Link to="/endpoints">Endpoints</Link></li>
      <li><Link to="/types">Content Types</Link></li>
    </ul>
  </nav>
);

export default SideMenu;
