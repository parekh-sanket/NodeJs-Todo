// Import the 'express' module
import express from 'express'; 
import config from 'config';
import { connectDb } from './database'
import routes from './route/index';


// Create an Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb().then(()=>{
    app.use(routes)

    // Start the server and listen on the specified port
    app.listen(config.get("server.port"), () => {
        // Log a message when the server is successfully running
        console.log(`Server is running on http://localhost:${config.get("server.port")}`);
    });
    
}).catch((error) => {
    process.exit(1);
})