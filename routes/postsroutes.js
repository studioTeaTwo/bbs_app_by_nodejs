var router = require('express').Router();
var posts = require('./postscontroller.js');

router.route('/')
  .post(posts.addRecord)
  .get(posts.getRecords);

module.exports = router;
