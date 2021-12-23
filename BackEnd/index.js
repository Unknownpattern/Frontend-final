const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();

require("./middleware/passport-jwt")
require("./middleware/passport-Local")

const PORT = 5000;

// -----------Middleware--------------- 
app.use(express.json());
app.use(passport.initialize());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_ADDR }));

// ------------Routes-------------------

app.use("/api/auth", require("./Routes/auth"))
app.use("/api/user", require("./Routes/userRoutes"))
app.use("/api/admin", require("./Routes/adminRoutes"))
app.use("/api/general", require("./Routes/generalRoutes"))

app.listen(PORT, () => {
   console.log(`server is running on port ${PORT}`)
})