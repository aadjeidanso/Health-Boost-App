import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function LoginPage({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(() => {
                setLoading(false);
                navigation.navigate('Profile');
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error.message);
            });
    };

    const handleRegister = () => {
        setLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then(() => {
                setLoading(false);
                navigation.navigate('Profile');
            })
            .catch((error) => {
                setLoading(false);
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    Alert.alert('Error', 'The password is too weak.');
                } else if (errorCode === 'auth/email-already-in-use') {
                    Alert.alert('Error', 'Email is already in use.');
                } else {
                    Alert.alert('Error', errorMessage);
                }
            });
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00bfa5" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <>
                    <Text style={styles.logo}>HealthBoost</Text>
                    <Text style={styles.subtitle}>Stay Healthy, Stay Strong</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Username or Email"
                            placeholderTextColor="#003f5c"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginText}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupText}>Don't have an account? Sign up now</Text>
                    </TouchableOpacity>
                    <View style={styles.orView}>
                        <View style={styles.orLine}></View>
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.orLine}></View>
                    </View>
                    <TouchableOpacity style={styles.loginBtnFacebook}>
                        <Text style={styles.loginTextFacebook}>Sign Up with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtnGoogle}>
                        <Text style={styles.loginTextGoogle}>Sign Up with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 48,
        color: '#fb5b5a',
        marginBottom: 5,
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 16,
        color: '#616161',
        marginBottom: 40,
    },
    inputView: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    inputText: {
        height: 50,
        color: '#424242',
    },
    loginBtn: {
        width: '100%',
        backgroundColor: '#00bfa5',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signupText: {
        color: '#616161',
        marginTop: 15,
        marginBottom: 20,
    },
    orView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    orLine: {
        height: 1,
        flex: 1,
        backgroundColor: '#e0e0e0',
    },
    loginBtnFacebook: {
        width: '100%',
        backgroundColor: '#3b5998',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    loginTextFacebook: {
        color: 'white',
        fontWeight: 'bold',
    },
    loginBtnGoogle: {
        width: '100%',
        backgroundColor: '#DB4437',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    loginTextGoogle: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#00bfa5',
        padding: 10,
        borderRadius: 25,
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});





