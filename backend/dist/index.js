"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_route_1 = __importDefault(require("./routes/index.route"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
exports.app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? ['http://localhost']
        : ['http://localhost:5173'],
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});
exports.app.use('/api', index_route_1.default);
exports.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
