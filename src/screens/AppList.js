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
import NavBar from '../component/NavBar'
import AppModel from '../component/AppModel';
import UI from '../assets/UI';

@inject("store") @observer

export default class AppList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // if you want to listen on navigator events, set this up

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        const {store, navigator} = this.props;
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
        store.app_list(this.props.itm.name).then(()=> {
            console.log('App list')
            console.log(store.AppList)
            this.setState({isLoading: false})
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })

    }
    _renderItem = (itm) => {
        const {store, navigator} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={()=> navigator.push({
                screen: 'AppDet',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',
                passProps: {itm: itm}

            })}>
                <AppModel itm={itm}/>
            </TouchableOpacity>
        )
    }

    render() {
        const {store, navigator} = this.props;

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#EEEEEE',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
               <NavBar title={this.props.itm.name}/>

                <FlatList
                data={store.AppList}
                renderItem={({item})=>this._renderItem(item)}
                keyExtractor={(item, index) => 'item'+item.itunes_id}
                ListEmptyComponent={<Spinner visible={true} textContent={"Loading"} textStyle={{color: '#FFF'}}/>}
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


        );
    }
};


