import { TYPES } from "../../../constants/types";
import container from "../../../containers";
import { AuthProvider } from "../../../contracts/AuthProvider";
import { createAuthMiddleware } from "../../../infra/server/middleware/AuthMiddleware";

const authProvider = container.get<AuthProvider>(TYPES.AuthProvider);
export const authMiddleware = createAuthMiddleware(authProvider);
