module.exports.mainView = function(req, res){
    if (req.isAuthenticated()){
        return res.render('list_of_employees',{
            title: 'Employee Review | List of Employees'
        })
    }
}