export const listApiEndpoints = (app) => (req, res) => {
    const routes = [];
    const routeDescriptions = {
        '/api/login': 'User login',
        '/api/logout': 'User logout',
        '/api/signup': 'Create user account',
        '/api/me': 'Get current user info',
        '/api/page': 'Page list & create',
        '/api/page/:id': 'Get/update/delete single page',
        '/api/categories': 'List & create categories',
        '/api/categories/:id': 'Manage individual category',
        '/api/tags': 'List & create tags',
        '/api/tags/:id': 'Manage individual tag',
        '/api/types': 'Get all content types',
        '/api/type': 'Create a content type',
        '/api/type/:id': 'Manage a single content type',
        '/api/images/headers': 'List header images',
        '/api/images/header/upload': 'Upload header image',
        '/api/images/header/:id': 'Delete header image',
        '/api/settings/endpoints': 'This list of API endpoints'
    };

    const extractRoutes = (stack, basePath = '') => {
        stack.forEach((layer) => {
            if (layer.route && layer.route.path) {
                const path = basePath + layer.route.path;
                const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase());
                methods.forEach(method => {
                    routes.push({
                        method,
                        path,
                        description: routeDescriptions[path] || '—'
                    });
                });
            } else if (layer.name === 'router' && layer.handle.stack) {
                const match = layer.regexp?.source
                    ?.replace('^\\/', '/')
                    ?.replace('\\/?(?=\\/|$)', '')
                    ?.replace(/\\\//g, '/')
                    ?.replace(/\$$/, '') || '';
                extractRoutes(layer.handle.stack, basePath + match);
            }
        });
    };

    extractRoutes(app._router.stack, '');

    const cleanRoutes = routes.filter(r => r.path.startsWith('/api/'));

    res.json(cleanRoutes);
};