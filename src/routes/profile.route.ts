import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { createProfileSchema, getProfileListSchema } from '@/validationSchema/profile.validation.schema';
import { ProfileController } from '@/controllers/profile.controller';
import ProfileRepo from '@/repository/profile.repository';
import { upload } from '@/middlewares/multer.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';

class ProfileRoute implements Routes {
  public path = '/profile';
  public router = Router();
  public profileController = new ProfileController(new ProfileRepo());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      authMiddleware(),
      upload.single('profile_image'),
      validationMiddleware(createProfileSchema, 'body'),
      this.profileController.createProfile,
    );

    this.router.get(
      `${this.path}`,
      authMiddleware(),
      validationMiddleware(getProfileListSchema, 'query'),
      this.profileController.getProfileList,
    );

    this.router.get(
      `${this.path}/insights`,
      authMiddleware(),
      validationMiddleware(getProfileListSchema, 'query'),
      this.profileController.getProfilesInsights,
    );

    this.router.get(`${this.path}/:id`, authMiddleware(), this.profileController.getProfileById);
  }
}

export default ProfileRoute;
