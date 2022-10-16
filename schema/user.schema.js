const {model, Schema} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    first_name : {
        type: String, 
        unique: [true, "name already exist in the database"]
    }, 
    last_name : {
        type: String, 
        required: [true, "Last name is a required field"]
    }, 
    image: {
        type: String
    },
    email: {
        type: String, 
        unique: [true, "Email already exist in the database"]
    },
    password: {
        type: String, 
        required: [true, "Password was not provided"]
    },
    phone: {type: String, required: [true, "Phone number was not provided"]},
    isSuperAdmin:{
        type: Boolean,
        default: false,
    }
   

});


// Middleware function to execute and hash password before saving user into the database.

userSchema.pre("save", async function(next){
    try{
        if(!this.isModified('password')) return next(); 
        this.password = await bcrypt.hash(this.password,10);       
        this.isSuperAdmin = false;
    }catch(error){
        return Promise.reject(new Error(error.message));
    }
    
});


userSchema.post("save", async function(doc){
    doc = removeSensitiveFields(doc);
});

userSchema.pre("findOneAndUpdate", async function(next){    
    try{
        if(this._update.password) {
            this._update.password = await bcrypt.hash(this._update.password, 10)
        }
    }catch(error){
        return Promise.reject(new Error(error.message));
    }
});


userSchema.post(/^find/, async function(doc){
    if(Array.isArray(doc)){
        for(let file of doc){
            file = removeSensitiveFields(file);
        }
    }else {
        if(!doc) return Promise.reject(new Error("No File found"));

        // checks to see if the operation is findOne and if there is an email in the conditions
        if(!(this.op == "findOne" && this._conditions.email)) {
            doc = removeSensitiveFields(doc);

        }
    }
});


function removeSensitiveFields(doc){
    doc.isSuperAdmin = undefined;
    doc.password = undefined;   
    return doc
}
// Instance method to check for a password to compare a password with the encrypted password on the instance document.
userSchema.methods.isCorrectPassword = async function(password){
    let isCorrect = await bcrypt.compare(password, this.password);
    return isCorrect;
}


module.exports = model("User", userSchema);