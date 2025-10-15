"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_route_1 = __importDefault(require("./routes/index.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? ['http://localhost']
        : ['http://localhost:5173'],
    credentials: true,
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});
app.use('/api', index_route_1.default);
// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end());
// Export default for Vercel
exports.default = (req, res) => app(req, res);
