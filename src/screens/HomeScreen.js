import React, {useState, useCallback} from 'react';
//Components from react native
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';

import uuid from 'uuid/v4';
import {useFocusEffect} from '@react-navigation/native';
import * as Services from '../services/Services';
const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getUpdatedNews();
    }, [getUpdatedNews]),
  );

  //Fetch new Data
  const getUpdatedNews = useCallback(() => {
    Services.getNews().then((res) => {
      if (res) {
        setData(res);
        setisLoading(false);
      }
    });
  }, []);

  //View news navigate to DetailsScreen
  const ViewNews = (param) => {
    navigation.navigate('DetailsScreen', {
      data: param,
    });
  };

  //View when no data
  const ListEmptyComponent = () => {
    return (
      <View style={styles.ListEmptyComponentContainer}>
        <Text style={styles.noNewsTextContainer}>No News</Text>
      </View>
    );
  };

  //View on last item
  const ListFooterComponent = () => {
    return <View style={{height: 20}}></View>;
  };

  //Function to refresh data
  const refreshData = useCallback(() => {
    setisLoading(true);
    getUpdatedNews();
  }, [getUpdatedNews]);

  //Custom component every item
  const NewsCard = (props) => {
    return (
      <TouchableOpacity
        onPress={props.ViewNews}
        style={styles.newsCardContainer}>
        <Image
          source={{uri: props.backgroundImage}}
          style={{
            width: '100%',
            height: 180,
            resizeMode: 'cover',
            justifyContent: 'center',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        />
        <View style={{padding: 15}}>{props.children}</View>
      </TouchableOpacity>
    );
  };

  //Render View every Item
  const renderItem = ({item}) => {
    const {urlToImage, title, author, description, publishedAt} = item;
    return (
      <View style={{paddingStart: 2}} key={keyExtractor}>
        <NewsCard
          key={item.id}
          ViewNews={() => ViewNews(item)}
          backgroundImage={urlToImage}>
          <Text style={styles.titleText} numberOfLines={6} ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={styles.authorText}
            numberOfLines={1}
            ellipsizeMode="tail">
            {`by : ` + (author ? author : 'none')}
          </Text>
          {description ? (
            <Text
              style={styles.descriptionText}
              numberOfLines={10}
              ellipsizeMode="tail">
              {description}
            </Text>
          ) : null}
          <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
            {`Published at : ` + Services.formatMessageDate(publishedAt)}
          </Text>
        </NewsCard>
      </View>
    );
  };

  //Unique id every item
  const keyExtractor = useCallback(() => uuid(), []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.flex}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeaderStyle}>News App</Text>
        </View>

        <FlatList
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
          data={data}
          onRefresh={refreshData}
          refreshing={isloading}
          style={styles.newsListContainer}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    paddingTop: Platform.OS === 'android' ? 0 : 30,
    flex: 1,
  },
  ListEmptyComponentContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  noNewsTextContainer: {
    paddingTop: '70%',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  newsListContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  newsCardContainer: {
    width: '98%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textHeaderStyle: {
    textAlign: 'left',
    padding: 20,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
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
    paddingTop: Platform.OS === 'android' ? 0 : 0,
    backgroundColor: 'white',
    flex: 0,
    width: width,
    height: 60,
  },
});

export default HomeScreen;
