

# toDoer Frontend

toDoer is a task app manager frontend made with React.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Technologies

- React.js
- React Router DOM
- Tailwind CSS
- Firebase
- React Hook Form
- React Icons
- React Toastify

## Installation

1. Clone the repository: `git clone https://github.com/your-username/toDoer-front.git`
2. Install the dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. Build the production files: `npm run build`

## Environment Variables

In order to use Firebase with the toDoer Frontend, you need to set up a Firebase project and obtain the necessary API keys. You can check the file named `envExample.js` at the root of the project which provides a layout for the environment variables that need to be added.

The `envExample.js` file should look like this:

```
const fireBaseKeys = {
    API_KEY: "",
    AUTH_DOMAIN: "",
    PROJECT_ID: "",
    STORAGE_BUCKET: "",
    MESSAGING_SENDER_ID: "",
    APP_ID: ""
}
```

Make sure to replace the empty strings with the actual API keys. You can then rename the file to `env.js` and add it to your `.gitignore` file so that it is not included in version control.

## Contributing

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.