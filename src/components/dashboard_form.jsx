import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class DashboardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.post?.title || '',
            content: props.post?.content || '',
            CategoryId: props.post?.CategoryId || '',
            ContentTypeId: props.post?.ContentTypeId || '',
            categories: [],
            types: [],
            loading: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveFormData = this.saveFormData.bind(this);
    }

    async componentDidMount() {
        const [catRes, typeRes] = await Promise.all([
            fetch('/api/categories'),
            fetch('/api/types')
        ]);

        const categories = await catRes.json();
        const types = await typeRes.json();

        this.setState({
            categories,
            types
        });
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async saveFormData(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const { title, content, CategoryId, ContentTypeId } = this.state;
        const payload = {
            title,
            content,
            CategoryId: parseInt(CategoryId, 10),
            ContentTypeId: parseInt(ContentTypeId, 10)
        };

        const method = this.props.post ? 'PUT' : 'POST';
        const url = this.props.post ? `/api/page/${this.props.post.id}` : '/api/page';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                console.error('❌ Save failed:', await res.text());
                return;
            }

            this.setState({ loading: false });

            if (this.props.onSave) {
                this.props.onSave(); // toggle form off and refresh
            }
        } catch (err) {
            console.error('🔥 Save error:', err);
        }
    }



    render() {
        if (this.state.redirect) {
            if (this.props.refresh) this.props.refresh(); // tells dashboard to reload & hide form
            return null;
        }

        return (
            <form onSubmit={this.saveFormData} className="p-4">
                <h3>Create New Page/Post</h3>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        name="content"
                        rows="6"
                        value={this.state.content}
                        onChange={this.handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        name="CategoryId"
                        className="form-select"
                        value={this.state.CategoryId}
                        onChange={this.handleInputChange}
                    >
                        <option value="">Select a category</option>
                        {this.state.categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Content Type</label>
                    <select
                        name="ContentTypeId"
                        className="form-select"
                        value={this.state.ContentTypeId}
                        onChange={this.handleInputChange}
                    >
                        <option value="">Select type</option>
                        {this.state.types.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        );
    }
}

export default DashboardForm;
