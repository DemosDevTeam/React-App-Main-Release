import React from 'react';

import { 
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View
} from 'react-native'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const userEmail = this.fetchUserToken();
        
        this.props.navigation.navigate(userEmail ? 'App' : 'Auth');
    }

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