import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image'
import UI from '../assets/UI';
import {inject, observer} from 'mobx-react/native';
import AButton from '../component/AButton';
import LinearGradient from 'react-native-linear-gradient';

@inject("store") @observer
export default class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            answer: [],
            questionNo: 0,
            question: '',
            counter: 0,
            res: [],
            ramainQ: []
        };
        // if you want to listen on navigator events, set this up
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.answers = this.answers.bind(this);
        this.result = this.result.bind(this);
        this.deleteUserAns = this.deleteUserAns.bind(this);
    }


    componentDidMount() {
        const {store, navigator} = this.props;
        this.setState({isLoading: true});

        store.insert_user(DeviceInfo.getUniqueID()).then(()=>{
            console.log('}}}}}}}')
            console.log(store.insertUser[0].id)
            store.question_list(store.insertUser[0].id).then(() => {
                console.log('(((((((((((((((((')
                console.log(store.Questions)
                if (store.Questions.length > 0) {
                    this.setState({isLoading: false})

                    this.setState({q: store.Questions, isLoading: false, questionNo: store.Questions.length})
                } else {
                    this.setState({isLoading: false})

                    navigator.push({
                        screen: 'Result',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                    })
                }
            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })

        })

    }


    result() {
        const {store, navigator} = this.props;
        this.setState({isLoading: true});
        console.log(this.state.answer)
        store.insert_finalRes(store.insertUser[0].id).then(() => {
            console.log('(((((((((((((((((')
            console.log(store.finalRes)
            this.setState({isLoading: false})
            navigator.push({
                screen: 'Result',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',
                passProps: {res: store.finalRes}

            })
        }).catch((e) => {
            console.log(e);
            this.setState({isLoading: false})
        })

    }

    next() {
        if (this.state.counter < this.state.questionNo - 1) {
            this.setState({counter: this.state.counter + 1})
        } else {
            console.log(this.state.answer);
            Alert.alert(
                'Done !',
                'You answer all question successfully, for the result press show result.',
                [
                    {text: 'Show Result', onPress: this.result, style: 'cancel'},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ]
            )
        }
    }

    prev(id) {
        const {store, navigator} = this.props;

        if (this.state.counter != 0) {
            this.setState({counter: this.state.counter - 1})
            store.delete_singleAns(id, store.insertUser[0].id).then(() => {
                console.log('(((((((((((((((((')
                console.log(store.DeleteSingleAns)
                this.setState({isLoading: false})
            }).catch((e) => {
                console.log(e);
                this.setState({isLoading: false})
            })
        } else {
            console.log(this.state.answer)
            store.delete_singleAns(id, store.insertUser[0].id).then(() => {
                console.log('(((((((((((((((((')
                console.log(store.DeleteSingleAns)
                this.setState({isLoading: false})
            }).catch((e) => {
                console.log(e);
                this.setState({isLoading: false})
            })
            alert('First Question')
        }
    }

    answers(ans) {
        const {store, navigator} = this.props;
console.log(ans)
        this.setState({isLoading: true});
        this.next()
        store.insert_res([{
            qid: this.state.q[this.state.counter].id,
            ans: ans,
            weight: this.state.q[this.state.counter].weight,
            deviceId: store.insertUser[0].id,
            qCatId: this.state.q[this.state.counter].category,
        }]).then(() => {
            console.log('(((((((((((((((((')
            console.log(store.InsertRes)
            this.setState({isLoading: false})
        }).catch((e) => {
            console.log(e);
            this.setState({isLoading: false})
        })

        this.setState({isLoading: false});

    }

    deleteUserAns() {
        const {store, navigator} = this.props;
        this.setState({isLoading: true});
        store.delete_userAns(store.insertUser[0].id).then(() => {
            console.log('_____delete___')
            console.log(store.DeleteUserAns)
            this.setState({isLoading: true});
            store.get_result(store.insertUser[0].id).then(() => {
                console.log('______res____')
                console.log(store.Result)
                this.setState({isLoading: false})
            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })

            this.setState({isLoading: true});
            store.question_list().then(() => {
                console.log('(((((((((((((((((')
                console.log(store.Questions)
                this.setState({q: store.Questions, isLoading: false, questionNo: store.Questions.length})
            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })

        }).catch((e) => {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    render() {
        const {store, navigator} = this.props;

        return (
            <View style={styles.container}>
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    locations={[0, 0.5, 1.0]}
                    colors={['#026374', '#006A7A', '#268F8F']}
                    style={{
                        position: "absolute",
                        right: 0,
                        left: 0,
                        bottom: 0,
                        elevation: 4,
                        top: 0,
                    }}/>
                <View style={{
                    width: width,
                    justifyContent: 'center',
                    marginTop: 20,
                    padding: 10,
                    flexDirection: 'row',

                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 16,
                        backgroundColor: 'transparent'
                    }}>Question {this.state.counter + 1} from {this.state.questionNo}</Text>
                </View>


                <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: width, padding: 20}}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontSize: 15,
                            backgroundColor: 'transparent'

                            }}>{this.state.q && this.state.counter < this.state.questionNo && this.state.q[this.state.counter].text}
                        </Text>
                    </View>
                    {this.state.q &&this.state.q[this.state.counter].image.length>0 &&
                    <FastImage
                        source={{uri: this.state.q && this.state.counter < this.state.questionNo && 'http://yuu.ir/aidin/img/' + this.state.q[this.state.counter].image}}
                        style={{backgroundColor:'white',marginTop: 10, width: width, height: width * 2 / 3}}
                        resizeMode={'cover'}
                        onProgress={e => console.log(e.nativeEvent.loaded / e.nativeEvent.total)}

                    />}

                    <View style={{
                        width: width,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        paddingTop: 40
                    }}>
                        <View style={{
                            width: width,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                            shadowColor: UI.COLORS_HEX.darkgray,
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: 0.7,
                        }}>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.answers(0)} style={{
                                width: 120,
                                borderRadius: 20,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,

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
                                <Text style={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'transparent',
                                    color: 'white'
                                }}>Not at
                                    All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.answers(1)} style={{
                                width: 120,
                                borderRadius: 20,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,

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
                                <Text style={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'transparent',
                                    color: 'white'
                                }}>Just a
                                    Little</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            width: width,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                            shadowColor: UI.COLORS_HEX.darkgray,
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: 0.7,
                            paddingTop: 20,

                        }}>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.answers(2)} style={{
                                width: 120,
                                borderRadius: 20,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,

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
                                <Text style={{fontWeight: 'bold', backgroundColor: 'transparent', color: 'white'}}>Quite
                                    a Bit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.answers(3)} style={{
                                width: 120,
                                borderRadius: 20,
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,

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
                                <Text style={{fontWeight: 'bold', backgroundColor: 'transparent', color: 'white'}}>Very
                                    Much</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>
                <TouchableOpacity activeOpacity={0.6}
                                  onPress={() => this.prev(this.state.q && this.state.counter < this.state.questionNo && this.state.q[this.state.counter].id)}
                                  style={{
                                      width: 40,
                                      borderRadius: 20,
                                      backgroundColor: 'rgba(255,255,255,1)',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      padding: 7,
                                      shadowColor: UI.COLORS_HEX.darkgray,
                                      shadowOffset: {width: 1, height: 1},
                                      shadowOpacity: 0.7,
                                      position: 'absolute',
                                      top: 20,
                                      left: 10,
                                      height: 40
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
                            borderRadius: 40,

                        }}/>
                    <Icon name="ios-arrow-back" size={30} color={'white'} style={{backgroundColor: 'transparent'}}/>
                </TouchableOpacity>
                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#62BCB6',
    },

});

