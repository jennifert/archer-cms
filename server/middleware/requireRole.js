// TODO: Implement role-based access control
export default function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
}
