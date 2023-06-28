const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getHomePage = (req, res) => {
    res.render('index', {
        message: "Welcome to the home page of Login System designed by Saurav Navdhare",
        loginLink: '/login',
        registerLink: '/register'
    })
}

exports.getRegisterPage = (req, res) => {
    const token = req.cookies["token"];
    if (token) return res.redirect('/dashboard');
    const message = req.query.message || "";
    res.render('register', {
        loginLink: '/login',
        message
    });
}

exports.getLoginPage = (req, res) => {
    const token = req.cookies["token"];
    if (token) return res.redirect('/dashboard');
    message = req.query.message || "";
    res.render('login', {
        registerLink: '/register',
        message
    });
}

exports.register = async (req, res) => {
    let { name, username, email, password } = req.body;

    name = name.trim();     // Remove leading and trailing spaces
    username = username.trim();
    email = email.trim();
    password = password.trim();
    
    if (!name || !username || !email || !password) return res.redirect(`/register?message=${encodeURIComponent("Please enter all fields")}`);
            // If using REST API, simply return res.status(400).json({ message: "Please enter all fields" });
    
    if (username.split(" ").length != 1)    // Check if username contains spaces
        return res.redirect(`/register?message=${encodeURIComponent("Username cannot contain spaces")}`)
            // If using REST API, simply return res.status(400).json({ message: "Username cannot contain spaces" });

    if (password.split(" ").length != 1)    // Check if password contains spaces
        return res.redirect(`/register?message=${encodeURIComponent("Password cannot contain spaces")}`)
            // If using REST API, simply return res.status(400).json({ message: "Password cannot contain spaces" });

    try {
        let user = await userSchema.findOne({ username: {$eq: username} });  // Taking care of vulnerabilities like SQL Injection using $eq
        if (user)
            return res.status(409).redirect(`/register?message=${encodeURIComponent("User already exists with the same username! Please proceed to login")}`);
            // If using REST API, simply return res.status(409).json({ message: "User already exists with the same username! Please proceed to login" });
        
        user = await userSchema.findOne({ email: {$eq: email} });   // Taking care of vulnerabilities like SQL Injection using $eq
        if (user)
            return res.status(409).redirect(`/register?message=${encodeURIComponent("User already exists with the same email! Please proceed to login")}`);
            // If using REST API, simply return res.status(409).json({ message: "User already exists with the same email! Please proceed to login" });

        const encPass = await bcrypt.hash(password, 10);    // Encrypt password

        const newUser = new userSchema({
            name,
            username,
            email,
            password: encPass
        });

        await newUser.save();   // Save user to database
        return res.status(200).redirect('/login');

    } catch (err) {
        console.log(err)
        return res.status(500).redirect(`/register?message=${encodeURIComponent("Something went wrong")}`);
            // If using REST API, simply return res.status(500).json({ message: "Something went wrong" });
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.redirect(`/login?message=${encodeURIComponent("Please enter all fields")}`);
        // If using REST API, simply return res.status(400).json({ message: "Please enter all fields" });

    try {
        const user = await userSchema.findOne({ username: {$eq: username} });   // Taking care of vulnerabilities like SQL Injection using $eq
        if (!user)
            return res.status(401).redirect(`/login?message=${encodeURIComponent("Username or password incorrect")}`);
            // If using REST API, simply return res.status(401).json({ message: "Username or password incorrect" });

        const isMatch = await bcrypt.compare(password, user.password);  // Compare password
        if (!isMatch)
            return res.status(401).redirect(`/login?message=${encodeURIComponent("Username or password incorrect")}`);
            // If using REST API, simply return res.status(401).json({ message: "Username or password incorrect" });

        const token = jwt.sign({ username, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).redirect(`/dashboard`);
    } catch (err) {
        console.log(err)
        return res.status(500).redirect(`/login?message=${encodeURIComponent("Something went wrong")}`);
            // If using REST API, simply return res.status(500).json({ message: "Something went wrong" });
    }
}

exports.logout = (req, res) => {
    if (req.cookies["token"])
        res.clearCookie("token");  // Clear the cookie
    res.redirect('/login');
}

exports.getDashboardPage = (req, res) => res.render('dashboard', {
    username: req.username,
    name: req.name
})