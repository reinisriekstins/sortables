var express = require('express');
var router = express.Router();

// reads pages.json file, on success renders
// the json data to the index.ejs file and sends that
// to the client
router.get('/', function(req, res, next) {
  var data;
  var fs = require('fs');
  fs.readFile('./pages.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    else {
      res.render(
        'index',
        { pages: data});
    }
  });
});

// receives the new order of pages and saves it to pages.json
router.post('/', function(req, res, next) {
  // stringifies the request body
  /// for some reason req.body is an object
  /// instead of a string, despite jQuery posting
  /// text via http
  var pages = JSON.stringify(req.body);

  // removes uneccesary coating that is added
  // when reveiving the file
  var eof = pages.lastIndexOf('}');
  pages = pages.slice(4, eof - 6);
  eof = pages.lastIndexOf(']');

  // removes the unnecessary backslashes
  var first = pages.indexOf('\\');
  while (first != -1) {
    pages = pages.replace('\\', '');
    first = pages.indexOf('\\');
  }

  pages = `[{${pages}}]`;

  // writes the json string to the pages.json file
  var fs = require('fs');
  fs.writeFile('./pages.json', pages);
});

module.exports = router;
