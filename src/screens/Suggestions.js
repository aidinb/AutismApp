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
import AppModel from '../component/AppModel';
import UI from '../assets/UI';
import NavBar from '../component/NavBar'
import {inject, observer} from 'mobx-react/native';

@inject("store") @observer
export default class suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            isLoading: false
        };
    }

    componentDidMount() {
        const {store, navigator} = this.props;
        this.setState({isLoading: true});
        store.get_suggestion(this.props.res).then(()=> {
            console.log('____suggestion___');
            console.log(store.Suggestion);
            this.setState({isLoading: false})
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    _renderItem = (itm) => {
        const {store, navigator} = this.props;

        return (
            <TouchableOpacity activeOpacity={0.6} onPress={()=>navigator.push({
                screen: 'AppDet',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',
                passProps: {itm: itm}

            })}>
                <AppModel itm={itm}/>
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

    render() {
        const {store, navigator} = this.props;
        return (
            <View style={styles.container}>

                <NavBar title={'App Suggestion'}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={store.Suggestion}
                        renderItem={({item})=>this._renderItem(item)}
                        keyExtractor={(item, index) => 'item_' + item.id}
                        ListFooterComponent={this._renderFooter}
                    />
                </ScrollView>

                <TouchableOpacity activeOpacity={0.6} onPress={()=> navigator.push({
                    screen: 'Questions',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',

                })
                } style={{
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f4fcfc',
    },
});

