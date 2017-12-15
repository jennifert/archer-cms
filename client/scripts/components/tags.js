import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TagForm from './tags_form';

class Tags extends React.Component {
  constructor(){
      super();
      this.state = {
          tags: [],
          tagId:'',
          mode:'',
      };
      this.fetchTags = this.fetchTags.bind(this);
      this.deleteTags = this.deleteTags.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
     this.setState({
          [e.target.name]: e.target.value,
     });
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

  openTagForm(mode, tagId, tagName) {
    console.log('OPENING FORM: ', mode, tagId, tagName);
    this.setState({
      tagMode: mode,
      tagId: tagId,
      tagName: tagName,
    });
  }

  componentWillMount(){
   this.fetchTags();
  }

  render() {
    const { mode, tags} = this.state;

    return <main className='tags'>
           <h1>Tags</h1>

           <div className="content">
             <button className="tag-add" onClick={() => this.openTagForm('Add','','')}>
               <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
               Add new tag
             </button>

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
                          <td><a onClick={() => this.openTagForm('Edit', rows._id,rows.name)}>{rows.name}</a></td>
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
             { (this.state.tagId || this.state.tagMode === 'Add') &&
               <TagForm tagId={this.state.tagId} tagName={this.state.tagName} mode={this.state.tagMode}
                 fetchTags={this.fetchTags} user={this.props.user} onChange={this.handleInputChange.bind(this)}
               />
             }
           </div>
         </main>
  }

}

export default Tags;
