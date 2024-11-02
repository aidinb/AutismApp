import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-crop-picker';
import {inject, observer} from 'mobx-react/native';
import LinearGradient from 'react-native-linear-gradient';
import UI from '../assets/UI';
@inject("store") @observer
export default class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            pas: '',
            confPass: '',
            gender: 0,
            image: null,
            imageObject: null,
            imageChanged: false,

        }

    }

    editPhoto = () => {
        Alert.alert(
            'Uneed',
            'Choose image',
            [
                {text: 'From Camera', onPress: () => this.selectCamera()},
                {text: 'From Photos', onPress: () => this.selectImage()},
                {
                    text: 'Cancel', onPress: () => {
                }, style: 'cancel'
                },
            ],
            {cancelable: false}
        )
    }
    selectImage = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
                imageChanged: true,
                imageObject: image
            });
        });
    }

    selectCamera = () => {
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true
        }).then(image => {
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
                imageChanged: true,
                imageObject: image
            });
        });
        // console.log(this.state.imageObject);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignItems: 'center'
            }}>
                <View style={{width: width, padding: 10, flexDirection: 'row', paddingTop: 25}}>

                    <View style={{width: width / 2, justifyContent: 'space-between'}}>
                        <TextInput
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.name}
                            style={{
                                height: 40,
                                backgroundColor: '#FFFCF5',
                                borderRadius: 7,
                                padding: 5,
                                shadowColor: UI.COLORS_HEX.darkgray,
                                shadowOffset: {width: 1, height: 1},
                                shadowOpacity: 0.7,
                            }}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            placeholder={'Name'}
                        />
                        <TextInput
                            onChangeText={(text) => this.setState({surname: text})}
                            value={this.state.surname}
                            style={{
                                height: 40,
                                backgroundColor: '#FFFCF5',
                                borderRadius: 7,
                                padding: 5,
                                shadowColor: UI.COLORS_HEX.darkgray,
                                shadowOffset: {width: 1, height: 1},
                                shadowOpacity: 0.7,
                            }}
                            autoCorrect={false}
                            autoCapitalize={"none"}
                            placeholder={'Surname'}
                        />
                    </View>
                    <View style={{
                        borderRadius: 3,
                        width: width / 2,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'transparent'
                    }}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                shadowColor: UI.COLORS_HEX.darkgray,
                                shadowOffset: {width: 1, height: 1},
                                shadowOpacity: 0.7,
                                borderRadius: 3
                            }}
                            source={require('../assets/img/profile-placeholder.jpg')}
                            resizeMode={'cover'}
                        />
                        <TouchableOpacity activeOpacity={0.6} onPress={this.editPhoto} style={{
                            width: 100,
                            height: 30,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            paddingBottom: 5,
                            marginTop: -30
                        }}>
                            <Text style={{color: 'white'}}>Edit Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                    style={{
                        width: width - 20, padding: 10, flexDirection: 'row', height: 40,
                        backgroundColor: '#FFFCF5',
                        borderRadius: 7,
                        shadowColor: UI.COLORS_HEX.darkgray,
                        shadowOffset: {width: 1, height: 1},
                        shadowOpacity: 0.7,
                        marginTop: 15
                    }}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    placeholder={'Email'}
                />
                <TextInput
                    onChangeText={(text) => this.setState({pass: text})}
                    value={this.state.pass}
                    style={{
                        width: width - 20, padding: 10, flexDirection: 'row', height: 40,
                        backgroundColor: '#FFFCF5',
                        borderRadius: 7,
                        shadowColor: UI.COLORS_HEX.darkgray,
                        shadowOffset: {width: 1, height: 1},
                        shadowOpacity: 0.7,
                        marginTop: 15
                    }}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    placeholder={'Password'}
                    secureTextEntry={true}
                />
                <TextInput
                    onChangeText={(text) => this.setState({confPass: text})}
                    value={this.state.confPass}
                    style={{
                        width: width - 20, padding: 10, flexDirection: 'row', height: 40,
                        backgroundColor: '#FFFCF5',
                        borderRadius: 7,
                        shadowColor: UI.COLORS_HEX.darkgray,
                        shadowOffset: {width: 1, height: 1},
                        shadowOpacity: 0.7,
                        marginTop: 15
                    }}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    placeholder={'Confirm Password'}
                    secureTextEntry={true}

                />

                <View style={{
                    width: width - 20,
                    height: 45,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 13,
                    marginTop: 15,
                    borderColor: 'rgba(197,43,44,0.5)',
                    borderWidth: 1,
                    borderRadius: 7,
                    paddingTop: 0,
                    paddingBottom: 0,

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
                            borderRadius: 7,
                        }}/>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>Gender</Text>
                    <View style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        marginRight: 5
                    }}>
                        <TouchableOpacity onPress={() => this.setState({gender: 0})} activeOpacity={0.6} style={{
                            padding: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 80,
                            marginRight: 5,
                            backgroundColor: this.state.gender === 0 ? 'white' : 'transparent',
                            borderRadius: 3,
                            shadowColor: UI.COLORS_HEX.darkgray,
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: this.state.gender === 0 ? 0.7 : 0,
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: this.state.gender === 0 ? 'black' : 'black',
                                fontWeight: this.state.gender === 0 ? 'bold' : 'normal',


                            }}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({gender: 1})} activeOpacity={0.6}
                                          style={{
                                              padding: 10,
                                              justifyContent: "center",
                                              alignItems: "center",
                                              width: 80,
                                              marginRight: 5,
                                              borderRadius: 3,
                                              backgroundColor: this.state.gender === 1 ? 'white' : 'transparent',
                                              shadowColor: UI.COLORS_HEX.darkgray,
                                              shadowOffset: {width: 1, height: 1},
                                              shadowOpacity: this.state.gender === 1 ? 0.7 : 0,
                                          }}>
                            <Text style={{
                                fontSize: 14,
                                color: this.state.gender === 1 ? 'black' : 'rgba(0,0,0,0.8)',
                                fontWeight: this.state.gender === 1 ? 'bold' : 'normal',
                            }}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={()=>navigator.push({
                    screen: 'Suggestions',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps: {res: this.state.graphData}

                })} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: width,
                    height: 50,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    borderTopRightRadius: 40,
                    borderTopLeftRadius: 40,
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
                            borderTopRightRadius: 40,
                            borderTopLeftRadius: 40,
                            overflow: 'hidden'

                        }}/>
                    <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>Save</Text>
                </TouchableOpacity>

            </View>
        );
    }
};


