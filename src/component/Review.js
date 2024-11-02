import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    WebView,
    Linking
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'


export default class Review extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false,
            itm: this.props.itm
        };
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick = (url) => {
        console.log(url);
        Linking.openURL(url);
    };

    render() {
        let itm = this.props.itm;
        return (
            <ScrollView style={{
                flex: 1,
                padding: 15,
                paddingTop: 0,
                width: width,

            }} contentContainerStyle={{paddingBottom: 100}}>
                <Text style={{fontWeight: 'bold', paddingBottom: 15}}>Reviews</Text>

                {itm.review1.length > 0 &&
                <View style={{borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)', paddingBottom: 20}}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.handleClick(itm.review1)}>
                        <Text style={{fontWeight: 'bold'}}>URL: </Text><Text>{itm.review1}</Text>
                    </TouchableOpacity>
                    <WebView
                        source={{uri: itm.review1}}
                        style={{marginTop: 20, height: 200}}
                        startInLoadingState={true}
                    />
                </View>
                }
                {itm.review2.length > 0 &&
                <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(0,0,0,0.2)',
                    paddingBottom: 20,
                    paddingTop: 20
                }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.handleClick(itm.review2)}>
                        <Text style={{fontWeight: 'bold'}}>URL: </Text><Text>{itm.review2}</Text>
                    </TouchableOpacity>
                    <WebView
                        source={{uri: itm.review2}}
                        style={{marginTop: 20, height: 200}}
                        startInLoadingState={true}
                    />
                </View>
                }
                {itm.review3.length > 0 &&
                <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(0,0,0,0.2)',
                    paddingBottom: 20,
                    paddingTop: 20
                }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.handleClick(itm.review3)}>
                        <Text style={{fontWeight: 'bold'}}>URL: </Text><Text>{itm.review3}</Text>
                        <WebView
                            source={{uri: itm.review3}}
                            style={{marginTop: 20, height: 200}}
                            startInLoadingState={true}
                        />
                    </TouchableOpacity>
                </View>
                }
                {itm.review4.length > 0 &&
                <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(0,0,0,0.2)',
                    paddingBottom: 20,
                    paddingTop: 20
                }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.handleClick(itm.review4)}>
                        <Text style={{fontWeight: 'bold'}}>URL: </Text><Text>{itm.review4}</Text>
                        <WebView
                            source={{uri: itm.review4}}
                            style={{marginTop: 20, height: 200}}
                            startInLoadingState={true}
                        />
                    </TouchableOpacity>
                </View>
                }
                {itm.review5.length > 0 &&
                <View style={{
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(0,0,0,0.2)',
                    paddingBottom: 20,
                    paddingTop: 20
                }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.handleClick(itm.review5)}>
                        <Text style={{fontWeight: 'bold'}}>URL: </Text><Text>{itm.review5}</Text>
                        <WebView
                            source={{uri: itm.review5}}
                            style={{marginTop: 20, height: 200}}
                            startInLoadingState={true}
                        />
                    </TouchableOpacity>
                </View>
                }
            </ScrollView>
        );
    }
};


