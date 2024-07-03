import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

app.on('error', (error)=> {
    console.error("app caught an error:", error);
})

app.listen(PORT, ()=> {
    console.log(`⚙ Server started at port ${PORT}`);
})