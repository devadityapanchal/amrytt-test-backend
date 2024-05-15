import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import AuthRepo from '@/repository/auth.repository';
import validationMiddleware from '@/middlewares/validation.middleware';
import { loginSchema, registerSchema } from '@/validationSchema/auth.validation.schema';
import { AuthController } from '@/controllers/auth.controller';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController(new AuthRepo());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(loginSchema, 'body'), this.authController.login);

    this.router.post(
      `${this.path}/register`,
      validationMiddleware(registerSchema, 'body'),
      this.authController.registerUser,
    );
  }
}

export default AuthRoute;
