#!/usr/bin/env node

const { execSync } = require("child_process");
const { Command } = require("commander");
const program = new Command();

// Define the version and description of the CLI
program
  .version("2.1.3")
  .description("A CLI for common git commands with shortcuts");

// Define the gacp command
program
  .command("gacp <message>")
  .description("git add commit push with a commit message")
  .action((message) => {
    try {
      console.log("Running git add .");
      execSync("git add .", { stdio: "inherit" });

      console.log(`Running git commit -m "${message}"`);
      execSync(`git commit -m "${message}"`, { stdio: "inherit" });

      console.log("Running git push");
      execSync("git push", { stdio: "inherit" });

      console.log("All commands executed successfully.");
    } catch (error) {
      console.error("Error executing git commands:", error.message);
    }
  });

// Define other commands
program
  .command("initrepo <message> <url>")
  .description(
    "Initialize a new repository with a remote origin, commit, and push"
  )
  .action((message, url) => {
    try {
      console.log("Running git add .");
      execSync("git add .", { stdio: "inherit" });

      console.log(`Running git commit -m "${message}"`);
      execSync(`git commit -m "${message}"`, { stdio: "inherit" });

      console.log(`Running git remote add origin ${url}`);
      execSync(`git remote add origin ${url}`, { stdio: "inherit" });

      console.log("Running git push -u origin master");
      execSync("git push -u origin master", { stdio: "inherit" });

      console.log("Repository initialized and pushed to remote origin.");
    } catch (error) {
      console.error("Error initializing repository:", error.message);
    }
  });

program
  .command("gs")
  .description("git status")
  .action(() => {
    try {
      execSync("git status", { stdio: "inherit" });
    } catch (error) {
      console.error("Error executing git status:", error.message);
    }
  });

program
  .command("gp")
  .description("git pull")
  .action(() => {
    try {
      execSync("git pull", { stdio: "inherit" });
    } catch (error) {
      console.error("Error executing git pull:", error.message);
    }
  });

program
  .command("gcb <branch>")
  .description("git checkout -b <branch_name>")
  .action((branch) => {
    try {
      execSync(`git checkout -b ${branch}`, { stdio: "inherit" });
    } catch (error) {
      console.error("Error executing git checkout:", error.message);
    }
  });

program
  .command("gm <branch>")
  .description("git merge <branch_name>")
  .action((branch) => {
    try {
      execSync(`git merge ${branch}`, { stdio: "inherit" });
    } catch (error) {
      console.error("Error executing git merge:", error.message);
    }
  });

program
  .command("gf")
  .description("git fetch")
  .action(() => {
    try {
      execSync("git fetch", { stdio: "inherit" });
    } catch (error) {
      console.error("Error executing git fetch:", error.message);
    }
  });

program
  .command("gl")
  .description("git log")
  .action(() => {
    try {
      execSync("git log", { stdio: "inherit" });
    } catch (error) {
      console.error("Error executing git log:", error.message);
    }
  });

// Display help command with shortcuts
program
  .command("help")
  .description("display help for commands")
  .action(() => {
    console.log(`
      Usage: git-cli [command]

      Commands:
        gacp <message>         git add commit push with a commit message
        gs                     git status
        gp                     git pull
        gcb <branch>           git checkout -b <branch_name>
        gm <branch>            git merge <branch_name>
        gf                     git fetch
        gl                     git log
        help                   display help for commands

      For more information, visit https://github.com/your-repo-url
    `);
  });

program.parse(process.argv);
