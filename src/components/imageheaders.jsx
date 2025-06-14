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
        this.fetchHeaderImages = this.fetchHeaderImages.bind(this);
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

    handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 700 * 1024) {
            alert('File too large. Must be under 700KB.');
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed.');
            return;
        }


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
        return <main className='image-headers'>
            <h1>Header image</h1>
            <div className="content">
                <div className="add-header">
                    <form className='imageHeaderUpload'>
                        <fieldset>
                            <legend>Upload New Header Image</legend>
                            <label className="label">Max size under 1MB</label>
                            <input type="file" className="file-input file-input-primary" onChange={this.handleFileUpload} />
                        </fieldset>
                    </form>

                    <table className='image-headers-table'>
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

            </div>
        </main>
    }

}

export default ImageHeaders;
