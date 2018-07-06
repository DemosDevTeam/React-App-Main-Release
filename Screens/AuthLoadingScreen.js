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
        try {
            const user = await firebaseApp.auth().currentUser;
            
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        } catch (error) {
            const { code, message } = error;
            // TODO: PLEASE HANDLE ME PROPERLY
            console.error(code, message);
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