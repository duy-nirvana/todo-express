module.exports.postCreate = (req, res, next) => {
  let errors = [];
  
  if (!req.body.name) {
    errors.push('Name is required');
  }
  
  if (!req.body.phone) {
    errors.push('Phone is required');
  }
  
  if (req.body.name.length > 30) {
    errors.push('Your name is too long!') 
  }
  
  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    }) 
    return;
  }
  
  next();
}