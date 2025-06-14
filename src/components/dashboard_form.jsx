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
            <form onSubmit={this.saveFormData} className="dashboard-form">
                <fieldset>
                    <legend>Create New Page/Post</legend>

                    <div className="mb-3">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Content</label>
                        <textarea
                            name="content"
                            rows="6"
                            value={this.state.content}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Category</label>
                        <select
                            defaultValue="Select a category"
                            name="CategoryId"
                            value={this.state.CategoryId}
                            onChange={this.handleInputChange}
                        >
                            <option disabled={true}>Select a category</option>
                            {this.state.categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Content Type</label>
                        <select
                            defaultValue="Select a type"
                            name="ContentTypeId"
                            value={this.state.ContentTypeId}
                            onChange={this.handleInputChange}
                        >
                            <option disabled={true}>Select a type</option>
                            {this.state.types.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Save</button>
                </fieldset>
            </form>
        );
    }
}

export default DashboardForm;
