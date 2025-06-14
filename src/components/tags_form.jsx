import React from 'react';

class TagForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.tag?.name || '',
            error: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({ name: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { mode, tag, fetchTags, onClose } = this.props;
        const url = mode === 'Edit' ? `/api/tags/${tag.id}` : '/api/tags/';
        const method = mode === 'Edit' ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    date: new Date(),
                })
            });

            if (res.ok) {
                this.setState({ name: '', error: null });
                fetchTags();
                onClose();
            } else {
                const error = await res.json();
                this.setState({ error: error.error || 'An error occurred.' });
            }
        } catch (err) {
            console.error('Submit error:', err);
            this.setState({ error: 'Network or server error.' });
        }
    }

    render() {
        const { mode, onClose } = this.props;
        const { name, error } = this.state;

        return (
            <form className="tag-form" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>{mode} Tag</legend>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                <label>Tag Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Tag name"
                    value={name}
                    onChange={this.handleInputChange}
                    required
                />
                </div>
                
                <button type="submit">
                        Save
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </fieldset>
            </form>
        );
    }
}

export default TagForm;
