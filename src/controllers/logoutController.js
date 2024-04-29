export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal server error');
    } else {
      res.redirect('/login');
    }
  });
}