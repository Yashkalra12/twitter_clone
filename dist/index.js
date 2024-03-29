"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const login_1 = __importDefault(require("./routes/login"));
const tweet_1 = __importDefault(require("./routes/tweet"));
const like_1 = __importDefault(require("./routes/like"));
const retweet_1 = __importDefault(require("./routes/retweet"));
const app = (0, express_1.default)();
const PORT = 5430;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("<h1>Twitter Clone</h1>");
});
//routes
app.use("/user", user_1.default);
app.use("/login", login_1.default);
app.use("/tweet", tweet_1.default);
app.use("/like", like_1.default);
app.use("/retweet", retweet_1.default);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
