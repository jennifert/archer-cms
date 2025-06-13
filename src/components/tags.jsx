import React from 'react';
import TagForm from './tags_form.jsx';

class Tags extends React.Component {
    constructor() {
        super();
        this.state = {
            tags: [],
            selectedTag: null, // { id, name } or null
            mode: '', // 'Add' or 'Edit'
        };

        this.fetchTags = this.fetchTags.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    componentDidMount() {
        this.fetchTags();
    }

    fetchTags() {
        fetch('/api/tags/', {
            method: 'GET',
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(json => this.setState({ tags: json }));
    }

    openForm(mode, tag = null) {
        this.setState({
            selectedTag: tag,
            mode: mode,
        });
    }

    closeForm() {
        this.setState({ selectedTag: null, mode: '' });
    }

    async deleteTag(id) {
        const confirmed = window.confirm('Are you sure you want to delete this tag? This action cannot be undone.');
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/tags/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!res.ok) {
                const error = await res.json();
                alert(`Failed to delete tag: ${error.error}`);
                return;
            }

            this.fetchTags();
        } catch (err) {
            console.error('🔥 deleteTag error:', err);
            alert('Something went wrong trying to delete the tag.');
        }
    }

    render() {
        const { tags, mode, selectedTag } = this.state;

        return (
            <main className="tags">
                <h1>Tags</h1>

                <div className="content">
                    <button className="btn btn-success mb-3" onClick={() => this.openForm('Add')}>
                        <i className="fa fa-plus"></i> Add New Tag
                    </button>

                    {mode && (
                        <TagForm
                            mode={mode}
                            tag={selectedTag}
                            fetchTags={this.fetchTags}
                            onClose={this.closeForm}
                            user={this.props.user}
                        />
                    )}

                    <table className="table table-condensed table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>User</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map(tag => (
                                <tr key={tag.id}>
                                    <td>{(new Date(tag.date)).toISOString().substring(0, 10)}</td>
                                    <td>{tag.name}</td>
                                    <td>{tag.User?.name || 'Unknown'}</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => this.openForm('Edit', tag)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger"
                                            onClick={() => this.deleteTag(tag.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}

export default Tags;
