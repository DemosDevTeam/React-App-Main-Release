import React from 'react';

import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native'

import firebaseApp from '../firebaseApp'

class AuthLoadingScreen extends React.Component {
    async componentDidMount() {

        // If user is authenticated redirect to app
        // Else redirect to authentication router

        //Needs to be returned to AsyncStorage.getItem('user')
        let user = await AsyncStorage.getItem('use')

        if (!user) {
            console.log("No user session")
            user = await firebaseApp.auth().currentUser;

            if (user) {
              //need to change back to user
                this.saveItem('use', user)
            }
        } else {
            console.log("User found in session", user.uid)
        }

        this.props.navigation.navigate(user ? 'App' : 'Auth');
    }

    saveItem = async (item, selectedValue) => {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

export default AuthLoadingScreen;
