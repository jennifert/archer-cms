import React, { Component } from 'react';
import DashboardForm from './dashboard_form.jsx';
import DashboardTable from './dashboard_table.jsx';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard: [],
            showForm: false,
            editingPost: null, // ← used for editing
        };

        this.fetchDashboard = this.fetchDashboard.bind(this);
        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
    }

    componentDidMount() {
        this.fetchDashboard();
    }

    async fetchDashboard() {
        try {
            const res = await fetch('/api/page');
            const dashboard = await res.json();
            console.log("📦 fetched pages:", dashboard);
            this.setState({ dashboard, showForm: false, editingPost: null });
        } catch (err) {
            console.error("🔥 Error loading dashboard:", err);
        }
    }

    handleAddNew() {
        this.setState({ showForm: true, editingPost: null });
    }

    handleEdit(post) {
        this.setState({ showForm: true, editingPost: post });
    }

    handleFormClose() {
        this.fetchDashboard(); // refresh & hide form
    }

    render() {
        const { dashboard, showForm, editingPost } = this.state;

        return (
            <div className="p-4">
                <h2>Dashboard</h2>
                {!showForm && (
                    <button onClick={this.handleAddNew}>
                        Add Post/Page
                    </button>
                )}

                {showForm ? (
                    <DashboardForm
                        user={this.props.user}
                        post={editingPost}
                        onSave={this.handleFormClose}
                    />
                ) : (
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Author</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboard.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">
                                        No pages or posts found. Click "Add Post/Page" to create one.
                                    </td>
                                </tr>
                            ) : (
                                dashboard.map(post => (
                                    <DashboardTable
                                        key={post.id}
                                        {...post}
                                        author={this.props.user}
                                        onDelete={this.fetchDashboard}
                                        onEdit={this.handleEdit}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Dashboard;
