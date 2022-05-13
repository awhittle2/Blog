const express = require("express"); // Allows for the use of express
const bodyParser = require("body-parser"); // Allows for the use of body parser which allows us to read user input from a HTML form
const ejs = require("ejs"); // Allows for the use of ejs which allows us to create layouts and templates
const _ = require("lodash"); // Allows for the use of lodash which allows us to format the dynamic urls

const app = express(); // Required for express
app.set("view engine", 'ejs'); // Required for ejs
app.use(bodyParser.urlencoded({extended: true})); // Required for body parser
app.use(express.static("public")); // Allows for the use of static files such as our css

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."; // Body of the home route
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."; // Body of the about route
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."; // Body of the contact route

const posts = [{title: "Day 1", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet porttitor eget dolor morbi non arcu. Purus gravida quis blandit turpis cursus in hac habitasse. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Bibendum ut tristique et egestas quis ipsum. Magna etiam tempor orci eu lobortis elementum nibh. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Ac tortor dignissim convallis aenean et tortor at risus. Mattis rhoncus urna neque viverra justo nec. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. In metus vulputate eu scelerisque felis. Ut sem viverra aliquet eget sit amet. Nulla aliquet porttitor lacus luctus accumsan tortor."}] // Creates 1 blog post


app.get("/", function(req, res) { // Creates a root route
    res.render("home", {homeStartingContent: homeStartingContent, posts: posts}); // Renders the template made with ejs to this route
});

app.get("/about", function(req, res) { // Creates an about route
    res.render("about", {aboutContent: aboutContent}); // Renders the template made with ejs to this route
});

app.get("/contact", function(req, res) { // Creates a contact route
    res.render("contact", {contactContent: contactContent}); // Renders the template made with ejs to this route
});

app.get("/compose", function(req, res) { // Creates a compose route
    res.render("compose") // Renders the template made with ejs to this route
});

app.get("/posts/:postName", function(req, res) { // Dynamically creates a route of :postName
    posts.forEach(function(post) { // Goes through each item in the posts array
        if(_.lowerCase(req.params.postName) === _.lowerCase(post.title)) { // If the title of the post matches post name
            console.log("Match Found!"); // Print match found
            const title = post.title; // Create a const to hold the title of the post
            const body = post.body; // Create a const to hold the body of the post
            res.render("post", {title: title, body: body}); // Renders the template made with ejs to this route
        }
    });
});

app.post("/compose", function(req, res) { // Function to allow posting on the compose route
    const post = {title: req.body.title, body: req.body.post}; // Creates a new object with the information that the user typed in
    posts.push(post); // Pushes the object to the posts array
    res.redirect("/"); // Redirects the user to the home route
})

app.listen(process.env.PORT || 3000, function(req, res) { // Tells what port the server will be running on
    console.log("Server started on port 3000"); // Print that the server was successfully starter
});