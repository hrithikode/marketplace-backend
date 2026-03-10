import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, authorize("SELLER"), ProductController.createProduct);

router.get("/my", authenticate, authorize("SELLER"), ProductController.getMyProducts);

router.patch("/:id", authenticate, authorize("SELLER"), ProductController.updateProduct);

router.delete("/:id", authenticate, authorize("SELLER"), ProductController.deleteProduct);
export default router;