import express from 'express'

var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  
  console.log("Routing reached GET in index page");
  
  res.render('./index');
  // res.render(
  //   'index', <>
  //   <p> This is a test run</p>
  //   </>
  // )
  //res.render('index', { title: 'Express' });
});

export default indexRouter;