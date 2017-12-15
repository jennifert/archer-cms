import React from 'react';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import SettingsHeaderTable from './sitesettings_table';

const fileKey = 'AG6DflPYRRJ6FiyqFEXWbz';

class SiteSettings extends React.Component {
  constructor(){
      super();
      this.state = {
          headerUrl: [],
          endpoints: [],
          allheaderImages:[],
          toDelete: '',
          newImage: '',
      };
      this.onUploadSuccess = this.onUploadSuccess.bind(this);
      this.fetchEndPoints = this.fetchEndPoints.bind(this);
      this.fetchHeaderImages = this.fetchHeaderImages.bind(this);
      // this.deleteHeaderImage = this.deleteHeaderImage.bind(this);
  }

  // deleteHeaderImage(id) {
  //     fetch(`/api/settings/header/${id}`, {
  //         method: 'DELETE',
  //         credentials: 'include'
  //     })
  //     .then(() => this.fetchHeaderImages());
  // };

  fetchHeaderImages(){
    let dashboard=[];
      fetch('/api/settings/header/', {
        method: 'GET',
        credentials: 'include'
      })
      .then(resp => resp.json())
      .then(json => this.setState({
        allheaderImages:json,
        user: this.props.user,
      }));
  }

  fetchEndPoints(){
    let dashboard=[];
      fetch('/api/settings/endpoints', {
        method: 'GET',
        credentials: 'include'
      })
      .then(resp => resp.json())
      .then(json => this.setState({endpoints:json}));
  }

  onUploadSuccess(success) {
      const url = success.filesUploaded[0].url;
      this.setState({
          headerUrl: url,
        }, () => {
            this.addheaderImage();
        });
  }

  addheaderImage(){
    const headerImage = Object.assign({}, this.state);
    const url = headerImage.headerUrl;
    const uploader = '5a1cd295bf8ad7ca6e6ae1cd';

    fetch('/api/settings/header/', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          dateSaved: new Date(),
          headerUrl: url,
          user: this.props.user,
        })
      })
    .then(() => this.fetchHeaderImages())
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation.');
      console.log(error.message);
    });
  }

  componentDidMount(){
   this.fetchEndPoints();
  }

  componentWillMount(){
    this.fetchHeaderImages();
  }

  render() {
    // console.log(this.state.allheaderImages);
    return <main className='settings'>
           <h1>Settings</h1>
           <div className="content">
             <div className="api-calls">
               <h3>Header image</h3>
               <form className="inline-form">
                   <ReactFilestack
                     apikey={fileKey}
                     buttonText="Add Image"
                     onSuccess={this.onUploadSuccess}
                     buttonClass="btn btn-default"
                   />
               </form>

                <table className='table table-condensed table-hover table-responsive'>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Image Url</th>
                      <th>Uploader</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allheaderImages.map(allheaderImages => <SettingsHeaderTable key={ allheaderImages._id }
                                                        onDelete={ this.fetchHeaderImages }
                                                        {...allheaderImages}
                                                        whoami={ this.props.user }
                                                       />)}
                      {/* {this.state.allheaderImages.map((rows)=>{
                       return(
                         <tr key={rows._id}>
                           <td>{(new Date(rows.dateSaved)).toISOString().substring(0, 10)}</td>
                           <td><a href={`${rows.headerUrl}`} target="_blank">{rows.headerUrl}</a></td>
                           <td>{rows.user.name}</td>
                           <td>
                             <button className="image-delete" onClick={() => this.deleteHeaderImage(rows._id)}>
                               <i className='fa fa-trash'></i>&nbsp;
                               Delete
                             </button>
                           </td>
                         </tr>
                       );
                   })} */}
                  </tbody>
                </table>
             </div>

             <div className="api-calls">
               <h3>Client API Calls</h3>
               <p>This is a list of API calls to create your front-end of teh site with. Please note for all execpt login and sign up, you will need to be signed-in.</p>
               <ul id="api-calls-table">
                       {this.state.endpoints.map((rows)=>{
                        return(
                          <li key={rows._id}>
                            <span className="route-name">{rows.route}</span>:&nbsp;
                            <span className="route-purpose">{rows.purpose}</span>
                          </li>
                        );
                    })}
               </ul>
             </div>
           </div>
         </main>
  }

}

export default SiteSettings;
