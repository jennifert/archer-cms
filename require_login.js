// TODO: Expand to support role-based access using requireRole('admin')
export default (req, res, next) => {
  console.log('📦 Session:', req.session);
  console.log('👤 User:', req.user);
  
  if (!req.user) {
    res.sendStatus(401);
  } else {
    next();
  }
};
