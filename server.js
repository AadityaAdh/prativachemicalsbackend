const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");
const cors = require("cors");
const PORT=process.env.PORT || 4001;



// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to the database
connectDatabase();

// Enable CORS
app.use(cors());

// Import product routes
const productRoutes = require("./routes/productRoute.js");

// Use the routes
app.use( productRoutes);

const personRoutes=require("./routes/personRoute.js")
app.use(personRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
