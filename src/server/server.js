import app from "./api.js";

// Start server
const server = app.listen(8000, () => {
    console.log('Server started at localhost:8000');
})