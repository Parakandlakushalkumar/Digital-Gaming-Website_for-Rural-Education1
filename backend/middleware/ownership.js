export const requireSelf = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (req.user.userId === req.params.id) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied',
  });
};

export const requireTeacherSelf = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (req.user.role === 'teacher' && req.user.userId === req.params.id) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied',
  });
};

export const requireTeacherOwnership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  const teacherId = req.params.teacherId || req.body.teacherId;
  if (req.user.role === 'teacher' && teacherId && req.user.userId === teacherId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied',
  });
};
