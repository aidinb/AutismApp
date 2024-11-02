import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Picker,
    FlatList,
    Alert,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width} = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import Question from '../component/Question';
// import ModalPicker from 'react-native-modal-picker'
import DeviceInfo from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import LinearGradient from 'react-native-linear-gradient';
import NavBar from '../component/NavBar';

@inject("store") @observer
export default class Chat extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            ModalVisible: false,
            QModalVisible: false,
            categories: [],
            cat: 7,
            content: '',
            opt: [],
            share: [],
            refreshing: false,
            isLoading: false,
            catColor:UI.COLORS_HEX.negative
        }
        this.setModalVisible = this.setModalVisible.bind(this);
        this.addShare = this.addShare.bind(this);
        this.refresh = this.refresh.bind(this);
        this.likeShare = this.likeShare.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        const {store, navigator, item} = this.props;
        switch (event.id) {
            case 'willAppear':
                navigator.toggleTabs({
                    to: 'shown',
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

        this.setState({isLoading: true, content: ''});
        store.get_category().then(()=> {
            this.setState({isLoading: false})
            console.log(store.Category)
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })

        this.setState({isLoading: true});
        store.get_share().then(()=> {
            this.setState({isLoading: false})
            console.log('shares')
            console.log(store.Shares)
            console.log('===')
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })

    }

    setModalVisible(visible) {
        this.setState({ModalVisible: visible});
    }


    addShare() {
        const {store, navigator} = this.props;
        this.state.opt.push({
            cat: this.state.cat,
            content: this.state.content,
            deviceId: store.insertUser[0].id,
        })
        store.insert_share(this.state.opt).then(()=> {
            Alert.alert(
                'Done !',
                'Your Experience Or Question Successfully Inserted.',
                [
                    {
                        text: 'OK', onPress: ()=> {
                        this.setState({
                            opt: []
                        });
                        store.get_share().then(()=> {
                            this.setState({isLoading: false, refreshing: false})
                            console.log(store.Shares)

                        }).catch((e)=> {
                            console.log(e.response);
                        });
                        this.setState({ModalVisible: false})
                    }, style: 'cancel'
                    },
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ]
            )
        }).catch((e)=> {
            console.log(e);
            this.setState({isLoading: false})
        })
    }

    _renderItem = (itm) => {
        const {store, navigator} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.6} style={{flex: 1, marginTop: 15}}
                              onPress={()=>navigator.push({
                                  screen: 'Answers',
                                  navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true,},
                                  animationType: 'fade',
                                  passProps: {itm: itm, color:itm.color}

                              })}>


                <View style={{
                    width: width - 20,
                    paddingTop: 15,
                    backgroundColor: itm.color,
                    borderRadius: 5,
                    shadowColor: UI.COLORS_HEX.darkgray,
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.7,
                }}>

                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
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
                        <View style={{flexDirection: 'column', justifyContent: 'space-around', paddingBottom: 10}}>
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
                <TouchableOpacity onPress={()=>this.likeShare(itm.id)} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    backgroundColor: 'white',
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    borderColor: UI.COLORS_HEX.darkgray,
                    borderWidth: 0.5
                }}>
                    <Icon name="md-heart" size={25} color={'#C52B2C'}/>

                </TouchableOpacity>
            </TouchableOpacity>

        )
    }
    _renderFooter = ()=> {
        if (!this.state.isLoading) return null;
        return (
            <View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>
            </View>
        );
    }


    likeShare(id) {
        const {store, navigator} = this.props;
        this.setState({isLoading: true})

        store.add_likes(id).then(()=> {
            console.log(store.ShareAnsCount)
            store.get_share().then(()=> {
                this.setState({isLoading: false})
                console.log(store.Shares)
            }).catch((e)=> {
                console.log(e.response);
                this.setState({isLoading: false})
            });
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    refresh() {
        const {store, navigator} = this.props;

        this.setState({refreshing: true});
        store.get_share().then(()=> {
            this.setState({refreshing: false})
            console.log(store.Shares)

        }).catch((e)=> {
            console.log(e.response);
            this.setState({refreshing: false})
        })

    }

    render() {
        const {store, navigator} = this.props;

        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.ModalVisible}
                    onRequestClose={() => {
                        console.log('Modal Close');
                    }}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <NavBar title={'Share Your Experience'}/>

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
                                Choose a category and share either you question or your experience:
                            </Text>
                        </View>
                        <View style={{
                            width: width, justifyContent: 'center', alignItems: 'center',

                        }}>
                            <View style={{width: width, height: 170}}>
                                <Picker
                                    style={{height: 70,}}
                                    itemStyle={{marginTop: 0}}
                                    selectedValue={this.state.cat}
                                    onValueChange={(itemValue, itemIndex) => this.setState({cat: itemValue})}>
                                    {store.Category.map(d =>
                                        <Picker.Item key={d.id} label={d.name} value={d.id}/>
                                    )}
                                </Picker>
                            </View>

                        </View>
                        <View style={{
                            width: width,
                            backgroundColor: 'transparent',
                            shadowColor: UI.COLORS_HEX.darkgray,
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: 0.7,
                            height: height / 2,
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
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
                                    top: 0,
                                }}/>
                            <TextInput
                                style={{
                                    height: height / 2 - 40,
                                    padding: 10,
                                    backgroundColor: 'white',
                                    width: width - 40,
                                    borderRadius: 7,
                                    shadowColor: UI.COLORS_HEX.darkgray,
                                    shadowOffset: {width: 1, height: 1},
                                    shadowOpacity: 0.7,
                                }}
                                onChangeText={(text) => this.setState({content: text})}
                                value={this.state.content}
                                placeholder="Write an Experience or Question"
                                multiline={true}
                            />
                        </View>
                        <TouchableOpacity style={{
                            width: 40,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 10,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: 'transparent'
                        }} onPress={() => {
                            this.setModalVisible(false)
                        }}>
                            <Icon name="md-arrow-round-back" size={25} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 40,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 10,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: 'transparent'

                        }} onPress={() => {
                            this.addShare();
                        }}>
                            <Icon name="ios-send" size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>

                </Modal>

                <NavBar title={'Share Experience'}/>
                {store.Shares[0] != undefined ? <FlatList
                    data={store.Shares}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>this._renderItem(item)}
                    keyExtractor={(item, index) => 'item_' + item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={()=>this.refresh()}
                    ListFooterComponent={this._renderFooter}
                    ListEmptyComponent={<Spinner visible={true} textContent={"Loading"} textStyle={{color: '#FFF'}}/>}
                /> : <View/>}
                <TouchableOpacity style={{
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor:'transparent'
                }} onPress={() => {
                    this.setModalVisible(true);
                }}>
                    <Icon name="md-add-circle" size={25} color={'white'}/>
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
        backgroundColor: 'white',
    },

});

