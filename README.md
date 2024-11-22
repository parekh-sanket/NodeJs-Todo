# NodeJs Todo App

This is a simple Todo application built with Node.js.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance available

### Setup Instructions

1. **Clone the Repository**  
   Clone the source code from the GitHub repository:

   ```bash
   git clone https://github.com/parekh-sanket/NodeJs-Todo.git
   cd NodeJs-Todo

2. **Install Dependencies**   
   Install the required npm packages:

    ```bash
    npm install

3. **Configure MongoDB**  
   Update the MongoDB connection URL in config/development.json. Replace the existing value with your MongoDB URL:

    ```bash
    {
        "mongoDb": {
          "url": "your-mongodb-connection-string"
        }
   }

4. **Build the Project**  
   Open a terminal and run the following command:

    ```bash
    npm run build

5. **Start the Development Server**  
   In a separate terminal, run the following command to start the development server:

    ```bash
    npm run start-dev-server
