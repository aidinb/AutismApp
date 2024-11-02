/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
import {Bar} from 'react-native-pathjs-charts'
import SettingModal from '../component/SettingModal'
import ProfileModal from '../component/ProfileModal'
import NavBar from '../component/NavBar';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import LinearGradient from 'react-native-linear-gradient';

var {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Profile extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false,
            catData: [],
            profileAns: [],
            yes: 0,
            settingModalVisible: false,
            profileModalVisible: false,

        };
        this.setSettingModalVisible = this.setSettingModalVisible.bind(this);
        this.setProfileModalVisible = this.setProfileModalVisible.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        const {store, navigator} = this.props;
        switch (event.id) {
            case 'willAppear':
                this.setState({isLoading: true})
                store.get_profileAns(store.insertUser[0].id).then(()=> {
                    console.log('____get_profileAns___');
                    console.log(_.groupBy(store.ProfileAns, 'qCatId'));
                    store.ProfileAns.map(d => d.ans == 1 ? this.state.yes++ : null);
                    this.setState({isLoading: false, profileAns: store.ProfileAns})

                }).catch((e)=> {
                    console.log(e.response);
                    this.setState({isLoading: false})
                })

                store.get_questionCat().then(()=> {
                    console.log('____get_questionCat___');
                    console.log(store.QuestionCat);
                    console.log(store.ProfileAns)
                    let c = []
                    store.QuestionCat.map(d => {
                        if (store.ProfileAns.filter(m=>m.qCatId == d.category).length !== 0) {
                            console.log(d)
                            c.push(d)
                        }
                    })

                    this.setState({isLoading: false, catData: c})
                }).catch((e)=> {
                    console.log(e.response);
                    this.setState({isLoading: false})
                })
                store.AllQuestionsNo().then(()=> {
                    console.log('____AllQuestionNo___');
                    console.log(store.QuestionsNo);
                    this.setState({isLoading: false})
                }).catch((e)=> {
                    console.log(e.response);
                    this.setState({isLoading: false})
                })

                store.get_result(store.insertUser[0].id).then(()=> {
                    console.log('____resultNo___');
                    console.log(store.Result);
                    this.setState({isLoading: false})
                }).catch((e)=> {
                    console.log(e.response);
                    this.setState({isLoading: false})
                })
                store.question_list(store.insertUser[0].id)
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
        store.insert_user(DeviceInfo.getUniqueID()).then(()=> {
            store.get_profileAns(store.insertUser[0].id).then(() => {
                console.log('____get_profileAns___');
                console.log(_.groupBy(store.ProfileAns, 'qCatId'));
                store.ProfileAns.map(d => d.ans == 1 ? this.state.yes++ : null);
                this.setState({isLoading: false, profileAns: store.ProfileAns})

            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })

            store.get_questionCat().then(() => {
                console.log('____get_questionCat___');
                console.log(store.QuestionCat);
                console.log(store.ProfileAns)
                let c = []
                store.QuestionCat.map(d => {
                    if (store.ProfileAns.filter(m => m.qCatId == d.category).length !== 0) {
                        console.log(d)
                        c.push(d)
                    }
                })

                this.setState({isLoading: false, catData: c})
            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })


            store.AllQuestionsNo().then(() => {
                console.log('____AllQuestionNo___');
                console.log(store.QuestionsNo);
                this.setState({isLoading: false})
            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })

            store.get_result(store.insertUser[0].id).then(() => {
                console.log('____resultNo___');
                console.log(store.Result);
                this.setState({isLoading: false})
            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })
            store.question_list(store.insertUser[0].id)
        })
    }

    setSettingModalVisible(visible) {
        this.setState({settingModalVisible: visible});
    }

    setProfileModalVisible(visible) {
        this.setState({profileModalVisible: visible});
    }

    render() {
        const {store, navigator} = this.props;
        let options = {
            width: 300,
            height: 100,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2980B9',
            gutter: 30,
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E',
                    rotate: 45,
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                },
            }
        };
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.settingModalVisible}
                    onRequestClose={() => {
                        console.log('Modal Close');
                    }}
                >
                    <View style={{flex: 1}}>

                        <NavBar title={'Setting'}/>
                        <SettingModal/>
                        <TouchableOpacity style={{
                            width: 40,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 5,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor:'transparent'
                        }} onPress={() => {
                            this.setSettingModalVisible(false);
                        }}>
                            <Icon name="md-arrow-round-back" size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>

                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.profileModalVisible}
                    onRequestClose={() => {
                        console.log('Modal Close');
                    }}
                >
                    <View style={{flex: 1}}>
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
                        <Image
                            style={{
                                width: width,
                                height: height,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0,
                                opacity: 0.2

                            }}
                            source={require('../assets/img/gradient-texture-cubes.jpg')}
                            resizeMode={'cover'}
                        />
                        <NavBar title={'Profile'}/>
                        <ProfileModal/>
                        <TouchableOpacity style={{
                            width: 40,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 5,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            backgroundColor:'transparent'
                        }} onPress={() => {
                            this.setProfileModalVisible(false);
                        }}>
                            <Icon name="md-arrow-round-back" size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>

                </Modal>
                <View style={{
                    width: width,
                    height: 150,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.2)',
                    shadowColor: UI.COLORS_HEX.darkgray,
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.7,
                }}>
                    <Image
                        style={{
                            width: width,
                            height: 150,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            opacity: 0.8
                        }}
                        source={require('../assets/img/gradient-texture-cubes-copy.jpg')}
                        resizeMode={'cover'}
                    />
                    <View style={{width: width / 3 + 20, justifyContent: 'center', alignItems: 'center'}}>

                        <View style={{
                            width: 90,
                            height: 90,
                            borderRadius: 45,
                            shadowColor: 'rgba(0,0,0,0.6)',
                            shadowOffset: {width: 3, height: 3},
                            shadowOpacity: 0.7,

                        }}>
                            <Image
                                style={{
                                    width: 90,
                                    height: 90,
                                    borderWidth: 1,
                                    borderColor: 'rgba(0,0,0,0.2)',
                                    borderRadius: 45
                                }}
                                source={require('../assets/img/img1.png')}
                                resizeMode={'cover'}
                            />
                        </View>
                    </View>
                    <View style={{justifyContent: 'flex-start', height: 90, paddingTop: 15, width: width / 2 - 5}}>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 18, color: 'white',
                            textShadowOffset: {width: 1, height: 1},
                            textShadowColor: "#228C86",
                            textShadowRadius: 0.5
                        }}>Aidin Bazarchi</Text>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 13,
                            marginTop: 10
                        }}>{store.Questions.length} Questions Remains</Text>
                    </View>
                    <View style={{
                        justifyContent: 'space-around',
                        height: 150,
                        paddingTop: 35,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>this.setState({settingModalVisible: true})}
                                          style={{
                                              height: 55,
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              padding: 10
                                          }}>
                            <Icon name="ios-settings" size={30} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>this.setState({profileModalVisible: true})}
                                          style={{
                                              height: 50,
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              padding: 10
                                          }}>
                            <Icon name="ios-person" size={30} color={'white'}/>
                        </TouchableOpacity>

                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{width: width, padding: 20, paddingBottom: 10}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Your Answer {store.Result.length} Questions
                            From {store.QuestionsNo && store.QuestionsNo[0] && store.QuestionsNo[0].qNo}
                            Questions.</Text>
                        <Text>Categories Related To Each Qustions Are Listed Below:</Text>
                    </View>
                    <View>
                        {this.state.catData.map(d =>
                            <TouchableOpacity activeOpacity={0.6} onPress={()=> navigator.push({
                                screen: 'AppList',
                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                animationType: 'fade',
                                passProps: {itm: d}

                            })} key={d.category} style={{
                                width: width,
                                justifyContent: 'flex-start',
                                padding: 10,
                                alignItems: 'center',
                                height: 250,
                            }}>
                                <View style={{
                                    width: width - 30,
                                    backgroundColor: 'rgba(0,0,0,0.09)',
                                    flex: 1,
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: width - 30,
                                        backgroundColor: d.name == 'Art' ? '#1963C9' : d.name == 'Books' ? '#18AF23' : d.name == 'Behavior and Social Skills' ? '#C6542D' : d.name == 'Assessments' ? '#BE1F45' : 'rgba(98,188,182,0.8)',
                                        height: 40,
                                    }}>
                                        <Image
                                            style={{
                                                width: width - 30,
                                                height: 40,
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                left: 0,
                                                bottom: 0,
                                                opacity: 0.6
                                            }}
                                            source={require('../assets/img/gradient-texture-cubes-copy.jpg')}
                                            resizeMode={'cover'}
                                        />
                                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{d.name}</Text>
                                    </View>
                                    <View style={{paddingTop: 20}}>
                                        {this.state.profileAns.length > 0 ? <Bar data={[
                                            [{
                                                "v": this.state.profileAns.filter(m=>m.qCatId == d.category && m.ans == 1).length,
                                                "name": "YES"
                                            }, {
                                                "v": this.state.profileAns.filter(m=>m.qCatId == d.category && m.ans == 0).length,
                                                "name": "NO"
                                            },
                                                {
                                                    "v": this.state.profileAns.filter(m=>m.qCatId == d.category && m.ans == 2).length,
                                                    "name": "Sometimes"
                                                },
                                                {
                                                    "v": this.state.profileAns.filter(m=>m.qCatId == d.category).length,
                                                    "name": "No Of Q"
                                                }],

                                        ]} options={options} accessorKey='v'/> :
                                            <Text style={{padding: 10}}>No Result</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

