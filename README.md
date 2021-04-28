# Covid resources

Covid resources is an online platform to crowd source verified Covid resources such as beds, oxygen, food etc.
Behind this application, we're a team of volunteers, working 24x7 to gather verified resources.

## Welcome to Covid resources Frontend repository

Find backend repo here: [https://github.com/madhavanmalolan/covidresources.in-backend][backend-repository]

## How can you help us in this crisis?

1. Become a volunteer - please spare as little as half an hour a day to help us in this crisis.
2. [Contribute](#Contribute) - Help us develop/maintain this application to give seamless experience to those that are looking for resources.

By helping each other is how we come out of this crisis.

## Contribute

> NOTE: If you find yourself in some trouble going through this, reach out to us directly on our [What's app Group][whats-app-group].

### Prerequisites

1. **NodeJS:** <br>
   Please install [NodeJS >= 10.15.0](https://nodejs.org/en/download/). If you already have it, you're good to go.

1. **Yarn:** <br>
   Visit [Yarn download page](https://yarnpkg.com/en/docs/install). Select your Operating system and follow the instructions.

<!-- 1. **EditorConfig:** <br>
   Please visit [EditorConfig](https://editorconfig.org/) -> `Download a Plugin` section and scroll through to see if you need to install an additional Plugin/Extension for your code editor or IDE. If your IDE needs one, you should be able to find a link to that plugin/extension on that page.

   This prerequisite is directly related to: [`.editorconfig`][repo-link/blob/develop/.editorconfig] in the root directory of this project.

   **_More About EditorConfig:_** <br>
   EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

   -->

---

Once you have the [Prerequisites](#prerequisites) covered:

1. [Fork][how-to-fork] this repo

1. [Clone][how-to-clone] you(forked) respository.

1. Navigate into the project folder and install all of its necessary dependencies with Yarn.

   ```sh
   cd CR-tech-force-frontend
   yarn install
   ```

1. Once that's done, you are ready to start contributing 😃 <br>
   You can run -

   ```sh
   yarn start
   ```

to start the server.

<!-- 1. Install MongoDB and make sure it's running

   - For Mac OSX with [homebrew](http://brew.sh/): `brew install mongodb` then `brew services start mongodb`
   - For Windows and Linux: [MongoDB Installation](https://docs.mongodb.com/manual/installation/)

1. Make a copy of `.env.sample` and rename it to `.env`. You can do so with this simple command:

   > **NOTE:** If you are using Windows Command Prompt, you need to use `copy` instead of `cp`. <br>

   ```sh
   $ cp .env.sample .env
   ```

   You don't need to change any values in `.env` file. The default values work well for development purposes.

1. Once you have MongoDB and `.env` file ready, seed the local database by running:

   ```sh
   $ yarn run seed
   ```

1. To make sure everything is setup properly, run tests.

   ```sh
   $ yarn run test
   ```

   If all tests pass, we can safely conclude that setup is complete and its working as expected. 🙌 Wooh!! <br>
   If not, don't worry. We are together on this mission!! Reach out to us on our [Discord server](https://discord.gg/bPBuk3N). -->

You can now visit <http://localhost:3000/> to view the application

Further, checkout [package.json](https://github.com/CodingGardenCommunity/app-backend/blob/develop/package.json) file to learn about (more) available scripts/commands.

## Dependencies used

<!-- - [ESLint](https://eslint.org/): Code linter. Analyses the code for potential errors.
  - This project uses ESLint in conjunction with another dependency called "eslint-config-airbnb" for implementing the [airbnb set of rules](https://github.com/airbnb/javascript) helping to write clean javascript.   -->

- [Jest](https://jestjs.io/): For testing.

<!-- Links -->

[whats-app-group]: whatsapp
[how-to-fork]: https://docs.github.com/en/github/getting-started-with-github/fork-a-repo
[backend-repository]: https://github.com/madhavanmalolan/covidresources.in-backend
[how-to-clone]: https://help.github.com/articles/cloning-a-repository/
