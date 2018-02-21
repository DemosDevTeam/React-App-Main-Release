import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

//For good example of how to use Navigator classes, see the following link:
//https://github.com/spencercarli/getting-started-react-navigation
import Home from "./Screens/Home";
import LogIn from "./Screens/LogIn";
import RegistrationScreen1 from "./Screens/RegistrationScreen1";
import RegistrationScreen2 from "./Screens/RegistrationScreen2";
import RegistrationScreen3 from "./Screens/RegistrationScreen3";
import RegistrationScreen4 from "./Screens/RegistrationScreen4";
import RegistrationScreen5 from "./Screens/RegistrationScreen5";
import MainFeed from "./Screens/MainFeed";
import CouncilScreen from "./Screens/CouncilScreen";
import UpdateProfile from "./Screens/UpdateProfile";
import TextView from "./Popups/TextView";
import VideoPlayer from "./Popups/VideoPlayer";
import UpdateDemographics from "./Popups/UpdateDemographics";
import UpdateInterests from "./Popups/UpdateInterests";
import UpdateUpdatePreferences from "./Popups/UpdateUpdatePreferences";



export const Root = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitleStyle: { alignSelf: 'center' },
      title: 'Welcome!',
    },
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: 'Log In',
    },
  },
  RegistrationScreen1: {
    screen: RegistrationScreen1,
    navigationOptions: {
      title: 'Registration',
    }
  },
  RegistrationScreen2: {
    screen: RegistrationScreen2,
    navigationOptions: {
      title: 'Demographic info',
    }
  },
  RegistrationScreen3: {
    screen: RegistrationScreen3,
    navigationOptions: {
      title: 'Interests',
    }
  },
  RegistrationScreen4: {
    screen: RegistrationScreen4,
    navigationOptions: {
      title: 'Participation',
    }
  },
  RegistrationScreen5: {
    screen: RegistrationScreen5,
    navigationOptions: {
      title: 'Updates',
    }
  },
  MainFeed: {
    screen: MainFeed,
    navigationOptions: {
      title: 'Your Feed',
    }
  },
  CouncilScreen: {
    screen: CouncilScreen,
    navigationOptions: {
      title: 'Your Council',
    }
  },
  TextView: {
    screen: TextView,
    navigationOptions: {
      title: 'Article View'
    }
  },
  VideoPlayer: {
    screen: VideoPlayer,
    navigationOptions: {
      title: 'Video Viewer'
    }
  },
  UpdateProfile: {
    screen: UpdateProfile,
    navigationOptions: {
      title: 'Update Profile'
    }
  },
  UpdateDemographics: {
    screen: UpdateDemographics,
    navigationOptions: {
      title: "Update Demographics"
    }
  },
  UpdateInterests: {
    screen: UpdateInterests,
    navigationOptions: {
      title: "Update Interest"
    }
  },
  UpdateUpdatePreferences: {
    screen: UpdateUpdatePreferences,
    navigationOptions: {
      title: "Update Navigation Preferences"
    }
  },
  }, {headerMode: 'none'})
