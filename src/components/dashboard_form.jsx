import React, { Component } from 'react';

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

        const {
            title,
            content,
            CategoryId,
            ContentTypeId
        } = this.state;

        if (!CategoryId || !ContentTypeId) {
            console.error('❌ Category and content type are required.');
            return;
        }

        const payload = {
            title,
            content,
            CategoryId: Number(CategoryId),
            ContentTypeId: Number(ContentTypeId)
        };

        this.setState({ loading: true });

        const method = this.props.post ? 'PUT' : 'POST';
        const url = this.props.post
            ? `/api/page/${this.props.post.id}`
            : '/api/page';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                console.error('❌ Save failed:', await res.text());
                this.setState({ loading: false });
                return;
            }

            this.setState({ loading: false });

            if (this.props.onSave) {
                this.props.onSave();
            }
        } catch (err) {
            console.error('🔥 Save error:', err);
            this.setState({ loading: false });
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
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="6"
                            value={this.state.content}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="CategoryId"
                            value={this.state.CategoryId}
                            onChange={this.handleInputChange}
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>

                            {this.state.categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="content-type">Content Type</label>
                        <select
                            id="content-type"
                            name="ContentTypeId"
                            value={this.state.ContentTypeId}
                            onChange={this.handleInputChange}
                            required
                        >
                            <option value="" disabled>
                                Select a type
                            </option>

                            {this.state.types.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
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
