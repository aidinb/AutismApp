import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
    Image
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import {inject, observer} from 'mobx-react/native';
import Spinner from 'react-native-loading-spinner-overlay';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import UI from '../assets/UI';
import NavBar from '../component/NavBar'

@inject("store") @observer

export default class Answers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareAns: '',
            content: '',
            opt: [],
            refreshing: false,
            isLoading: false,
            answers: []


        }
        // if you want to listen on navigator events, set this up
        this.insertAnsLike = this.insertAnsLike.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        const {store, navigator, item} = this.props;
        switch (event.id) {
            case 'willAppear':
                navigator.toggleTabs({
                    to: 'hidden',
                    animated: false
                });
                break;
            case 'didAppear':
                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                break;
        }
    }

    componentDidMount() {
        const {store, navigator} = this.props;

        this.setState({isLoading: true});
        store.get_shareAns(this.props.itm.id).then(()=> {
            this.setState({isLoading: false})
            console.log('*******ans******')
            console.log(store.ShareAns)
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })

    }

    insertAnsLike(id) {
        const {store, navigator} = this.props;
        store.add_AnsLikes(id).then(()=> {
            console.log(store.AnsLikes)
            this.setState({isLoading: true});
            store.get_shareAns(this.props.itm.id).then(()=> {
                this.setState({isLoading: false})
                console.log('*******ans******')
                console.log(store.ShareAns)
            }).catch((e)=> {
                console.log(e.response);
                this.setState({isLoading: false})
            })
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    _AnsRenderItem = (itm) => {
        return (
            <View style={{
                width: width - 20,
                paddingTop: 15,
                borderColor: 'rgba(0,0,0,0.4)',
                borderWidth: 1,
                backgroundColor: '#edfcfa',
                borderRadius: 5,
                shadowColor: 'rgba(197,43,44,0.7)',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.7,
                marginTop: 10
            }}>
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    locations={[0, 0.5, 1.0]}
                    colors={[itm.color, itm.color, itm.color]}
                    style={{
                        position: "absolute",
                        right: 0,
                        left: 0,
                        bottom: 0,
                        elevation: 4,
                        top: 0,

                    }}/>
                <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'flex-start'}}>
                    <View style={{
                        width: width / 4 - 10,
                        padding: 10,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 0,
                    }}>
                        <FastImage
                            style={{
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                borderRadius: 25
                            }}
                            source={require('../assets/img/img1.png')}
                            resizeMode={'cover'}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        paddingBottom: 10,
                        alignItems: 'flex-start',
                        width: (width / 2) - 12
                    }}>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 15, color:'white'
                        }}>{itm.userName}</Text>
                        <Text style={{
                            fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 'bold'
                        }}>{itm.name}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>this.insertAnsLike(itm.id)} style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: 50,
                        paddingRight: 10,
                        alignItems: 'center',
                        position: 'absolute',
                        top: 0,
                        right: 6,
                        backgroundColor:'white',
                        height:30,
                        borderRadius:20,
                        shadowColor: UI.COLORS_HEX.darkgray,
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.7,
                    }}>
                        <Text style={{
                            fontSize: 13, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingRight: 5
                        }}>{itm.likes}</Text>
                        <Icon name="md-heart" size={23} color={'#C52B2C'}/>


                    </TouchableOpacity>
                </View>
                <View style={{padding: 20,paddingTop:0}}>
                    <Text style={{
                        fontSize: 14, fontWeight: 'bold', color: 'white',backgroundColor:'transparent'
                    }}>{itm.content}</Text>
                </View>

            </View>
        )
    }

    insertShareAns() {
        const {store, navigator} = this.props;

        this.state.opt.push({
            questionId: this.props.itm.id,
            cat: this.props.itm.catId,
            content: this.state.content,
            userId:store.insertUser[0].id,
        })

        store.insert_shareAns(this.state.opt).then(()=> {
            this.setState({isLoading: false, content: '', opt: []})
            Alert.alert(
                'Done !',
                'Your Answers Successfully Inserted. Waiting For Review.',
                [
                    {
                        text: 'OK', onPress: ()=> {
                        this.refreshAns();
                        this.setState({isLoading: true})
                        store.get_share().then(()=> {
                            this.setState({isLoading: false})
                            console.log(store.ShareAns)
                        }).catch((e)=> {
                            console.log(e.response);
                            this.setState({isLoading: false})
                        })
                    }, style: 'cancel'
                    },
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ]
            )
            console.log(store.ShareAnsRes);
        }).catch((e)=> {
            console.log(e);
            this.setState({isLoading: false})
        })
    }

    refreshAns() {
        const {store, navigator} = this.props;

        this.setState({isLoading: true});
        store.get_shareAns(this.props.itm.id).then(()=> {
            this.setState({isLoading: false, content: ''})
            console.log(store.ShareAns)

        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    render() {
        const itm = this.props.itm;
        const {store, navigator} = this.props;

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#EEEEEE',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#EEEEEE',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>

                    <NavBar title={'Answer and share experiences'}/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            width: width - 20,
                            paddingTop: 15,
                            backgroundColor: this.props.color,
                            borderRadius: 5,
                            shadowColor: UI.COLORS_HEX.darkgray,
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: 0.7,
                            marginTop: 10
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'transparent',

                            }}>
                                <View style={{
                                    width: width / 4 - 10,
                                    padding: 10,
                                    backgroundColor: 'transparent',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: 0
                                }}>
                                    <Image
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderWidth: 1,
                                            borderColor: 'rgba(0,0,0,0.2)',
                                            borderRadius: 25
                                        }}
                                        source={require('../assets/img/img1.png')}
                                        resizeMode={'cover'}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    paddingBottom: 10
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold', fontSize: 15, backgroundColor: 'transparent', color: 'white'
                                    }}>{itm.userName}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'rgba(255,255,255,0.8)',
                                        fontWeight: 'bold',
                                        backgroundColor: 'transparent'
                                    }}>{itm.name}</Text>
                                </View>
                            </View>
                            <View style={{padding: 20, paddingTop: 0}}>
                                <Text style={{
                                    fontSize: 14, fontWeight: 'bold', backgroundColor: 'transparent', color: 'white'
                                }}>{itm.content}</Text>
                            </View>
                            <View style={{width: width, padding: 20, flexDirection: 'row', paddingTop: 0}}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: 'rgba(255,255,255,0.8)',
                                    backgroundColor: 'transparent',
                                }}>{itm.ansCount} Answers</Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: 'rgba(255,255,255,0.8)',
                                    marginLeft: 20,
                                    backgroundColor: 'transparent'
                                }}>{itm.likes} Likes</Text>
                            </View>
                        </View>

                        {store.ShareAns.length > 0 &&
                        <FlatList
                            data={store.ShareAns}
                            renderItem={({item})=>this._AnsRenderItem(item)}
                            keyExtractor={(item, index) => 'item_' + item.id}
                            refreshing={this.state.refreshing}
                            onRefresh={()=>this.refresh()}
                            ListFooterComponent={this._renderFooter}
                            ListEmptyComponent={<Spinner visible={true} textContent={"Loading"}
                                                         textStyle={{color: '#FFF'}}/>}
                        />

                        }
                    </ScrollView>
                </View>
                <View style={{
                    width: width,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    height: 90,
                    borderTopColor: 'rgba(0,0,0,0.2)',
                    borderTopWidth: 1,
                    shadowColor: 'rgba(0,0,0,0.7)',
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.7,
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    alignItems: 'center'
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

                        }}/>
                    <TextInput
                        style={{
                            height: 70,
                            padding: 10,
                            backgroundColor: 'white',
                            width: width - 60,
                            borderRadius: 7,
                            shadowColor: 'rgba(0,0,0,0.7)',
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: 0.7,
                        }}
                        onChangeText={(text) => this.setState({content: text})}
                        value={this.state.content}
                        placeholder="Write an Answer"
                        multiline={true}
                    />
                    <TouchableOpacity onPress={()=>this.insertShareAns()} activeOpacity={0.6} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#026374',
                        marginLeft: 8, height: 40, width: 40, borderRadius: 20, shadowColor: 'rgba(0,0,0,0.7)',
                        shadowOffset: {width: 1, height: 1},
                        shadowOpacity: 0.7,
                    }}>
                        <Icon name="ios-send" size={30} color={'white'}/>
                    </TouchableOpacity>
                </View>
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


        );
    }
};


