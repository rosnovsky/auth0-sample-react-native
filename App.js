/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Alert,
} from 'react-native';
import decode from 'jwt-decode';
import credentials from './credentials.json';

import Auth0 from 'react-native-auth0';

import Header from './components/Header';
import Colors from './components/Colors';
import LearnMoreLinks from './components/LearnMoreLinks';

const App: () => React$Node = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const alert = () => {
    Alert.alert(
      'User Email',
      `Logged in user has an email: ${user.email}!`,
      [
        {
          text: 'Cool',
          onPress: () => console.log(user.email),
        },
      ],
      {cancelable: false},
    );
  };
  const auth0 = new Auth0({
    domain: credentials.domain, // test domain
    clientId: credentials.clientId, // test clientId
  });

  const getUser = () => {
    setUser(null);
    setError(null);
    auth0.auth
      .passwordRealm({
        username: credentials.username, // test email address
        password: credentials.password, // test password
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email',
        audience: credentials.audience, // test audience
      })
      .then(response => {
        const userDetails = decode(response.idToken);
        setUser(userDetails);
        console.log(userDetails);
      })
      .catch(err => {
        setError(err);
        console.log(JSON.stringify(err));
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button title="Tap Me!" color="#EB5424" onPress={getUser} />
              <Text style={styles.sectionDescription}>
                In this example, we're using a set of predefined credentials,
                and static username/password (see{' '}
                <Text style={styles.highlight}>credentials.example.json</Text>).
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Results</Text>
              <Text style={styles.sectionDescription}>
                If login is successful, you'll see logged in user's info below.
              </Text>
              <Text style={styles.sectionDescription}>
                {user ? (
                  <Text style={styles.highlight}>
                    Logged in as <Text onPress={alert}>{user.name}.</Text>
                  </Text>
                ) : (
                  ''
                )}
                {error ? (
                  <Text style={styles.error}>
                    Error:{' '}
                    <Text>
                      {error.status} {error.message}
                    </Text>
                  </Text>
                ) : (
                  ''
                )}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Further reading</Text>
              <LearnMoreLinks />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  error: {
    color: Colors.error,
    fontWeight: '900',
  },
});

export default App;
