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
    Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import UI from '../assets/UI';
import {inject, observer} from 'mobx-react/native';
import AppModel from '../component/AppModel';
import NavBar from '../component/NavBar';
import LinearGradient from 'react-native-linear-gradient';
import * as DeviceInfo from "react-native-device-info";

let p = [];
let q = [];

@inject("store") @observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            apps: [],
            refreshing: false,
            showLine: 'Art',
            isLoading: false,
            categories: [],
            catPositionX: [],
            catWidth: [],
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

    componentDidMount() {
        const {store, navigator} = this.props;

        store.insert_user(DeviceInfo.getUniqueID()).then(()=>{
            console.log(store.insertUser)

        })


        this.setState({isLoading: true});
        store.get_category().then(()=> {
            console.log(store.Category)
            this.setState({isLoading: false})
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }



    render() {
        const {store, navigator} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        width: width,
                        height: height,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        opacity: 0.6

                    }}
                    source={require('../assets/img/gradient-texture-cubes.jpg')}
                    resizeMode={'cover'}
                />
                <NavBar title={'Application List'}/>
                <FlatList
                    data={store.Category}
                    horizontal={false}
                    renderItem={({item})=><TouchableOpacity activeOpacity={0.6} style={{
                        height: 45,
                        backgroundColor: 'transparent',
                        justifyContent: 'space-between',
                        padding: 10,
                        width: width,
                        borderBottomWidth: 1,
                        borderColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center'

                    }} onPress={()=> navigator.push({
                        screen: 'AppList',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {itm: item}

                    })}>
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
                                opacity: 0.8
                            }}/>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>{item.name}</Text>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="ios-arrow-forward" size={15} color={'white'}/>
                            <Icon name="ios-arrow-forward" size={20} color={'white'}/>
                            <Icon name="ios-arrow-forward" size={25} color={'white'}/>

                        </View>
                    </TouchableOpacity>}
                    keyExtractor={(item, index) => 'cat_' + item.id}
                    ListEmptyComponent={<Spinner visible={true} textContent={"Loading"} textStyle={{color: '#FFF'}}/>}
                />


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

