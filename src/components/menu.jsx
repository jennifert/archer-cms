import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => (
  <nav className="bg-gray-800 text-white w-full md:w-64 p-4">
    <ul className="space-y-2">
      <li><Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link></li>
      <li><Link to="/categories" className="block hover:bg-gray-700 p-2 rounded">Categories</Link></li>
      <li><Link to="/tags" className="block hover:bg-gray-700 p-2 rounded">Tags</Link></li>
      <li><Link to="/imageheaders" className="block hover:bg-gray-700 p-2 rounded">Image Headers</Link></li>
      <li><Link to="/endpoints" className="block hover:bg-gray-700 p-2 rounded">Endpoints</Link></li>
      <li><Link to="/types" className="block hover:bg-gray-700 p-2 rounded">Content Types</Link></li>
    </ul>
  </nav>
);

export default SideMenu;
