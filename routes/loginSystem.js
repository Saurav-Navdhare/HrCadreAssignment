const Router = require("express").Router(); // Import express router
const auth = require("../middlewares/auth");    // Import auth middleware
const userControllers = require("../controllers/loginSystem.js");   // Import controllers

Router.get("/", userControllers.getHomePage);   // GET request to home page

Router.get("/register",  userControllers.getRegisterPage);  // GET request to register page

Router.get("/login", userControllers.getLoginPage);   // GET request to login page

Router.get("/logout", userControllers.logout);  // GET request to logout

Router.post("/register", userControllers.register);  // POST request to register

Router.post("/login", userControllers.login);   // POST request to login

Router.get("/dashboard", auth.authenticateToken, userControllers.getDashboardPage); // GET request to dashboard with middleware

module.exports = Router;