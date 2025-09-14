const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";

// Read home.html
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

// Read project.html
fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

// Create server with routes
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;

      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(3000);

console.log("Server running at http://localhost:3000");
