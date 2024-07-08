#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const https_1 = __importDefault(require("https"));
function checkForUpdates() {
    return new Promise((resolve, reject) => {
        https_1.default
            .get(`https://registry.npmjs.org/git-merger-cli`, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                const latestVersion = JSON.parse(data)["dist-tags"].latest;
                if (package_json_1.version < latestVersion) {
                    console.log(`A new version of git-merger-cli is available: ${latestVersion}. You are using version ${package_json_1.version}. Please update by running 'npm install -g git-merger-cli'.`);
                }
                resolve();
            });
        })
            .on("error", (err) => {
            console.error("Failed to check for updates:", err.message);
            reject(err);
        });
    });
}
async function main() {
    await checkForUpdates();
    const program = new commander_1.Command();
    // Define the version and description of the CLI
    program
        .version(package_json_1.version)
        .description("A CLI for common git commands with shortcuts");
    // Define the gacp command
    program
        .command("gacp <message>")
        .description("git add commit push with a commit message")
        .action((message) => {
        try {
            console.log("Running git add .");
            (0, child_process_1.execSync)("git add .", { stdio: "inherit" });
            console.log(`Running git commit -m "${message}"`);
            (0, child_process_1.execSync)(`git commit -m "${message}"`, { stdio: "inherit" });
            console.log("Running git push");
            (0, child_process_1.execSync)("git push", { stdio: "inherit" });
            console.log("All commands executed successfully.");
        }
        catch (error) {
            console.error("Error executing git commands:", error.message);
        }
    });
    // Define other commands
    program
        .command("initrepo <message> <url>")
        .description("Initialize a new repository with a remote origin, commit, and push")
        .action((message, url) => {
        try {
            console.log("Running git add .");
            (0, child_process_1.execSync)("git add .", { stdio: "inherit" });
            console.log(`Running git commit -m "${message}"`);
            (0, child_process_1.execSync)(`git commit -m "${message}"`, { stdio: "inherit" });
            console.log(`Running git remote add origin ${url}`);
            (0, child_process_1.execSync)(`git remote add origin ${url}`, { stdio: "inherit" });
            console.log("Running git push -u origin master");
            (0, child_process_1.execSync)("git push -u origin master", { stdio: "inherit" });
            console.log("Repository initialized and pushed to remote origin.");
        }
        catch (error) {
            console.error("Error initializing repository:", error.message);
        }
    });
    program
        .command("gs")
        .description("git status")
        .action(() => {
        try {
            (0, child_process_1.execSync)("git status", { stdio: "inherit" });
        }
        catch (error) {
            console.error("Error executing git status:", error.message);
        }
    });
    program
        .command("gp")
        .description("git pull")
        .action(() => {
        try {
            (0, child_process_1.execSync)("git pull", { stdio: "inherit" });
        }
        catch (error) {
            console.error("Error executing git pull:", error.message);
        }
    });
    program
        .command("gsh <branch>")
        .description("git checkout <branch_name>")
        .action((branch) => {
        try {
            (0, child_process_1.execSync)(`git checkout ${branch}`, { stdio: "inherit" });
        }
        catch (error) {
            console.error("Error executing git checkout:", error.message);
        }
    });
    program
        .command("ngcb <branch>")
        .description("git checkout -b <branch_name> if not exists")
        .action((branch) => {
        try {
            (0, child_process_1.execSync)(`git checkout ${branch}`, { stdio: "inherit" });
        }
        catch (error) {
            console.error("Error executing git checkout:", error.message);
            (0, child_process_1.execSync)(`git checkout -b ${branch}`, { stdio: "inherit" });
        }
    });
    program
        .command("gcb <branch>")
        .description("git checkout -b <branch_name>")
        .action((branch) => {
        try {
            (0, child_process_1.execSync)(`git checkout -b ${branch}`, { stdio: "inherit" });
        }
        catch (error) {
            console.error("Error executing git checkout:", error.message);
        }
    });
    program
        .command("gm <branch>")
        .description("git merge <branch_name>")
        .action((branch) => {
        try {
            (0, child_process_1.execSync)(`git merge ${branch}`, { stdio: "inherit" });
        }
        catch (error) {
            console.error("Error executing git merge:", error.message);
        }
    });
    program
        .command("gf")
        .description("git fetch")
        .action(() => {
        try {
            (0, child_process_1.execSync)("git fetch", { stdio: "inherit" });
        }
        catch (error) {
            console.error("Error executing git fetch:", error.message);
        }
    });
    program
        .command("gl")
        .description("git log")
        .action(() => {
        try {
            (0, child_process_1.execSync)("git log", { stdio: "inherit" });
        }
        catch (error) {
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
        initrepo <message> <url> Initialize a new repository with a remote origin, commit, and push
        gs                     git status
        gp                     git pull
        gcb <branch>           git checkout -b <branch_name>
        ngcb <branch>          git checkout <branch_name> if not exists
        gsh <branch>           git checkout <branch_name>
        gm <branch>            git merge <branch_name>
        gf                     git fetch
        gl                     git log
        help                   display help for commands

      For more information, visit https://github.com/your-repo-url
    `);
    });
    program.parse(process.argv);
}
main().catch((error) => {
    console.error("An error occurred:", error.message);
});
