import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TypeForm from './type_form';

class ContentTypes extends React.Component {
  constructor(){
      super();
      this.state = {
          types: [],
          typeId:'',
          mode:'',
      };
      this.fetchTypes = this.fetchTypes.bind(this);
      this.deleteTypes = this.deleteTypes.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
     this.setState({
          [e.target.name]: e.target.value,
     });
  }

  deleteTypes(id) {
      fetch(`/api/type/${id}`, {
          method: 'DELETE',
          credentials: 'include'
      })
      .then(() => this.fetchTypes());
  };

  fetchTypes(){
    let types=[];
      fetch('/api/type/', {
        method: 'GET',
        credentials: 'include'
    })
      .then(resp => resp.json())
      .then(json => this.setState({ types:json }));
  }

  openTypeForm(mode, typeId, typeName) {
    console.log('OPENING FORM: ', mode, typeId, typeName);
    this.setState({
      typeMode: mode,
      typeId: typeId,
      typeName: typeName,
    });
  }

  componentWillMount(){
   this.fetchTypes();
  }

  render() {
    const { mode, types} = this.state;

    return <main className='types'>
           <h1>Content Types</h1>

           <div className="content">
             <button className="type-add" onClick={() => this.openTypeForm('Add','','')}>
               <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
               Add new content type
             </button>

             <table className='table table-condensed table-hover table-responsive table-types'>
               <thead>
                 <tr>
                    <th>Name</th>
                    <th>Action</th>
                 </tr>
               </thead>
                 <tbody>
                     {this.state.types.map((rows)=>{
                      return(
                        <tr key={rows._id}>
                          <td><a onClick={() => this.openTypeForm('Edit', rows._id,rows.name)}>{rows.name}</a></td>
                          <td>
                            <button className="tag-delete" onClick={() => this.deleteTypes(rows._id)}>
                              <i className='fa fa-trash'></i>&nbsp;
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
            </table>
             { (this.state.typeId || this.state.typeMode === 'Add') &&
               <TypeForm typeId={this.state.typeId} typeName={this.state.typeName} mode={this.state.typeMode}
                 fetchTypes={this.fetchTypes} user={this.props.user} onChange={this.handleInputChange.bind(this)}
               />
             }
           </div>
         </main>
  }

}

export default ContentTypes;
