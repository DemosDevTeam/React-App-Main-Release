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

        let user = await AsyncStorage.getItem('user')

        if (!user) {
            console.log("No user session")
            user = await firebaseApp.auth().currentUser;

            if (user) {
                this.saveItem('user', user) 
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

    /**
     * DEPRECATED
     * Retreives user email hash from async storage
    fetchUserToken = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userEmailHash');
            return userToken;
        } catch (error) {
            console.error(error);
        }
    }
    */

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