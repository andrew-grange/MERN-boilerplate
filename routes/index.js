const express = require('express');
const router = express.Router();
/* GET: home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Writers Clearing House' });
});
/* POST:*/
module.exports = router;
