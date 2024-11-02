import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import {inject, observer} from 'mobx-react/native';
import LinearGradient from 'react-native-linear-gradient';
import UI from '../assets/UI';

@inject("store") @observer
export default class SettingModal extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up

    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#EEEEEE'
            }}>
                <View style={{
                    width: width,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems:'center'

                }}>
                    <View style={{
                        width: width - 20,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: 'transparent',
                        shadowColor: UI.COLORS_HEX.darkgray,
                        shadowOffset: {width: 1, height: 1},
                        shadowOpacity: 0.7,
                    }}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            locations={[0, 0.5, 1.0]}
                            colors={['#FF3C3D', '#DF3536', '#BC2E2F']}
                            style={{
                                position: "absolute",
                                right: 0,
                                left: 0,
                                bottom: 0,
                                elevation: 4,
                                top: 0,
                                borderRadius: 20,

                            }}/>
                        <Text style={{padding: 15, fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                            Choose Your Language
                        </Text>
                    </View>
                    <View style={{
                        width: width,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: 15,
                        paddingTop: 15,
                        marginTop:10

                    }}>
                        <Image
                            style={{
                                width: 50, height: 50,
                            }}
                            source={require('../assets/img/united-states-of-america.png')}
                            resizeMode={'cover'}
                        />
                        <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 15}}>English</Text>
                    </View>
                    <View style={{
                        width: width,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: 15,
                        paddingTop:0
                    }}>
                        <Image
                            style={{
                                width: 50, height: 50,
                            }}
                            source={require('../assets/img/turkey.png')}
                            resizeMode={'cover'}
                        />
                        <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 15}}>Turkish</Text>
                    </View>
                </View>

            </View>
        );
    }
};


