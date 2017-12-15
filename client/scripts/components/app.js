import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Copyright from './copyright.js';
import SideMenu from './menu.js';
import LoginForm from './login.js';
import CreateUser from './createuser.js';
import Dashboard from './dashboard.js';
import SiteSettings from './sitesettings.js';
import Tags from './tags.js';
import Categories from './categories.js';
import ContentTypes from './types.js';


class App extends React.Component {
  constructor() {
      super();
      this.state = {
          loggedIn: false,
      };
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.refresh = this.refresh.bind(this);
  }
  login() {
      this.setState({
          loggedIn: true,
      });
  }
  refresh() {
      fetch('/api/me', {
          method: 'GET',
          credentials: 'include'
      })
      .then((res) => res.json())
      .then((user) => {
          if (user._id) {
              this.setState({
                  user: user,
              });
              this.login();
          }
      });
  }

  logout() {
      fetch('/api/logout', {
          method: 'GET',
          credentials: 'include',
      })
      .then(() => {
          this.setState({
              loggedIn: false,
              user: null,
          });
      });

  }

  componentDidMount() {
      this.refresh();
  }
  render() {
    return (
      <Router>
        <div className="container">
            <header className="cms-header">
                <div className="cms-logo text-center"><img src="/logo.png" alt="Logo" className="img-rounded" /></div>
                <h1 className="cms-title text-center">Archer CMS</h1>
                {
                  this.state.loggedIn && <SideMenu />
                }
            </header>
            { this.state.loggedIn ?
              <article className="signed-in">
                <button className="btn btn-default" onClick={this.logout}>Logout</button>
                <Route path="/dashboard" render={()=><Dashboard user={this.state.user} />} />
                <Route path="/tags" render={()=><Tags user={this.state.user} />} />
                <Route path="/categories" render={()=><Categories user={this.state.user} />} />
                <Route exact path="/settings" render={()=><SiteSettings user={this.state.user} />} />
                <Route path="/types" render={()=><ContentTypes user={this.state.user} />} />
              </article>
            :
              <div className="row">
               <div className="col-sm-6">
                 <CreateUser refresh={this.refresh} />
               </div>
               <div className="col-sm-6">
                 <LoginForm refresh={this.refresh} login={this.login} />
               </div>
              </div>
            }

          <footer>
            <Copyright />
          </footer>
        </div>
    </Router>
    )
  };
}

export default App;
