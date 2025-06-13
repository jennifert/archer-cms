import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Copyright from './copyright.jsx';
import SideMenu from './menu.jsx';
import LoginForm from './login.jsx';
import CreateUser from './createuser.jsx';
import Dashboard from './dashboard.jsx';
import ImageHeaders from './imageheaders.jsx';
import Tags from './tags.jsx';
import Categories from './categories.jsx';
import ContentTypes from './types.jsx';
import Endpoints from './endpoints.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    };
  }

  componentDidMount() {
    this.refresh();
  }

  login = () => this.setState({ loggedIn: true });
  logout = () => {
    fetch('/api/logout', { method: 'GET', credentials: 'include' })
      .then(() => {
        this.setState({ loggedIn: false, user: null }, () => {
          window.location.href = '/';
        });
      });
  };

  refresh = () => {
    return fetch('/api/me', { method: 'GET', credentials: 'include' })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            this.setState({ loggedIn: false, user: null });
          }
          return null;
        }
        return res.json();
      })
      .then(user => {
        if (user) {
          this.setState({ user, loggedIn: true });
        }
        return user;
      })
      .catch(err => {
        console.error('refresh() failed:', err);
      });
  };

  renderAuthenticated() {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <SideMenu />
        <main className="flex-1 p-6 bg-gray-100">
          <div className="flex justify-end mb-4">
            <button onClick={this.logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Logout
            </button>
          </div>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard user={this.state.user} />} />
            <Route path="/tags/*" element={<Tags user={this.state.user} />} />
            <Route path="/categories/*" element={<Categories user={this.state.user} />} />
            <Route path="/imageheaders/*" element={<ImageHeaders user={this.state.user} />} />
            <Route path="/endpoints/*" element={<Endpoints user={this.state.user} />} />
            <Route path="/types/*" element={<ContentTypes user={this.state.user} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  renderUnauthenticated() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col md:flex-row gap-6 p-8">
              <div className="flex-1">
                <CreateUser refresh={this.refresh} />
              </div>
              <div className="flex-1">
                <LoginForm refresh={this.refresh} login={this.login} />
              </div>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  render() {
    return (
      <Router>
        <header className="bg-white shadow p-4 text-center">
          <h1 className="text-2xl font-bold">Archer CMS</h1>
        </header>

        {this.state.loggedIn ? this.renderAuthenticated() : this.renderUnauthenticated()}

        <footer className="bg-white shadow p-4 text-center">
          <Copyright />
        </footer>
      </Router>
    );
  }
}

export default App;
