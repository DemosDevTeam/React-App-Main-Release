// import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TabNavigator, TabBarBottom, StackNavigator, SwitchNavigator } from 'react-navigation';

// For good example of how to use Navigator classes, see the following link:

// https://github.com/spencercarli/getting-started-react-navigation
import Home from './Screens/Home';
import LogIn from './Screens/LogIn';
import RegistrationScreen1 from './Screens/RegistrationScreen1';
import RegistrationScreen2 from './Screens/RegistrationScreen2';
import RegistrationScreen3 from './Screens/RegistrationScreen3';
import RegistrationScreen4 from './Screens/RegistrationScreen4';
import RegistrationScreen5 from './Screens/RegistrationScreen5';
import MainFeed from './Screens/MainFeed';
import CouncilScreen from './Screens/CouncilScreen';
import UpdateProfile from './Screens/UpdateProfile';
import TextView from './Popups/TextView';
import VideoPlayer from './Popups/VideoPlayer';
import UpdateDemographics from './Popups/UpdateDemographics';
import UpdateInterests from './Popups/UpdateInterests';
import UpdateUpdatePreferences from './Popups/UpdateUpdatePreferences';
import AggregateFeedback from './Screens/AggregateFeedback';
import RegistrationScreen6 from './Screens/RegistrationScreen6';
import PinnedPosts from './Screens/PinnedPosts';

// const ProfileStack = TabNavigator({
//   UpdateProfile: {
//     screen: UpdateProfile,
//     navigationOptions: {
//       title: 'Update Profile'
//     }
//   },
//   UpdateDemographics: {
//     screen: UpdateDemographics,
//     navigationOptions: {
//       title: 'Update Demographics'
//     }
//   },
//   UpdateInterests: {
//     screen: UpdateInterests,
//     navigationOptions: {
//       title: 'Update Interest'
//     }
//   },
//   UpdateUpdatePreferences: {
//     screen: UpdateUpdatePreferences,
//     navigationOptions: {
//       title: 'Update Navigation Preferences'
//     }
//   },

// }) 

const AppTabs = TabNavigator({
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
  AggregateFeedback: {
    screen: AggregateFeedback,
    navigationOptions: {
      title: 'Your feedback'
    }
  },
  PinnedPosts: {
    screen: PinnedPosts,
    navigationOptions: {
      title: 'Pinned Posts'
    }
  }
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;

      let iconName = 'ios-warning';

      // ----- Set Tab Icons here ----- //
      if (routeName === 'MainFeed' ) {
        iconName = `ios-paper${focused ? '' : '-outline'}`;
      } else if (routeName === 'CouncilScreen') {
        // TODO: Choose icon
      } else if (routeName === 'AggregateFeedback' ) {
        // TODO: Choose icon
      } else if (routeName === 'PinnedPosts') {
        // TODO: Choose icon
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom'
})

const RegistrationStack = StackNavigator({
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
 RegistrationScreen6: {
    screen: RegistrationScreen6,
    navigationOptions: {
      title: 'Customize your location'
    }
  },
})

const AuthStack = StackNavigator({
  Home: Home,
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: 'Log In',
    },
  },
}, {
  headerMode: 'none',
});

const RootNavigator = SwitchNavigator({
  App: AppTabs,
  Auth: AuthStack
}, {
  initialRouteName: 'Auth'
}); 



// export const Root = StackNavigator({
//   TextView: {
//     screen: TextView,
//     navigationOptions: {
//       title: 'Article View'
//     }
//   },
//   VideoPlayer: {
//     screen: VideoPlayer,
//     navigationOptions: {
//       title: 'Video Viewer'
//     }
//   },
    
//   }, {headerMode: 'none'})

export default RootNavigator;