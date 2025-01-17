const express = require('express');
const router = express.Router();

//importing User Model
const Employee = require('../Models/ Employees.js')

//getting all the users from the Db
router.get('/getEmployees', async (req, res) => {

    try {

        const AllEmployees = await Employee.find()
        res.json(AllEmployees)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message })
    }

})

//Getting Employee by id 
router.get('/getEmployee/:id', async (req, res) => {

    try {

        const { id } = req.params

        const oneEmployee = await Employee.findById(id)

        res.json(oneEmployee)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message })
    }




})

// Registering Employee

router.post('/Register',async (req, res) => {

        try {

            //Destructuring data from request
            const { name, email, phone, city } = req.body
        
            let isEmployeeRegisterd = await Employee.findOne({ email });
            if (isEmployeeRegisterd) {
                return res.status(400).json({ error: "Email already exists" })
            }

            //Registering Employee in the Db
            const RegisterdEmployee = await Employee.create({
                name, email, phone, city 

            })

            //sending added Employee in response
            res.json({
                message: ' Successfully Registerd',
                data: RegisterdEmployee
            })





        } catch (error) {


            res.status(500).json({ message: error.message })

        }


    });

//updating Employee

router.put('/updateEmployee/:id', async (req, res) => {

    try {

        //Destructuring data from request
        const { name, email, phone, city } = req.body


        const updatingEmployee = {};
        if (name) { updatingEmployee.name = name };
        if (email) { updatingEmployee.email = email };
        if (phone) { updatingEmployee.phone = phone };
        if (city) { updatingEmployee.city = city };

        // Find the Employee to be updated and update it

        const { id } = req.params

        const updatedEmployee = await Employee.findByIdAndUpdate(id, { $set: updatingEmployee }, { new: true })

        res.json({
            message: "Employee updated  Successfully",
            data: updatedEmployee
        })



    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message })
    }



})

//Deleting Employee

router.delete("/deleteEmployee/:id", async (req, res) => {

    try {

        const { id } = req.params
  
            const deletedEmployee = await Employee.findByIdAndDelete(id, { new: true })


            res.json({
                message: "Employee Deleted Successfully",
                data: deletedEmployee
            })






    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message })
    }

})



module.exports = router