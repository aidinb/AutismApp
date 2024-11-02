import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    WebView
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import UI from '../assets/UI';


export default class Detail extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false,
            itm: this.props.itm
        };

    }


    render() {
        let itm = this.props.itm;
        return (
            <ScrollView style={{
                flex: 1,
                padding: 15,
                paddingTop: 0,

            }} contentContainerStyle={{paddingBottom: 100}}>
                {itm.video1.length > 0 && <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.1)',
                }}>
                    <Text style={{fontWeight: 'bold'}}>Videos & Images</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{
                        justifyContent: 'space-around',
                        paddingTop: 5,
                        paddingBottom: 15,
                        marginTop: 10
                    }}>
                        {itm.video1.length > 0 &&
                        <TouchableOpacity onPress={()=>this.props.navigator.push({
                            screen: 'Video',
                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                            animationType: 'fade',
                            passProps: {url: itm.video2}

                        }) }
                                          style={{
                                              width: 120,
                                              height: 200,
                                              backgroundColor: 'white',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              borderWidth: 2,
                                              borderColor: '#62BCB6',
                                              marginRight: 15
                                          }}>
                            <WebView
                                source={{uri: itm.video1}}
                                style={{marginTop: 20, height: 200, width: 118, opacity: 0.2}}
                                startInLoadingState={true}
                            />
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 13,
                                }}
                                source={require('../assets/img/video-play-2-image.gif')}
                                resizeMode={'cover'}
                            />

                        </TouchableOpacity>}
                        {itm.video2.length > 0 &&
                        <TouchableOpacity onPress={()=> this.props.navigator.push({
                            screen: 'Video',
                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                            animationType: 'fade',
                            passProps: {url: itm.video2}

                        })}
                                          style={{
                                              width: 120,
                                              height: 200,
                                              backgroundColor: 'white',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              borderWidth: 2,
                                              borderColor: '#62BCB6',
                                              marginRight: 15
                                          }}>
                            <WebView
                                source={{uri: itm.video2}}
                                style={{marginTop: 20, height: 200, width: 118, opacity: 0.2}}
                                startInLoadingState={true}
                            />
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 13,
                                }}
                                source={require('../assets/img/video-play-2-image.gif')}
                                resizeMode={'cover'}
                            />

                        </TouchableOpacity>}
                        {itm.video3.length > 0 &&
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Video', {url: itm.video3})}
                                          style={{
                                              width: 120,
                                              height: 200,
                                              backgroundColor: 'white',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              borderWidth: 2,
                                              borderColor: '#62BCB6',
                                              marginRight: 15
                                          }}>
                            <WebView
                                source={{uri: itm.video3}}
                                style={{marginTop: 20, height: 200, width: 118, opacity: 0.2}}
                                startInLoadingState={true}
                            />
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 13,
                                }}
                                source={require('../assets/img/video-play-2-image.gif')}
                                resizeMode={'cover'}
                            />

                        </TouchableOpacity>}
                        {itm.video4.length > 0 &&
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Video', {url: itm.video4})}
                                          style={{
                                              width: 120,
                                              height: 200,
                                              backgroundColor: 'white',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              borderWidth: 2,
                                              borderColor: '#62BCB6',
                                              marginRight: 15
                                          }}>
                            <WebView
                                source={{uri: itm.video4}}
                                style={{marginTop: 20, height: 200, width: 118, opacity: 0.2}}
                                startInLoadingState={true}
                            />
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 13,
                                }}
                                source={require('../assets/img/video-play-2-image.gif')}
                                resizeMode={'cover'}
                            />
                        </TouchableOpacity>}
                        {itm.video5.length > 0 &&
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Video', {url: itm.video5})}
                                          style={{
                                              width: 120,
                                              height: 200,
                                              backgroundColor: 'white',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              borderWidth: 2,
                                              borderColor: '#62BCB6',
                                              marginRight: 15
                                          }}>
                            <WebView
                                source={{uri: itm.video5}}
                                style={{marginTop: 20, height: 200, width: 118, opacity: 0.2}}
                                startInLoadingState={true}
                            />
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    position: 'absolute',
                                    bottom: 50,
                                    left: 13,
                                }}
                                source={require('../assets/img/video-play-2-image.gif')}
                                resizeMode={'cover'}
                            />

                        </TouchableOpacity>}

                    </ScrollView>
                </View>}
                <View style={{
                    width: width - 20,
                    paddingTop: 5,
                    paddingRight: 10
                }}>
                    <Text style={{fontWeight: 'bold'}}>Categories</Text>
                    {itm.category1.length > 0 &&
                    <Text style={{marginTop: 10, textAlign: 'justify'}}>{itm.category1}</Text>}
                    {itm.category2.length > 0 &&
                    <Text style={{marginTop: 10, textAlign: 'justify'}}>{itm.category2}</Text>}
                    {itm.category3.length > 0 &&
                    <Text style={{marginTop: 10, textAlign: 'justify'}}>{itm.category31}</Text>}
                    {itm.category4.length > 0 &&
                    <Text style={{marginTop: 10, textAlign: 'justify'}}>{itm.category4}</Text>}
                </View>
                <View style={{
                    width: width - 20,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(0,0,0,0.1)',
                    marginTop: 10,
                    paddingTop: 10,
                    paddingRight: 10
                }}>
                    <Text style={{fontWeight: 'bold'}}>Description</Text>
                    <Text style={{marginTop: 10, textAlign: 'justify'}}>{itm.itunes_description}</Text>
                </View>


            </ScrollView>
        );
    }
};


