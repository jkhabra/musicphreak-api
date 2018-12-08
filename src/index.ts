import Express from "express";
import songs from "./songs";
import artists from "./artists";
const bodyParser = require("body-parser");

const app = Express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.set("env", process.env.NODE_ENV || "development");

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/songs", songs);
app.use("/artists", artists);

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        port,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
