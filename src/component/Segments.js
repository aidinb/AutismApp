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
import Detail from '../component/Detail';
import Review from '../component/Review';
import Related from '../component/Related';
import LinearGradient from 'react-native-linear-gradient';
import UI from '../assets/UI';


export default class Segments extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false,
            showPage: 'Det'
        };


        this.renderSegment = this.renderSegment.bind(this);

    }

    renderSegment(segment) {
        this.setState({showPage: segment})
    }

    render() {
        return (
            <View style={{flex: 1, width: width, alignItems: 'center', marginTop: 10}}>
                <View style={{
                    flexDirection: "row",
                    backgroundColor: "#268F8F",
                    elevation: 20,
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius: 17,
                    height: 34,
                }}>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        locations={[0, 0.5, 1.0]}
                        colors={['#268F8F', '#006A7A', '#026374']}
                        style={{
                            position: "absolute",
                            right: 0,
                            left: 0,
                            bottom: 0,
                            top: 0,
                            borderRadius: 17,
                            elevation: 2,
                            shadowColor: UI.COLORS_HEX.darkgray,
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.6,
                        }}/>
                    <TouchableOpacity hitSlop={{top: 10, left: 5, right: 5, bottom: 10}}
                                      onPress={()=>this.renderSegment('Det')} activeOpacity={0.6} style={{
                        width: width / 3 - 3,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        height: 34,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 17
                    }}>
                        {this.state.showPage == 'Det' && <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            locations={[0, 0.5, 1.0]}
                            colors={['#FF3C3D', '#DF3536', '#BC2E2F']}
                            style={{
                                position: "absolute",
                                right: 0,
                                left: 0,
                                bottom: 0,
                                top: 0,
                                borderRadius: 17,
                                elevation: 2,
                                shadowColor: UI.COLORS_HEX.darkgray,
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.6,
                            }}/>}
                        <Text style={{
                            color: this.state.showPage == 'Det' ? 'white' : 'rgba(255,255,255,0.8)',
                            fontWeight: this.state.showPage == 'Det' ? 'bold' : 'normal',
                            backgroundColor:'transparent'

                        }}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.renderSegment('Rev')} activeOpacity={0.6} style={{
                        width: width / 3 - 3,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        height: 34,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 17
                    }}>
                        {this.state.showPage == 'Rev' && <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            locations={[0, 0.5, 1.0]}
                            colors={['#FF3C3D', '#DF3536', '#BC2E2F']}
                            style={{
                                position: "absolute",
                                right: 0,
                                left: 0,
                                bottom: 0,
                                top: 0,
                                borderRadius: 17,
                                elevation: 2,
                                shadowColor: UI.COLORS_HEX.darkgray,
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.6,
                            }}/>}
                        <Text style={{
                            color: this.state.showPage == 'Rev' ? 'white' : 'rgba(255,255,255,0.8)',
                            fontWeight: this.state.showPage == 'Rev' ? 'bold' : 'normal',
                            backgroundColor:'transparent'

                        }}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.renderSegment('Rel')} activeOpacity={0.6} style={{
                        width: width / 3 - 3,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        height: 34,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 17
                    }}>
                        {this.state.showPage == 'Rel' && <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            locations={[0, 0.5, 1.0]}
                            colors={['#FF3C3D', '#DF3536', '#BC2E2F']}
                            style={{
                                position: "absolute",
                                right: 0,
                                left: 0,
                                bottom: 0,
                                top: 0,
                                borderRadius: 17,
                                elevation: 2,
                                shadowColor: UI.COLORS_HEX.darkgray,
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.6,
                            }}/>}
                        <Text style={{
                            color: this.state.showPage == 'Rel' ? 'white' : 'rgba(255,255,255,0.8)',
                            fontWeight: this.state.showPage == 'Rel' ? 'bold' : 'normal',
                            backgroundColor:'transparent'
                        }}>Related</Text>
                    </TouchableOpacity>


                </View>
                <View style={{
                    borderTopColor: 'rgba(0,0,0,0.1)',
                    borderTopWidth: 1,
                    paddingTop: 10,
                    marginTop: 10,

                }}>
                    {this.state.showPage == 'Det' ?
                        <Detail navigator={this.props.navigator} itm={this.props.itm}/> : this.state.showPage == 'Rev' ?
                        <Review itm={this.props.itm}/> :
                        <Related itm={this.props.itm} navigator={this.props.navigator}/>
                    }

                </View>
            </View>
        );
    }
};


