import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import Triangle from 'react-native-triangle';
import LinearGradient from 'react-native-linear-gradient';

export default class AppModel extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#f4fcfc'}}>

                <View style={{
                    width: width,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#268F8F',
                    flexDirection: 'row',
                    padding: 10,
                    paddingRight: 0,
                    backgroundColor:'#f4fcfc'

                }}>
                    <View style={{
                        flex: 0.3,
                        justifyContent: 'center',
                        backgroundColor: '#f4fcfc',
                        alignItems: 'center'
                    }}>
                        <FastImage
                            style={{
                                width: 100,
                                height: 100,
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                borderRadius: 15,


                            }}
                            source={{uri: this.props.itm.itunes_imageLink}}
                            resizeMode={'cover'}

                        />
                    </View>
                    <View style={{
                        flex: 0.5,
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent',
                        alignItems: 'flex-start',
                        paddingLeft: 20
                    }}>
                        <Text numberOfLines={1}>{this.props.itm.itunes_title}</Text>
                        <Text numberOfLines={1}>{this.props.itm.itunes_description}</Text>
                        <Text numberOfLines={1}>{this.props.itm.itunes_device}</Text>
                        <Text numberOfLines={1}>{this.props.itm.category1}</Text>
                    </View>
                    <View style={{
                        flex: 0.2,
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent',
                        alignItems: 'flex-end',
                    }}>
                        <Triangle
                            width={15}
                            height={27}
                            color={'white'}
                            direction={'right'}
                            style={{position: 'absolute', right: 45, zIndex: 1}}
                        />
                        <View style={{
                            backgroundColor: 'transparent',
                            width: 60,
                            padding: 5,
                            alignItems: 'flex-end',
                            paddingRight: 6,

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
                                    top:0,

                                }}/>
                            <Text style={{color: 'white', fontWeight: 'bold',fontSize:11}}>{this.props.itm.itunes_price==0?'Free':'$'+this.props.itm.itunes_price}</Text>
                        </View>
                        <Triangle
                            width={20}
                            height={20}
                            color={'#026374'}
                            direction={'down-right'}
                            style={{marginRight: 5}}
                        />
                    </View>
                </View>

            </View>
        );
    }
};


