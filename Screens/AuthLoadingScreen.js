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
        /**
         * TODO: implementation needs to use firebase auth rather than custom email hash 
        */
        /*
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(userEmail ? 'App' : 'RegistrationAuth
        });
        */

        const userEmail = this.fetchUserToken();
        this.props.navigation.navigate(userEmail ? 'App' : 'Auth');
        
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