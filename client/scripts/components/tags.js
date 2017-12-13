import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TagForm from './tags_form';

class Tags extends React.Component {
  constructor(){
      super();
      this.state = {
          tags: [],
      };
      this.fetchTags = this.fetchTags.bind(this);
      this.deleteTags = this.deleteTags.bind(this);
  }

  deleteTags(id) {
      fetch(`/api/tags/${id}`, {
          method: 'DELETE',
          credentials: 'include'
      })
      .then(() => this.fetchTags());
  };

  fetchTags(){
    let tags=[];
      fetch('/api/tags/', {
        method: 'GET',
        credentials: 'include'
    })
      .then(resp => resp.json())
      .then(json => this.setState({ tags:json }));
  }

  componentWillMount(){
   this.fetchTags();
  }

  render() {
    const { mode, tags} = this.state;

    return <main className='tags'>
           <h1>Tags</h1>

           <div className="content">

             <Link to="/tags/add">
               <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
               Add new tag
             </Link>

             <table className='table table-condensed table-hover table-responsive'>
               <thead>
                 <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>User</th>
                    <th>Action</th>
                 </tr>
               </thead>
                 <tbody>
                     {this.state.tags.map((rows)=>{
                      return(
                        <tr key={rows._id}>
                          <td>{(new Date(rows.date)).toISOString().substring(0, 10)}</td>
                          <td><Link to={`/tags/edit/${rows._id}`}>{rows.name}</Link></td>
                          <td>{rows.user.name}</td>
                          <td>
                            <button className="tag-delete" onClick={() => this.deleteTags(rows._id)}>
                              <i className='fa fa-trash'></i>&nbsp;
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                  })}
                 </tbody>
             </table>
             <Route exact path="/tags/add" render={(props)=><TagForm {...props} mode='Add' fetchTags={this.fetchTags} user={this.props.user} />} />
             <Route path="/tags/edit/:tagid" render={(props) => <TagForm {...props} mode='Edit' fetchTags={this.fetchTags} user={this.props.user}/>} />
           </div>
         </main>
  }

}

export default Tags;
