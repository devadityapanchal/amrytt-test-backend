import Profile from '@/models/profile.model';
import type { Request } from 'express';

export default class ProfileRepo {
  constructor() {}

  readonly createProfile = async (req: Request) => {
    const { firstName, lastName, age, gender, hobbies, country, state, city } = req.body;
    const { userTokenData } = req;

    const file = req.file;

    const createProfileInstance = new Profile({
      firstName,
      lastName,
      profile_image: file.filename,
      age,
      hobbies,
      country,
      state,
      city,
      user: userTokenData._id,
      gender,
    });

    const profile = await createProfileInstance.save();

    return profile.toJSON();
  };

  readonly getProfileList = async (req: Request) => {
    const { userTokenData } = req;

    return await Profile.find({ user: userTokenData._id });
  };

  readonly getProfileById = async (req: Request) => {
    const { userTokenData } = req;
    const id = req.params.id;

    return await Profile.findOne({ user: userTokenData._id, _id: id });
  };

  readonly getProfilesInsights = async (req: Request) => {
    const { userTokenData } = req;

    const [graphData, count] = await Promise.all([
      Profile.aggregate([
        {
          $match: {
            user: userTokenData._id,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            count: 1,
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]),
      Profile.countDocuments({ user: userTokenData._id }),
    ]);

    return {
      graphData,
      count,
    };
  };
}
