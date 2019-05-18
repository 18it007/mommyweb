const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Get gig list
router.get('/', (req, res) => 
	Gig.findAll()
	    .then(gigs => res.render('gigs', {
        	gigs
      	}))
	    .catch(err => console.log(err)));
// Display add gig form
router.get('/add', (req, res) => res.render('add'));
//Display advice page
router.get('/advice', (req, res) => res.render('advice'));
//Display news page
router.get('/news', (req, res) => res.render('news'));
//Display news page
router.get('/choose', (req, res) => res.render('choose'));
//Display news page
router.get('/details', (req, res) => res.render('details'));
//Display introduce page
router.get('/intro', (req, res) => res.render('intro'));
//Display forum page
router.get('/forum', (req, res) => res.render('forum'));
//Display sign in page
router.get('/signin', (req, res) => res.render('signin'));
//Display sign in page
router.get('/signup', (req, res) => res.render('signup'));
//Display profile page
router.get('/profile', (req, res) => res.render('profile'));
// Add a gig
router.post('/add', (req, res) => {
	let { title, technologies, description, contact_email } = req.body;
	let errors = [];
 // Validate Fields
	if(!title) {
  errors.push({ text: 'Xin hãy thêm tên bài viết' });
 }
 if(!technologies) {
  errors.push({ text: 'Xin hãy thêm chủ đề' });
 }
 if(!description) {
  errors.push({ text: 'Xin hãy thêm nội dung' });
 }
 if(!contact_email) {
  errors.push({ text: 'Xin để lại tên của bạn' });
 }

 // Check for errors
 if(errors.length > 0) {
   res.render('add', {
     errors,
     title, 
     technologies, 
     description, 
     contact_email
   });
  } 
 else {
 // Make lowercase and remove space after comma
 technologies = technologies.toLowerCase().replace(/, /g, ',');
	// Insert into table
 Gig.create({
   title,
   technologies,
   description,
   contact_email
 })
   .then(gig => res.redirect('/gigs'))
   .catch(err => console.log(err));
 }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
});
module.exports = router;
