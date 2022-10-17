const { JSONResponse } = require("../utilities/jsonResponse");

const JWT = require("jsonwebtoken");
const JWTHelper = require("../../../utilities/token.utility");

class Middleware{

    /**
     * ### Description
     * Gets the requests then checks to ensure therer is a authorization header present. If there is it gets the token and assigns it to the request as a token property.
     * @param {Request} req 
     * @param {Response} res 
     * @param {*} next 
     */
    static isAuthenticated = async (req, res, next) => {
        try{
            const decoded_token = JWTHelper.getToken(req, res,"Jwt-token");
            if(decoded_token){
                req.user = decoded_token;
                next();
            } else {
                // Forbidden
                JSONResponse.error(res, "Unauthorized Access Attempted","Access Denied", 403);        }
        }catch(error){
            JSONResponse.error(res, "Unauthorized Access Attempted",error, 403); 
        }
    }
    static isSuperAdmin = (req, res, next)=>{
        if(req.user.isSuperAdmin){
            next()
        }else{
            JSONResponse.error(res, "Unauthorized Access Attempted", "You do not have the permission to access this data", 403);
        }
    }

    static isUserOrSuperAdmin = (req, res, next)=>{
        if(req.params.id != req.user.id){
            return this.isSuperAdmin(req, res,next);
        }else{
            next();
        }
    }

    
}

module.exports = Middleware;