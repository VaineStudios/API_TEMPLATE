const assert = require('assert');
const mongoose = require("mongoose");
const User = require("../../../schemas/user.schema")
beforeEach(async function(){
    const conn = mongoose.connect("mongodb://localhost:27017/MONGO_EXPRESS_API");

})


// Describes the test suite, or a set of tests 
describe('User Schema', function(){

    // Create tests with the it function
    it("should not accept an empty document", async function(){
        let user = new User({})
        try{
            await user.save();
        }catch(error){
            console.log(error.errors["first_name"] instanceof mongoose.Error.ValidatorError);
            assert(error.errors["first_name"] instanceof mongoose.Error.ValidatorError);
        }
        // async operation saves item to the database
        // isNew will be false if the value is already saves in the database
        // assert.equal(user.isNew, false);
        // 
        
    })
    it("should save a user", async function(){
        let user = new User({
            first_name: "John",
            last_name: "Harvey",
            password: "password",
            phone: "876-768-4832",
            email: "user@example.com"
        });

        await user.save();

        assert.equal(user.isNew, false);
    })
})