const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
  alias: { n: "name", a: "age", p: "port" },
  default: { greeting: "Hello", port: 3000 },
});

console.log(args);

console.log(`${args.greeting} ${args.name || "User"}! You are ${args.age || "unknown"} years old.`);

const filesToProcess = ["sample.txt", "test.txt"];

// File operations safely
fs.writeFile(
  "sample.txt",
  `User: ${args.name || "User"}, Age: ${args.age || "unknown"}`,
  (err) => {
    if (err) throw err;
    console.log("File created with user info!");
  }
);

if (fs.existsSync("test.txt")) {
  fs.unlink("test.txt", (err) => {
    if (err) throw err;
    console.log("File test.txt deleted successfully!");
  });
}

// HTML pages
let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) throw err;
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) throw err;
  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) throw err;
  registrationContent = registration;
});

// Server
http
  .createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        res.write(projectContent);
        res.end();
        break;
      case "/registration":
        res.write(registrationContent);
        res.end();
        break;
      default:
        res.write(homeContent);
        res.end();
        break;
    }
  })
  .listen(args.port, () => {
    console.log(`Server running at http://localhost:${args.port}`);
  });
