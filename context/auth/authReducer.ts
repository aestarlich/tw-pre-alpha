import { AuthState } from './';
import { IUser } from '../../interfaces';


type AuthActionType = 
   | { type: '[Auth] - Set User in Context', payload: IUser }
   | { type: '[Auth] - Update User Data in Context', payload: IUser }
   | { type: '[Auth] - Logout' } 


export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {
  switch (action.type) {
    case '[Auth] - Set User in Context':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    
    case '[Auth] - Update User Data in Context':
      return {
        ...state,
        user: {...action.payload},
      };

    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: {
          _id       : '',
          username  : '',
          name      : '',
          email     : '',
          password  : '',
          role      : '',
          isPro     : false,
          metrics: {
            weight    : 0,
            massUnit  : '',
            height    : 0,
            metricUnit: ''
          }
        },
      };

    default:
      return state;
  }
};