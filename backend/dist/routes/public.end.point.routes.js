import express from 'express';
import { public_api_with_key } from '../controllers/public.api.expose.js';
const public_end_point_router = express.Router();
public_end_point_router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Public endpoint is running'
    });
});
public_end_point_router.post('/public-end-point', public_api_with_key);
export default public_end_point_router;
//# sourceMappingURL=public.end.point.routes.js.map