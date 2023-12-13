const User = require('../models/users');
const Employee = require('../models/employee');
const Feedback = require('../models/feedback');

// display the page when the user logs in 
module.exports.mainView = async function(req, res){
    let users = await User.find({});
    // console.log(users);
    let employees = await Employee.find({});
    console.log(employees)
    return res.render('list_of_employees',{
        title: 'Employee Review | List of Employees',
        all_users: users,
        all_employees: employees
    })
}

// add the employee to the data base
module.exports.addEmployee = async function(req, res){
    try{
        let employee = await Employee.create(req.body);
        return res.redirect('back');
    
    }catch(err){
        console.log('Error when trying to add employee to the database', err);
    }
    
}

//create feedback for an employee
module.exports.addFeedback = function(req, res){
    // try{
    //     let employee =await Employee.findById(req.body.employee);
    //     if(employee){
    //         let feedback = await Feedback.create({
    //             content: req.body.content,
    //             employee: req.body.employee,
    //             user: req.user._id
    //         });
    //         employee.feedback.push(feedback);
    //         employee.save();
    //         return res.redirect('back');
    //     }
    // }catch(err){
    //     console.log('Error while storing the feedback in the database',err);
    // }
    Employee.findById(req.body.employee).then(function(employee){
        if(employee){
            Feedback.create({
                content: req.body.content,
                employee: req.body.employee,
                user: req.user._id
            }).then(function(feedbacks){
                employee.feedback.push(feedbacks);
                employee.save();
                return res.redirect('back');
            })
        }
    })
}

// show the list of empolyee reivews
module.exports.showList = async function(req, res){
    try{
        let employee = await Employee.find({})
        .populate({
            path: 'feedback',
            populate: {
                path: 'user'
            }
        })
        console.log(employee);
        console.log(employee[0].employee_name);
        console.log(employee[0].feedback.content);
        return res.render('review_list', {
            title: 'Employee Review List',
            employee_details : employee
        });
    }catch(err){
        console.log('Error while fetching the data from the database', err);
    }
}