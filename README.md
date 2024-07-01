## gmc: Git Command Merger CLI

### Overview

`gmc` is a simple command-line interface (CLI) tool designed to streamline common git operations. Instead of running multiple git commands sequentially, `gmc` allows you to perform them in one go with meaningful shortcuts.

### Installation

Install `gmc` globally using npm:

```sh
npm install -g gmc-cli
```

### Usage

Below is a list of available commands and their descriptions:

#### Commands

1. **gmc gacp <message>**

   - Description: Adds all changes, commits with a message, and pushes to the repository.
   - Usage:
     ```sh
     gmc gacp "your commit message"
     ```

2. **gmc gs**

   - Description: Displays the current status of the repository.
   - Usage:
     ```sh
     gmc gs
     ```

3. **gmc gp**

   - Description: Pulls the latest changes from the repository.
   - Usage:
     ```sh
     gmc gp
     ```

4. **gmc gcb <branch>**

   - Description: Creates and checks out a new branch.
   - Usage:
     ```sh
     gmc gcb "new-branch"
     ```

5. **gmc gm <branch>**

   - Description: Merges the specified branch into the current branch.
   - Usage:
     ```sh
     gmc gm "branch-to-merge"
     ```

6. **gmc gf**

   - Description: Fetches the latest changes from the repository.
   - Usage:
     ```sh
     gmc gf
     ```

7. **gmc gl**

   - Description: Displays the commit history.
   - Usage:
     ```sh
     gmc gl
     ```

8. **gmc help**
   - Description: Displays the help information with available commands and their descriptions.
   - Usage:
     ```sh
     gmc help
     ```

### Example

To add all changes, commit with a message, and push to the repository:

```sh
gmc gacp "Initial commit"
```

### Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

You can now copy and paste this text into your documentation.