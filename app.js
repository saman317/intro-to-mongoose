const dotenv=require("dotenv");
const Customer = require("./models/customers.js")
dotenv.config();
const mongoose = require("mongoose");
const prompt = require('prompt-sync')();
 const message= "Welcome to CRM!"


// console.log(`Your name is ${username}`);


const connect= async()=>{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB")
}

async function mainMenu(){


console.log(message)
let stopPrompt= false
while(!stopPrompt){
console.log(`What would you like to do? 
    1.Create a customer 
    2.View all customers 
    3.Update a customer
    4.Delete a customer
    5.quit`)

const choice = prompt("Choose your number.")
switch(choice){
    case "1":
        await createCustomer();
        break;
    case "2":
        await getAllCustomers();
        break;
    case "3":
        await updateCustomer();
        break;
    case "4":
        await deleteCustomer();
        break;
    case "5":
        stopPrompt=true
        break;
    default:
        console.log("Invalid number try again.")
    

}
mongoose.connection.close();
}}
async function createCustomer(){
    const username = prompt('What is your name? ')
    const age= prompt("How old are you?")
    const newCustomer = {
        name: username,
        age: age
       }
       
       const createdCustomer= await Customer.create(newCustomer);
       console.log(createdCustomer)
}




 async function getAllCustomers(){
   const customers = await Customer.find({});
   console.log(customers)
}


async function updateCustomer(){
    console.log("Below is a list of customers")
    const customers =await Customer.find({});
    console.log(customers)
    const id = prompt("Copy and paste the id of the customer you're looking for.")
    const updatedName= prompt("What is the updated name?")
    const updatedAge= prompt("What is your updated age?")
    const updatedCustomer= await Customer.findByIdAndUpdate(
        id,
        {
            name: updatedName,
            age:updatedAge
        },
        {
            new:true
        }
    );
    console.log(updatedCustomer)
}


   async function deleteCustomer(){
    const id=prompt("Copy and paste the id of the customer you want to delete ")
    const removedCustomer= await Customer.findByIdAndDelete(id)
    console.log("Removed customer: ", removedCustomer)
   }

    
connect().then(()=>{
    mainMenu();

})