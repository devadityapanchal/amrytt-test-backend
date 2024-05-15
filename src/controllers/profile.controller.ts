import { Request, Response, NextFunction } from 'express';
import { generalResponse } from '@/helper/common.helper';
import { PROFILE_MESSAGES } from '@/messages/profile.messages';
import ProfileRepo from '@/repository/profile.repository';

export class ProfileController {
  constructor(private readonly profileRepository: ProfileRepo) {}

  readonly createProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await this.profileRepository.createProfile(req);

      return generalResponse(res, profile, PROFILE_MESSAGES.PROFILE_CREATE, 'success', true);
    } catch (error) {
      next(error);
    }
  };

  readonly getProfileList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profiles = await this.profileRepository.getProfileList(req);

      return generalResponse(res, profiles, PROFILE_MESSAGES.GETALL_PROFILES, 'success', false);
    } catch (error) {
      next(error);
    }
  };

  readonly getProfileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await this.profileRepository.getProfileById(req);

      return generalResponse(res, profile, PROFILE_MESSAGES.GET_PROFILE, 'success', false);
    } catch (error) {
      next(error);
    }
  };

  readonly getProfilesInsights = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profiles = await this.profileRepository.getProfilesInsights(req);

      return generalResponse(res, profiles, PROFILE_MESSAGES.GETALL_PROFILES, 'success', false);
    } catch (error) {
      next(error);
    }
  };
}
