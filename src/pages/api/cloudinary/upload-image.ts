import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';
import { db, User } from '../../../../axiosApi';

cloudinary.config({
  secure: true
});

type Data = 
| { message: string }
| {
    result: any;
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
  switch( req.method ) {
  case 'POST':
    return uploadImage(req, res);

  default:
    res.status(400).json({
      message: 'Bad request'
    });
  }
}
const uploadImage = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { type = '', email = '', filePath = '', username = '' } = req.body;

  
  const options = type === 'user' 
    ?
    {
      public_id: username,
      unique_filename: true,
      overwrite: true,
      folder: `/TheWorkout/${username}/profile`,
      height: 56, 
      width: 56
    }
    :
    {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      folder: `/TheWorkout/${username}/${type}`
    };

  try {
    const result = await cloudinary.uploader.upload(filePath, options);

    await db.connect();
    const user = await User.findOne({ email });
    await user?.updateOne({image: result.secure_url});
    await db.disconnect();
    
    return res.status(200).json({
      result
    });
  } catch (error) {
    return res.status(500).json({
      message: 'No se ha podido subir la imagen',
      result: error
    });
  }
};