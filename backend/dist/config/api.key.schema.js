import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const api_key_schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    api_key: { type: String, required: true }
}, {
    timestamps: true
});
const api_key_model = mongoose.model('api_key', api_key_schema);
export default api_key_model;
//# sourceMappingURL=api.key.schema.js.map