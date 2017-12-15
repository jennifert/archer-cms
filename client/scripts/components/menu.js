import React from 'react';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  render() {
    return <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/tags">Tags</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/types">Content Types</Link></li>
              </ul>
            </div>
          </div>
        </nav>
  }
}

export default SideMenu;
