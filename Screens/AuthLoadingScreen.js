import React from 'react';

import { 
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native'

import firebase from '../db'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Check user authenticatino status
        // If authenticated send to main feed
        // Else send to registration screen
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(userEmail ? 'App' : 'Registration');
        });

        // const userEmail = this.fetchUserToken();
        
    }

    // Currently retreives user email hash from async storage
    fetchUserToken = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userEmailHash');
            return userToken;
        } catch (error) {
            console.error(error);
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