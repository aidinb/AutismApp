import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image,
    Linking
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import StarRating from 'react-native-star-rating';
import {inject, observer} from 'mobx-react/native';

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Segments from '../component/Segments';
import NavBar from '../component/NavBar';

@inject("store") @observer
export default class AppDet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            starCount: 3.5,
            showPage: 'Det'


        };
        // if you want to listen on navigator events, set this up
    }

    handleClick = (url) => {
        console.log(url);
        Linking.openURL(url);
    };

    render() {
        let itm = this.props.itm;

        return (
            <View style={styles.container}>
                <NavBar title={itm.itunes_title}/>
                <ScrollView>
                    <View style={{
                        width: width,
                        paddingTop: 10,
                        padding: 10,
                    }}>
                        <View style={{
                            width: width - 20,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}>
                            <View style={{width: 140}}>
                                <Image
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderWidth: 1,
                                        borderColor: 'rgba(0,0,0,0.2)',
                                        borderRadius: 12
                                    }}
                                    source={{uri: itm.itunes_imageLink}}
                                    resizeMode={'cover'}

                                />
                                <View style={{
                                    width: 120,
                                    flexDirection: 'column',
                                    paddingTop: 15,

                                }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={parseInt(itm.itunes_rating)}
                                        starColor={'gold'}
                                        starSize={20}
                                    />

                                    <TouchableOpacity activeOpacity={0.6}
                                                      onPress={()=>this.handleClick('itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=' + itm.itunes_id)}
                                                      style={{
                                                          width: 130,
                                                          height: 40,
                                                          borderRadius: 7,
                                                          borderWidth: 1,
                                                          borderColor: '#0079FD',
                                                          justifyContent: 'center',
                                                          alignItems: 'center',
                                                          marginTop: 10
                                                      }}>
                                        <Text
                                            style={{fontWeight: 'bold', fontSize: 18, color: '#0079FD'}}>Download</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flexDirection: 'column', width: width - 160}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>{itm.itunes_title}</Text>
                                <Text style={{marginTop: 5}}>Publish at: <Text
                                    style={{fontWeight: 'bold'}}>{itm.date.substring(0, 10)}</Text></Text>
                                <Text style={{fontWeight: 'bold', marginTop: 5}}>{itm.itunes_device}</Text>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginTop: 5
                                }}>{itm.itunes_price == 0 ? 'Free' : '$' + itm.itunes_price}</Text>
                            </View>
                        </View>
                    </View>

                    <Segments itm={itm} navigator={this.props.navigator}/>
                </ScrollView>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>this.props.navigator.pop()} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    marginTop: 7,
                }}>
                    <Icon name="md-arrow-round-back" size={30} color={'white'}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4fcfc',
    },
});

