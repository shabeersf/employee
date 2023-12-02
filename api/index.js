const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");


const app = express();
const port = 8000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://admin:admin@cluster0.zvfrt0j.mongodb.net/employee").then(() => {
    console.log("connected to mongodb")
}).catch((err) => {
    console.log("error connecting to mongodb", err)
})

const Employee = require('./models/employee')
const Attendance = require('./models/attendance')

app.listen(port, () => console.log(`server is running on port : ${port}`))

// endpoint for register an employee
app.post("/addEmployee", async (req, res) => {

    try {

        const { employeeName, employeeId, designation, joiningDate, dateOfBirth, salary, activeEmployee, address, phoneNumber } = req.body; // Fix here
        // Create a new employee

        const newEmployee = new Employee({
            employeeName,
            employeeId,
            designation,
            joiningDate,
            dateOfBirth,
            salary,
            activeEmployee,
            address,
            phoneNumber,
        })

        await newEmployee.save()
        res.status(200).json({ message: "Employee saved successfully", employee: newEmployee })

    } catch (error) {
        console.log("error creating employee", error)
        res.status(500).json({ message: "failed to add an employee" })
    }
})


// endpoint for fetching employees
app.get("/employees", async (req, res) => {
    try {

        const employees = await Employee.find();

        res.status(200).json(employees);

    } catch (error) {
        console.log("error fetching employees", error);
        res.status(500).json({ message: "Failed to retrieve the employees" });
    }
});

app.post("/attendance", async (req, res) => {

    try {

        const {employeeId, employeeName,  date, status } = req.body; // Fix here
        // Create a new attendance
        const existingAttendance = await Attendance.findOne({ employeeId:employeeId, date:date });

        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save()
            res.status(200).json(existingAttendance);
        }
        else {
            const newAttendance = new Attendance({
                employeeId, employeeName, date:date, status
            })
            await newAttendance.save()
            res.status(200).json(newAttendance);
        }

    } catch (error) {
        console.log("Error submitting the attendance", error)
        res.status(500).json({ message: "Error submitting the attendance" })
    }
})

app.get("/attendance", async (req, res) => {
    try {

        const date = req.query;
        
        const dates = moment(date.date).format("MMMM D, YYYY")

        const attendanceData = await Attendance.find({ date:dates })
        // console.log("existing data",attendanceData,dates,date)
        res.status(200).json(attendanceData);

    } catch (error) {
        console.log("error fetching attendance", error);
        res.status(500).json({ message: "Failed to retrieve the attendance" });
    }
});

app.get("/attendance-report-all-employees", async (req, res) => {
    try {
      const month = req.query.month;
      const year = req.query.year;
  
      console.log("Query parameters:", month, year);
      // Calculate the start and end dates for the selected month and year
      const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
        .startOf("month")
        .toDate();
      const endDate = moment(startDate).endOf("month").toDate();
  
      // Aggregate attendance data for all employees and date range
      const report = await Attendance.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    { $month: { $dateFromString: { dateString: "$date" } } },
                    parseInt(req.query.month),
                  ],
                },
                {
                  $eq: [
                    { $year: { $dateFromString: { dateString: "$date" } } },
                    parseInt(req.query.year),
                  ],
                },
              ],
            },
          },
        },
  
        {
          $group: {
            _id: "$employeeId",
            present: {
              $sum: {
                $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
              },
            },
            absent: {
              $sum: {
                $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
              },
            },
            halfday: {
              $sum: {
                $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
              },
            },
            holiday: {
              $sum: {
                $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
              },
            },
          },
        },
        {
          $lookup: {
            from: "employees", // Name of the employee collection
            localField: "_id",
            foreignField: "employeeId",
            as: "employeeDetails",
          },
        },
        {
          $unwind: "$employeeDetails", // Unwind the employeeDetails array
        },
        {
          $project: {
            _id: 1,
            present: 1,
            absent: 1,
            halfday: 1,
            name: "$employeeDetails.employeeName",
            designation:"$employeeDetails.designation",
            salary: "$employeeDetails.salary",
            employeeId: "$employeeDetails.employeeId",
          },
        },
      ]);
  
      res.status(200).json({ report });
    } catch (error) {
      console.error("Error generating attendance report:", error);
      res.status(500).json({ message: "Error generating the report" });
    }
  });