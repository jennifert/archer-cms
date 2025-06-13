import React from 'react';
import { Link } from 'react-router-dom';
import ImageHeadersTable from './imageheaders_table.jsx';

class ImageHeaders extends React.Component {
    constructor() {
        super();
        this.state = {
            filename: [],
            endpoints: [],
            allheaderImages: [],
            toDelete: '',
            newImage: '',
        };
    }
    componentDidMount() {
        // this.fetchEndPoints();
        this.fetchHeaderImages();
    }

    fetchHeaderImages() {
        let dashboard = [];
        fetch('/api/images/headers', {
            method: 'GET',
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(json => this.setState({
                allheaderImages: json,
                user: this.props.user,
            }));
    }

    // fetchEndPoints() {
    //     let dashboard = [];
    //     fetch('/api/settings/endpoints', {
    //         method: 'GET',
    //         credentials: 'include'
    //     })
    //         .then(resp => resp.json())
    //         .then(json => this.setState({ endpoints: json }));
    // }

    handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/images/header/upload', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        if (res.ok) {
            this.fetchHeaderImages();
        } else {
            console.error('Upload failed');
        }
    };

    addheaderImage() {
        const { filename, mimetype } = this.state;
        const uploader = this.props.user.id;

        fetch('/api/images/headers', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dateSaved: new Date(),
                filename,
                mimetype,
                user: uploader
            })
        })
            .then(() => this.fetchHeaderImages())
            .catch(error => console.error('Upload error:', error.message));
    }


    render() {
        console.log('🧪 Images state:', this.state.allheaderImages);
        return <main className='settings'>
            <h1>Header image</h1>
            <div className="content">
                <div className="api-calls">
                    <form className="inline-form">
                        <input type="file" onChange={this.handleFileUpload} />
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
                            {this.state.allheaderImages.map(allheaderImages => <ImageHeadersTable key={allheaderImages.id}
                                onDelete={this.fetchHeaderImages}
                                {...allheaderImages}
                                whoami={this.props.user}
                            />)}
                        </tbody>
                    </table>
                </div>

                {/* <div className="api-calls">
                    <h3>Client API Calls</h3>
                    <p>This is a list of API calls to create your front-end of teh site with. Please note for all execpt login and sign up, you will need to be signed-in.</p>
                    <ul id="api-calls-table">
                        {this.state.endpoints.map((rows) => {
                            return (
                                <li key={rows._id}>
                                    <span className="route-name">{rows.route}</span>:&nbsp;
                                    <span className="route-purpose">{rows.purpose}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div> */}
            </div>
        </main>
    }

}

export default ImageHeaders;
