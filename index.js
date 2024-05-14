#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
// Define a class for the Student
class Student {
    static counter = 10000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to View A Student Balance
    view_balance() {
        console.log(chalk.bold.yellow.italic(`Balance For ${this.name} : ${this.balance}`));
    }
    //  Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.bold.green.italic(`$${amount} Fees Paid Successfully For ${this.name}`));
        console.log(chalk.bold.red.italic(`Remaining Balance: $${this.balance}`));
    }
    //   display the student status
    show_status() {
        console.log(chalk.bold.yellow.italic(`ID: ${this.id}`));
        console.log(chalk.bold.yellow.italic(`Name: ${this.name}`));
        console.log(chalk.bold.yellow.italic(`Courses: ${this.courses}`));
        console.log(chalk.bold.yellow.italic(`Balance: ${this.balance}`));
    }
}
// defining a student manager class to manage students
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    //   method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.bold.yellow.italic(`Student: ${name} added successfully. Student ID: ${student.id}`));
    }
    // method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.students.find((std) => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.bold.blue.italic(`${student.name} enrolled in ${course} successfully`));
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.bold.red.italic("Student not found. Please enter a correct student ID"));
        }
    }
    //  Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.bold.red.italic("Student not found. Please enter a correct student ID"));
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Find a student by student_id
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
//  Main function to run the program
async function main() {
    console.log(chalk.bold.yellow.italic("=".repeat(60)));
    console.log(chalk.bold.red.italic("\n\tWELCOME TO STUDENT MANAGEMENT SYSTEM\n"));
    console.log(chalk.bold.yellow.italic("=".repeat(60)));
    let student_manager = new StudentManager();
    //    while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Choose an option:",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay fees",
                    "Show student status",
                    "Exit",
                ],
            },
        ]);
        // using switch case  for user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name:",
                    },
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name:",
                    },
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    },
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount To Pay:",
                    },
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show student status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:",
                    },
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main();
