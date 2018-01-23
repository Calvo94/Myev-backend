import User from './model';
import { facebookAuth } from './utils/facebookAuth';
import { googleAuth } from './utils/googleAuth';

export const loginWithAuth0 = async (req, res) => {
  const { provider } = req.body;
 let userInfo;
  try {
   if(provider === 'none') {
     const { fullName , email } = req.body;
     userInfo = { fullName, email};
   }
   else if (provider === 'google') {
     userInfo = await googleAuth(req.body.token);
   } else {
     userInfo = await facebookAuth(req.body.token);
   }
    const user = await User.create(args);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    return res.status(400).json({ error: true, errorMessage: 'Something wrong with auth' });
  }
};
