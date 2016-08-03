var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// receives the new order of pages and saves it to pages.json
router.post('/', function(req, res, next) {
   // receives the request object and assigns it's
   // relevant data to the pages variable
   var pages = req.body;
   pages = JSON.stringify(pages);

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

   pages = '{' + pages + '}';

   // writes the pages oject string to json file
   var fs = require('fs');
   fs.writeFile('./pages.json', pages);
});

module.exports = router;
