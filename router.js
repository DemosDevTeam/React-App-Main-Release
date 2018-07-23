import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TabNavigator, TabBarBottom, StackNavigator, SwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './Screens/AuthLoadingScreen'
import Home from './Screens/Home';
import LogIn from './Screens/LogIn';
import RegistrationScreen1 from './Screens/RegistrationScreen1';
import RegistrationScreen2 from './Screens/RegistrationScreen2';
import RegistrationScreen3 from './Screens/RegistrationScreen3';
import RegistrationScreen4 from './Screens/RegistrationScreen4';
import RegistrationScreen5 from './Screens/RegistrationScreen5';

// import MainFeed from './Screens/MainFeed';
import MainFeed from './Screens/MainFeedNew';
import ArticleScreen from './Screens/ArticleScreen'

import CouncilScreen from './Screens/CouncilScreen';
import UpdateProfile from './Screens/UpdateProfile';
import TextView from './Popups/TextView';
import VideoPlayer from './Popups/VideoPlayer';
import UpdateDemographics from './Popups/UpdateDemographics';
import UpdateInterests from './Popups/UpdateInterests';
import UpdateUpdatePreferences from './Popups/UpdateUpdatePreferences';
//import AggregateFeedback from './Screens/AggregateFeedback';
import AggregateFeedback from './Screens/AggregateFeedbackNew';
import RegistrationScreen6 from './Screens/RegistrationScreen6';
//import PinnedPosts from './Screens/PinnedPosts';
import PinnedPosts from './Screens/PinnedPostsNew'

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

const ArticleStack = StackNavigator ({
  MainFeed: {
    screen: MainFeed
  },
  Article: {
    screen: ArticleScreen
  }
}, {
  navigationOptions: {
    visible: false
  }
})

const AppTabs = TabNavigator({
  MainFeed: {
    screen: ArticleStack,
    navigationOptions: {
      title: 'My Feed',
    }
  },
  CouncilScreen: {
    screen: CouncilScreen,
    navigationOptions: {
      title: 'My Council',
    }
  },
  AggregateFeedback: {
    screen: AggregateFeedback,
    navigationOptions: {
      title: 'My Feedback'
    }
  },
  PinnedPosts: {
    screen: PinnedPosts,
    navigationOptions: {
      title: 'My Bookmarks'
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
        iconName = `ios-people${focused ? '' : '-outline'}`;
      } else if (routeName === 'AggregateFeedback' ) {
        iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
      } else if (routeName === 'PinnedPosts') {
        iconName = `ios-bookmark${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: '#EE4C50',
    inactiveTintColor: '#4C4343'
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

// Screen's that allow all user's to view
// Registration, login, splash screen
const UnauthenticatedStack = StackNavigator({
  Home: Home,
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: 'Log In',
    },
  },
  Registration: RegistrationStack
}, {
  headerMode: 'none',
});

// Need a registered user
const AuthenticatedStack = StackNavigator({
  App: AppTabs
}, {
  navigationOptions: {
    visible: false
  }
})

const RootNavigator = SwitchNavigator({
  App: AuthenticatedStack,
  Auth: UnauthenticatedStack,
  AuthLoading: AuthLoadingScreen
}, {
  initialRouteName: 'AuthLoading'
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
