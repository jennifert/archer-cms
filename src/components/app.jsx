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
            <div className="container">
                <SideMenu user={this.state.user} />
                <main>
                    <div className="logout-button">
                        <button onClick={this.logout} className="secondary">
                            Logout
                        </button>
                    </div>
                    <Routes>
                        <Route path="/dashboard/*" element={<Dashboard user={this.state.user} />} />
                        <Route path="/tags/*" element={<Tags user={this.state.user} />} />
                        <Route path="/categories/*" element={<Categories user={this.state.user} />} />
                        <Route path="/imageheaders/*" element={<ImageHeaders user={this.state.user} />} />
                        {this.state.user?.role === 'admin' && (
                            <Route
                                path="/endpoints/*"
                                element={<Endpoints user={this.state.user} />}
                            />
                        )}
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
                        <main className="container">
                            <div className="grid">
                                <CreateUser refresh={this.refresh} />
                                <LoginForm refresh={this.refresh} login={this.login} />
                            </div>
                        </main>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    }

    render() {
        return (
            <Router>
                <header className="container">
                    <h1>Archer CMS</h1>
                </header>

                {this.state.loggedIn ? this.renderAuthenticated() : this.renderUnauthenticated()}

                <footer>
                    <Copyright />
                </footer>
            </Router>
        );
    }
}

export default App;
