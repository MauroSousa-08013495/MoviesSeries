/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const FEATURED_API =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=08289583f4dda345d359af461ba727bf&page=1';
  const IMG_API = 'https://image.tmdb.org/t/p/w1280';
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=08289583f4dda345d359af461ba727bf&query=';

  const [movie, setMovie] = useState([]);
  const [searchText, setSearchText] = useState('');

  console.log(searchText);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(FEATURED_API);
      const data = await response.json();
      setMovie(data.results);
    };

    fetchData();
    searchMovies(searchText);
  }, []);

  function getMovie() {
    const fetchData = async () => {
      const response = await fetch(FEATURED_API);
      const data = await response.json();
      setMovie(data.results);
    };

    fetchData();
  }

  function searchMovies(searchText: string) {
    const fetchMovie = async () => {
      const response = await fetch(SEARCH_API + searchText);
      const data = await response.json();

      if (data.results == 0) {
        getMovie();
      }

      setMovie(data.results);
      
    };

    fetchMovie();
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              margin: 10,
              borderRadius: 10,
              padding: 10,
            }}
            placeholder="Search for a Movie!"
            onChangeText={searchText => setSearchText(searchText)}
            onSubmitEditing={() => searchMovies(searchText)
            }
            ></TextInput>
          {movie.map(movie => (
            <View
              key={movie.id}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                backgroundColor: 'white',
              }}>
              <ImageBackground
                source={{
                  uri: IMG_API + movie.backdrop_path,
                }}
                style={{
                  width: '100%',
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  resizeMode: 'cover',
                }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: 10,
                    }}>
                    <Text style={{color: 'white', fontSize: 20}}>
                      {movie.title}
                    </Text>

                    <Text style={{color: 'white', fontSize: 15, maxHeight: 110, minWidth: 370}}>
                      {movie.overview}
                    </Text>

                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      <Ionicons name="star" color="yellow" size={20} />
                      Average Rating: {movie.vote_average}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SeriesScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const FEATURED_API =
    'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=08289583f4dda345d359af461ba727bf&page=1';
  const IMG_API = 'https://image.tmdb.org/t/p/w1280';
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/tv?sort_by=popularity.desc&api_key=08289583f4dda345d359af461ba727bf&query=';

  const [serie, setSerie] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(FEATURED_API);
      const data = await response.json();
      setSerie(data.results);
    };

    fetchData();
    searchSerie(searchText);
  }, []);

  function getSerie() {
    const fetchData = async () => {
      const response = await fetch(FEATURED_API);
      const data = await response.json();
      setSerie(data.results);
    };

    fetchData();
  }

  function searchSerie(searchText: string) {
    const fetchMovie = async () => {
      const response = await fetch(SEARCH_API + searchText);
      const data = await response.json();
      console.log(data.results);

      if (data.results == 0) {
        getSerie();
      }

      setSerie(data.results);
    };

    fetchMovie();
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              margin: 10,
              borderRadius: 10,
              padding: 10,
            }}
            placeholder="Search for a series!"
            onChangeText={searchText => setSearchText(searchText)}
            onSubmitEditing={() => searchSerie(searchText)}
            ></TextInput>
          {serie.map(serie => (
            <View
              key={serie.id}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                backgroundColor: 'white',
              }}>
              <ImageBackground
                source={{
                  uri: IMG_API + serie.backdrop_path,
                }}
                style={{
                  width: '100%',
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  resizeMode: 'cover',
                }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: 10,
                    }}>
                    <Text style={{color: 'white', fontSize: 20}}>
                      {serie.name}
                    </Text>

                    <Text style={{color: 'white', fontSize: 15, maxHeight: 110}}>
                      {serie.overview}
                    </Text>

                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      <Ionicons name="star" color="yellow" size={20} />
                      Average Rating: {serie.vote_average}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: isDarkMode ? Colors.darker : Colors.lighter,
          background: isDarkMode ? Colors.darker : Colors.lighter,
          card: isDarkMode ? Colors.darker : Colors.lighter,
          text: isDarkMode ? Colors.white : Colors.black,
          border: isDarkMode ? Colors.darker : Colors.lighter,
          notification: isDarkMode ? Colors.darker : Colors.lighter,
        },
      }}>
      <Tab.Navigator
        screenOptions={{
          tabBarBackground() {
            return (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 50,
                  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
                }}
              />
            );
          },
          tabBarActiveTintColor: 'lightblue',
          tabBarLabelStyle: {fontSize: 12},
        }}
        initialRouteName="Movies">
        <Tab.Screen
          name="Movies Section"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Movies',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="movie-creation" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Series Section"
          component={SeriesScreen}
          options={{
            tabBarLabel: 'Series',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="tv" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
