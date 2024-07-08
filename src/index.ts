#!/usr/bin/env node

import { execSync } from "child_process";
import { Command } from "commander";
import { version as currentVersion } from "../package.json";
import https from "https";

function checkForUpdates() {
  return new Promise<void>((resolve, reject) => {
    https
      .get(`https://registry.npmjs.org/git-merger-cli`, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const latestVersion = JSON.parse(data)["dist-tags"].latest;
          if (currentVersion < latestVersion) {
            console.log(
              `A new version of git-merger-cli is available: ${latestVersion}. You are using version ${currentVersion}. Please update by running 'npm install -g git-merger-cli'.`
            );
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

  const program = new Command();

  // Define the version and description of the CLI
  program
    .version(currentVersion)
    .description("A CLI for common git commands with shortcuts");

  // Define the gacp command
  program
    .command("gacp <message>")
    .description("git add commit push with a commit message")
    .action((message: string) => {
      try {
        console.log("Running git add .");
        execSync("git add .", { stdio: "inherit" });

        console.log(`Running git commit -m "${message}"`);
        execSync(`git commit -m "${message}"`, { stdio: "inherit" });

        console.log("Running git push");
        execSync("git push", { stdio: "inherit" });

        console.log("All commands executed successfully.");
      } catch (error) {
        console.error(
          "Error executing git commands:",
          (error as Error).message
        );
      }
    });

  // Define other commands
  program
    .command("initrepo <message> <url>")
    .description(
      "Initialize a new repository with a remote origin, commit, and push"
    )
    .action((message: string, url: string) => {
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
        console.error(
          "Error initializing repository:",
          (error as Error).message
        );
      }
    });

  program
    .command("gs")
    .description("git status")
    .action(() => {
      try {
        execSync("git status", { stdio: "inherit" });
      } catch (error) {
        console.error("Error executing git status:", (error as Error).message);
      }
    });

  program
    .command("gp")
    .description("git pull")
    .action(() => {
      try {
        execSync("git pull", { stdio: "inherit" });
      } catch (error) {
        console.error("Error executing git pull:", (error as Error).message);
      }
    });

  program
    .command("gsh <branch>")
    .description("git checkout <branch_name>")
    .action((branch: string) => {
      try {
        execSync(`git checkout ${branch}`, { stdio: "inherit" });
      } catch (error) {
        console.error(
          "Error executing git checkout:",
          (error as Error).message
        );
      }
    });

  program
    .command("ngcb <branch>")
    .description("git checkout -b <branch_name> if not exists")
    .action((branch: string) => {
      try {
        execSync(`git checkout ${branch}`, { stdio: "inherit" });
      } catch (error) {
        console.error(
          "Error executing git checkout:",
          (error as Error).message
        );
        execSync(`git checkout -b ${branch}`, { stdio: "inherit" });
      }
    });

  program
    .command("gcb <branch>")
    .description("git checkout -b <branch_name>")
    .action((branch: string) => {
      try {
        execSync(`git checkout -b ${branch}`, { stdio: "inherit" });
      } catch (error) {
        console.error(
          "Error executing git checkout:",
          (error as Error).message
        );
      }
    });

  program
    .command("gm <branch>")
    .description("git merge <branch_name>")
    .action((branch: string) => {
      try {
        execSync(`git merge ${branch}`, { stdio: "inherit" });
      } catch (error) {
        console.error("Error executing git merge:", (error as Error).message);
      }
    });

  program
    .command("gf")
    .description("git fetch")
    .action(() => {
      try {
        execSync("git fetch", { stdio: "inherit" });
      } catch (error) {
        console.error("Error executing git fetch:", (error as Error).message);
      }
    });

  program
    .command("gl")
    .description("git log")
    .action(() => {
      try {
        execSync("git log", { stdio: "inherit" });
      } catch (error) {
        console.error("Error executing git log:", (error as Error).message);
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
  console.error("An error occurred:", (error as Error).message);
});
