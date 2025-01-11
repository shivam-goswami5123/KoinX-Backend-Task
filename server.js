const express = require('express');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');
const { scheduleFetchData } = require('./tasks/fetchData');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());


// Register API routes
app.use('/api', apiRoutes);


// Start the server
app.listen(PORT, async () => {
    try{
        await connectDB();
        console.log(`Server running on http://localhost:${PORT}`);
        // Start background job
        scheduleFetchData();
    }
    catch(err){
        console.error(err.message);
    }
    
});
