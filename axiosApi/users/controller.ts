import { NextApiRequest, NextApiResponse } from "next";
import { db } from "..";
import { jwt, unit } from "../../utils";
import { User } from "./models";
import { IGetUserEndpointOut, IPostUserEndpointOut } from './interfaces';
import * as bcrypt from "bcryptjs";
import { IPostUser, IUser } from "../../interfaces";

export type Data = 
| { message: string, error?: any, user?: IUser }
| IGetUserEndpointOut
| IPostUserEndpointOut

// Authentication functions.

export const getUser = async(req: NextApiRequest, res: NextApiResponse<Data>): Promise<IGetUserEndpointOut | {message: string, error?: any, user?: IUser}> => {
    
  const { email = '', password = ''  } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if ( !user ) {
    res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
    return {message: `Incorrect email or password. Please try again.`}
  }
  
  if ( !bcrypt.compareSync( password, user.password! ) ) {
    res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
    return {message: `Incorrect email or password. Please try again.`}
  }

  const { _id } = user;

  const token = jwt.signToken( _id, email );
  
  res.status(200).json({
    message: `You are logged in with the user ${user.username}.`,
    token,
    user
  });
  return {
    message: `You are logged in with the user ${user.username}.`,
    token,
    user
  }

};

export const postUser = async(req: NextApiRequest, res: NextApiResponse<Data>): Promise<IGetUserEndpointOut | {message: string, error?: any, user?: IUser}> => {
  const { email, password, username, name, image } = req.body as IPostUser;
  const type = 'user';

  if(image !== undefined){
    // Develop Cloudinary Integration
  }

  await db.connect();
  const user = await User.findOne({email});

  if(user){
    res.status(400).json({ message: `This email '${email}' is already in use, please use another.` });
    return {message: `This email '${email}' is already in use, please use another.` };
  }

  const newUser = new User({
    username: username,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: type,
    isPro: false,
    image: image,
    name: name,
    metrics: {
      height    : 0,
      weight    : 0,
      massUnit  : 'kg',
      metricUnit: 'cm'
    }
  });

  try{
    await newUser.save({validateBeforeSave: true});
    await db.disconnect();
  }catch(err){
    res.status(500).json({message: `Something has gone wrong, please try again later or contact the support team.`, error: err});
    return {message: `Something has gone wrong, please try again later or contact the support team.`}
  }

  res.status(200).json({message: `Your user with email '${newUser.email}' has been successfully created.`, user: newUser});

  return {message: `Your user with email '${newUser.email}' has been successfully created.`}
};

// Update user data functions.

export const updateUserData = async(req: NextApiRequest, res: NextApiResponse<Data>): Promise<IGetUserEndpointOut | {message: string, error?: any, user?: IUser}> => {

  const { email, value, entity } = req.body;
  
  try {

    await db.connect();
    let user = await User.findOne({email});

    if(!user){
      res.status(500).json({message: `User with email ${email} not found.`});
      return {message: `User with email ${email} not found.`};
    }

    switch(entity){
      case 'name':
        await user.updateOne({name: value});
        break;
      case 'password':
        await user.updateOne({password: bcrypt.hashSync(value)});
        break;
      case 'height':
        await user.updateOne({height: value});
        break;
      case 'weight':
        await user.updateOne({weight: value});
        break;
      case 'mesure':
        const valueHeightConverted = unit.convert(user.metrics.height, value);
        await user.updateOne({metrics: {
          weight    : user.metrics.weight,
          massUnit  : user.metrics.massUnit,
          height    : valueHeightConverted,
          metricUnit: value
        }}, { returnNewDocument: true });
        break;
      case 'mass':
        const valueWeightConverted = unit.convert(user.metrics.weight, value);
        await user.updateOne({metrics: {
          weight    : valueWeightConverted,
          massUnit  : value,
          height    : user.metrics.height,
          metricUnit: user.metrics.metricUnit
        }}, { returnNewDocument: true });
        break;
    }
    
    const userUpdated = await User.findOne({email}) as IUser;
    await db.disconnect();
  
    res.status(200).json({message: `The ${entity} have been updated.`, user: userUpdated});
    return {message: `The ${entity} have been updated.`, user: userUpdated};

  } catch (err) {
    res.status(500).json({message: `An error have been ocurred. Please check the server logs.`, error: err});
    return {message: `An error have been ocurred. Please check the server logs.`}
  }
}

// Funtions to check users.

export const checkUserEmailPassword = async(emailLogin: string, passwordLogin: string) => {

  await db.connect();
  const user = await User.findOne({email: emailLogin});
  await db.disconnect();

  if(!user) {
    throw new Error(`Invalid email. Please check the email or try again later.`);
  }

  if(!bcrypt.compareSync(passwordLogin, user.password!)){
    throw new Error(`Invalid password. Please check the password or try again later.`);
  }

  const { 
    _id, 
    username, 
    name, 
    email, 
    role, 
    isPro, 
    image, 
    metrics, 
  } = user;

  const id = _id;

  return { 
    id, 
    username, 
    name, 
    email, 
    role, 
    isPro, 
    image, 
    metrics, 
  };
};

export const oAUthToDbUser = async( oAuthEmail: string, oAuthName: string ) => {

  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if ( user ) {
    await db.disconnect();
    return user;
  }

  const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'user'  });
  await newUser.save();
  await db.disconnect();
  return newUser;

};