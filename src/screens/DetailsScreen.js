import React, {useEffect, useState} from 'react';
//Components from react native
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Linking,
  ActivityIndicator,
} from 'react-native';

//Component from react native elements
import {Icon} from 'react-native-elements';

//Function from another file
import * as Services from '../services/Services';
const {width} = Dimensions.get('window');

const DetailsScreen = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const {data} = route.params;
    setData(data);
    setTimeout(() => setLoading(false), 800);
  }, [route.params]);
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{uri: data.urlToImage}}
        style={styles.imageBackground}>
        <View style={styles.flex}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerContainer}>
            <Icon
              iconStyle={{padding: 20}}
              size={30}
              name="arrow-back-outline"
              type="ionicon"
              reverse
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{padding: 15}}>
        <TouchableOpacity
          onPress={() =>
            Linking.canOpenURL(data.url).then((supported) => {
              if (supported) {
                Linking.openURL(data.url);
              } else {
                Alert.alert(
                  '',
                  `Don't know how to open URL: ` + data.url,
                  [
                    {
                      text: 'OK',
                      onPress: () => {},
                    },
                  ],
                  {cancelable: false},
                );
              }
            })
          }>
          <Text style={styles.titleText}>{data.title}</Text>
        </TouchableOpacity>
        <Text style={styles.authorText}>
          {`by : ` + (data.author ? data.author : 'none')}
        </Text>

        <Text style={styles.descriptionText}>{data.description}</Text>
        <Text style={styles.descriptionText}>{data.content}</Text>
        <Text style={styles.dateText}>
          {`Published at : ` + Services.formatMessageDate(data.publishedAt)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    paddingTop: Platform.OS === 'android' ? 0 : 30,
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageBackground: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  authorText: {
    color: 'black',
  },
  descriptionText: {
    paddingTop: 10,
    color: 'black',
  },
  dateText: {
    paddingTop: 10,
    alignSelf: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flex: 0,
    width: width,
    height: 80,
  },
});

export default DetailsScreen;
