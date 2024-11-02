import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    Dimensions,
    Image,
    WebView
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Video1 from 'react-native-video';

export default class Video extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false
        };
        // this.onLoad = this.onLoad.bind(this);

    }


    componentDidMount() {
        // this.setState({isLoading: true})
        // console.log('++++++++++++++++++++++')
        // console.log(this.props.navigation.state.params.url)
    }

    // onLoad() {
    //     this.setState({isLoading: false})
    //
    // }

    render() {
        return (

            <View style={{flex: 1, backgroundColor: '#edfafc'}}>
                <View style={{
                    width: width,
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: '#62BCB6',
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                }}>
                    <Text style={{
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'white',
                        textShadowOffset: {width: 1, height: 1},
                        textShadowColor: "#228C86",
                        textShadowRadius: 0.5
                    }}>Video</Text>
                </View>
                {/*<Video1*/}
                    {/*ref={(ref) => {*/}
                        {/*this.video = ref*/}
                    {/*}}*/}
                    {/*source={{uri: "https://www.youtube.com/watch?v=FhXrSfK0pHY"}}*/}
                    {/*style={{width: width, height: height}}*/}
                    {/*paused={false}*/}
                    {/*repeat={false}*/}
                    {/*onLoad={this.onLoad}*/}
                    {/*resizeMode="cover"*/}
                {/*/>*/}
                <WebView
                    source={{uri: this.props.url}}
                    style={{marginTop: 20, height: 200}}
                    startInLoadingState={true}
                />
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
                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

            </View>


        )
    }

};
const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    },
    btnText: {
        color: "#FFFFFF",
        fontFamily: "RobotoCondensed-Regular",
        fontSize: 22,
        shadowColor: "black",
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.9,
        backgroundColor: "transparent"
    }
});
