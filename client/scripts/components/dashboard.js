import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import NewContent from './newcontent.js';
// import EditContent from './editcontent';
import DashboardForm from './dashboard_form.js';

class Dashboard extends React.Component {
  constructor(){
      super();
      this.state = {
          dashboard: [],
          showResults: false,
      };
      this.fetchDashboard = this.fetchDashboard.bind(this);
      this.deletePage = this.deletePage.bind(this);
  }

  deletePage(id) {
      fetch(`/api/page/${id}`, {
          method: 'DELETE',
        credentials: 'include'
      })
      .then(() => this.fetchDashboard());
  };

  fetchDashboard(){
    let dashboard=[];
      fetch('/api/page', {
        method: 'GET',
        credentials: 'include'
    })
      .then(resp => resp.json())
      .then(json => this.setState({dashboard:json}))
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount(){
   this.fetchDashboard();
  }

  render() {
    return <main className='dashboard'>
           <h1>Dashboard</h1>
           <div className="content">
            <div className="new-page">
              <Link to="/dashboard/new">
                <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
                Add Post/Page
              </Link>
            </div>
             <table className='dashboard-table'>
               <thead>
                 <tr>
                    <th>Last Edited</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Action</th>
                 </tr>
               </thead>
                 <tbody>
                     {this.state.dashboard.map((rows)=>{
                      return(
                        <tr key={rows._id}>
                          <td>{(new Date(rows.dateEdited)).toISOString().substring(0, 10)}</td>
                          <td><Link to={`/dashboard/edit/${rows._id}`}>{rows.title}</Link></td>
                          <td>{rows.user.name}</td>
                          <td>{rows.category.name}</td>
                          <td>{rows.type.name}</td>
                          <td>
                            <button className="page-delete" onClick={() => this.deletePage(rows._id)}>
                              <i className='fa fa-trash'></i>&nbsp;
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                  })}
                 </tbody>
             </table>
           </div>

           <Route exact path="/dashboard/new" render={(props)=><DashboardForm {...props} user={this.props.user} mode='Add' fetchDashboard={this.fetchDashboard} />} />
           <Route path="/dashboard/edit/:dashboardid" render={(props) => <DashboardForm {...props} mode='Edit' user={this.props.user} fetchDashboard={this.fetchDashboard} />} />
         </main>
  }

}

export default Dashboard;
