const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find({})
        .then(employees => {
            res.render('index', {employees});
        })
        .catch(error => {
            req.flash('error_msg', 'Error: '+error);
        })
});

router.get('/employee/new', (req, res) => {
    res.render('new');
});

router.get('/employee/search', (req, res) => {
    res.render('search', {employee: ''});
});

router.get('/employee', (req, res) => {
    if(req.query.name == ''){
        res.render('search', {employee: ''});
    }
    let searchQuery = {name: req.query.name};
    Employee.findOne(searchQuery)
        .then(employee => {
            res.render('search', {employee});
        })
        .catch(error => {
            console.log(error);
            req.flash('error_msg', 'Error: '+error);
            res.redirect('/');
        })
});

router.get('/edit/:id', (req, res) =>{
    let searchQuery = { _id : req.params.id};
    Employee.findOne(searchQuery)
        .then(employee => {
            res.render('edit', {employee});
        })
        .catch(error => {
            console.log(error);
            req.flash('error_msg', 'Error: '+error);
            res.redirect('/');
        });
});


router.post('/employee/new', (req,res) => {
    let newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    };
    Employee.create(newEmployee)
        .then(employee => {
            req.flash('success_msg', 'Employee Added Successfully');
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
            req.flash('error_msg', 'Error: '+error);
            res.redirect('/');
        })
});

router.put('/edit/:id', (req, res) => {
    let searchQuery = {_id: req.params.id};

    Employee.updateOne(searchQuery, {$set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }})
    .then(employee => {
        req.flash('success_msg', 'Employee Data updated Successfully');
        res.redirect('/');
    })
    .catch(error => {
        console.log(error);
        req.flash('error_msg', 'Error: '+error);
            res.redirect('/');
    });
})

router.delete('/delete/:id', (req, res) => {
    let searchQuery = {_id: req.params.id};

    Employee.deleteOne(searchQuery)
        .then(employee => {
            req.flash('success_msg', 'Employee Deleted Successfully');
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
            req.flash('error_msg', 'Error: '+error);
            res.redirect('/');
        });
});

module.exports = router;