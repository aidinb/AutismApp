import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image,
    Linking,

} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {Bar} from 'react-native-pathjs-charts';
import UI from '../assets/UI';

import {inject, observer} from 'mobx-react/native';
import DeviceInfo from 'react-native-device-info';
import NavBar from '../component/NavBar';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, cyclic} from '../../node_modules/react-native-pathjs-charts/src/util'

let colors = [];
@inject("store") @observer
export default class AppDet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            graphData: [],
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        // if you want to listen on navigator events, set this up
    }

    onNavigatorEvent(event) {
        const {store, navigator} = this.props;
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

    hexToRgb = (hex) => {
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        return {r: r, g: g, b: b};
    }

    componentDidMount() {
        const {store, navigator} = this.props;


        this.setState({isLoading: true});
        store.get_categories(store.insertUser[0].id).then(() => {

            let g = [];
            let q = [];
            store.Categories.map(d => {
                if (d.res != 0) {
                    g.push([{
                        res: d.res,
                        name: d.name.length > 10 ? d.name.substring(0, 10) + '...' : d.name,
                        color: d.color,
                        date:d.date,
                        Fid:d.finalId
                    }]);
                    q.push(d);
                    let a = this.hexToRgb(d.color.slice(1))
                    colors.push(a)
                }
            })
            this.setState({isLoading: false, graphData: q, gData: g})
        }).catch((e) => {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    deleteQuestions = () => {
        const {store, navigator} = this.props;
        this.setState({isLoading: true});
        store.delete_userAns(store.insertUser[0].id).then(() => {
            console.log('_____delete___')
            console.log(store.DeleteUserAns)
            this.setState({isLoading: false});

            navigator.push({
                screen: 'Questions',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',
                passProps: {deviceId: store.insertUser[0].id}

            })


        }).catch((e) => {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    render() {
        const {store, navigator} = this.props;
        let options = {
            width: width - 50,
            height: width - 80,
            margin: {
                top: 40,
                left: 35,
                bottom: 80,
                right: 30
            },
            color: '#36C7C7',
            gutter: 20,
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
                    fontSize: 9,
                    fontWeight: true,
                    fill: '#34495E',
                    rotate: 90,
                }
            },
            axisY: {
                showAxis: false,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 10,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }


        return (
            <View style={styles.container}>

                <NavBar title={'Result'}/>
                <ScrollView contentContainerStyle={{justifyContent: 'center', paddingBottom: 95}}>
                    <View style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
                        <Bar showColor={(a) => alert(a)} data={this.state.gData} options={options} accessorKey='res'
                             pallete={colors}/>
                    </View>
                    {this.state.graphData.map((d, idx) =>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => {
                            navigator.push({
                                screen: 'AppList',
                                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                animationType: 'fade',
                                passProps: {itm: d}

                            })
                        }} style={{
                            width: width,
                            justifyContent: 'flex-start',
                            padding: 10,
                            alignItems: 'center',
                            height: 170,

                        }} key={'graph' +idx}>

                            <View style={{
                                width: width - 30,
                                backgroundColor: d.color,
                                flex: 1,
                                borderRadius: 7,
                                shadowColor: UI.COLORS_HEX.darkgray,
                                shadowOffset: {width: 1, height: 1},
                                shadowOpacity: 0.7,
                            }}>

                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: width - 50,
                                    backgroundColor: 'transparent',
                                    borderRadius: 7,
                                    height: 40,
                                    borderBottomWidth: 1,
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    alignSelf: 'center'
                                }}>

                                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{d.name}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{
                                        width: 2 * width / 3 - 30,
                                        padding: 10,
                                        justifyContent: 'space-around',
                                        height: 110,
                                    }}>
                                        <Text style={{color: 'white'}}>Number Of Questions: <Text
                                            style={{fontWeight: 'bold', color: 'white'}}>{d.numberOfQ}</Text></Text>
                                        <Text style={{color: 'white'}}>Total Questions Rate: <Text
                                            style={{fontWeight: 'bold', color: 'white'}}>{d.sumOfQWeight}</Text></Text>
                                        <Text style={{color: 'white'}}>Category Rate: <Text
                                            style={{fontWeight: 'bold', color: 'white'}}>{d.weightOfCat}</Text></Text>
                                        <Text style={{color: 'white'}}>Final Rate: <Text
                                            style={{fontWeight: 'bold'}}>{d.res}</Text></Text>
                                    </View>
                                    <View style={{
                                        width: width / 3,
                                        height: 110,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        paddingBottom:10
                                    }}>
                                        <View style={{backgroundColor:UI.COLORS_HEX.lightgray,padding:5,borderRadius:12,height:24}}>
                                            <Text
                                                style={{fontWeight: 'bold', color: 'black'}}>{d.date}</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}

                    {this.state.graphData &&
                    <TouchableOpacity activeOpacity={0.6} onPress={this.deleteQuestions} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: width - 100,
                        height: 50,
                        backgroundColor: 'transparent',
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40,
                        alignSelf: 'center',
                        marginTop: 20,
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
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>Answer The Questions
                            Again</Text>
                    </TouchableOpacity>}
                </ScrollView>


                <TouchableOpacity activeOpacity={0.6} onPress={() => navigator.push({
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
                    bottom: 48,
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
                        colors={['#268F8F', '#006A7A', '#026374']}
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
                    <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>Check out suggestions</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity activeOpacity={0.6} onPress={()=>navigator.pop()} style={{*/}
                {/*justifyContent: 'center',*/}
                {/*alignItems: 'center',*/}
                {/*position: 'absolute',*/}
                {/*width: 60,*/}
                {/*height: 60,*/}
                {/*left: 0,*/}
                {/*top: 0,*/}
                {/*bottom: 0,*/}
                {/*right: 0,*/}
                {/*backgroundColor: 'transparent',*/}
                {/*marginTop: 7,*/}
                {/*}}>*/}
                {/*<Icon name="md-arrow-round-back" size={30} color={'white'}/>*/}
                {/*</TouchableOpacity>*/}
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
        backgroundColor: '#f4fcfc',
    },
});

