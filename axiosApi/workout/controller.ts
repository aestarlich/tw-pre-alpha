import { NextApiRequest, NextApiResponse } from 'next';
import { db, IPostWorkoutEndpointIn, IPostWorkoutEndpointOut } from '..';
import { validateJWT } from '../../utils/jwt';
import { Workout } from './models';

export type Data =
  | { message: any }
  | IPostWorkoutEndpointOut


export const postWorkout = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<IPostWorkoutEndpointOut | { message: string }> => {
  const { id, routine, percentage, startDate, endDate, duration } = req.body;
  try {
    await db.connect();
    const user = await validateJWT(req, res);
    const newWorkout = new Workout({
      ...req.body,
      routine: id,
      user: user.id
    });
    await newWorkout.save();
    await db.disconnect();
    const response = newWorkout as IPostWorkoutEndpointIn;
    res.status(200).json({message: "Workout saved", workoutSaved: response});
    return {message: "Workout saved", data: response};

  } catch (error) {
    res.status(500).json({ message: "Error saving the workout" });
    return { message: "Error saving the workout" };
  }
};