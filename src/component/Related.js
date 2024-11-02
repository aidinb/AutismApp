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
    Linking,
    FlatList,
    ActivityIndicator
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';

@inject("store") @observer
export default class Related extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false,
            itm: this.props.itm,
            cat1:[],
            cat2:[],
            cat3:[],
            cat4:[],
            cat5:[],
        };

    }

    componentDidMount() {
        const {store, navigator} = this.props;
        if(this.props.itm.category1.length>0){
        this.setState({isLoading: true});
        store.app_list(this.props.itm.category1).then(()=> {
            console.log('&&&&&&&&&');
            console.log(this.props.itm.category2);
            this.setState({cat1: store.AppList, isLoading: false})
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

    if(this.props.itm.category2.length>0){
        this.setState({isLoading: true});
        store.app_list(this.props.itm.category2.replace(/\s/g, '')).then(()=> {

            this.setState({cat2: store.AppList, isLoading: false})
        }).catch((e)=> {
            console.log(e.response);
            this.setState({isLoading: false})
        })
    }

        if(this.props.itm.category3.length>0){
            this.setState({isLoading: true});
            console.log(this.props.itm.category3.replace(/\s/g, ''));
            store.app_list(this.props.itm.category3.replace(/\s/g, '')).then(()=> {

                this.setState({cat3: store.AppList, isLoading: false})
            }).catch((e)=> {
                console.log(e.response);
                this.setState({isLoading: false})
            })
        }

        if(this.props.itm.category4.length>0){
            this.setState({isLoading: true});
            store.app_list(this.props.itm.category4.replace(/\s/g, '')).then(()=> {
                this.setState({cat4: store.AppList, isLoading: false})
            }).catch((e)=> {
                console.log(e.response);
                this.setState({isLoading: false})
            })
        }
    }
    _renderItem = (itm) => {
        const {store, navigator} = this.props;

        return (
            <TouchableOpacity activeOpacity={0.6} onPress={()=>navigator.push({
                screen: 'AppDet',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',
                passProps: {itm: itm}

            })} style={{justifyContent: 'center', alignItems: 'center', marginRight: 20}}>
                <FastImage
                    style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        borderRadius: 12
                    }}
                    source={{uri: itm.itunes_imageLink}}
                    resizeMode={'cover'}
                />
                <Text style={{
                    width: 90,
                    fontWeight: 'bold',
                    fontSize: 11,
                    marginTop: 5
                }} numberOfLines={4}>{itm.itunes_title}</Text>
                <Text style={{width: 90, fontSize: 10}}>{itm.itunes_device}</Text>
            </TouchableOpacity>

        )
    }
    _renderFooter = ()=> {
        if (!this.state.isLoading) return null;
        return (
            <View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
                <ActivityIndicator animating size="large"/>
            </View>
        );
    }

    render() {
        let itm = this.props.itm;
        return (
            <ScrollView style={{
                flex: 1,
                padding: 15,
                paddingTop: 0,
                width: width,

            }} contentContainerStyle={{paddingBottom: 100}}>
                {itm.category1.length > 0 &&this.state.cat1!=0&& <View style={{borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 2}}>
                    <Text> Related To <Text style={{fontWeight: 'bold'}}>{itm.category1}</Text></Text>

                        <FlatList
                            data={this.state.cat1}
                            renderItem={({item})=>this._renderItem(item)}
                            keyExtractor={(item, index) => 'itemCat1_' + item.app_id}
                            ListFooterComponent={this._renderFooter}
                            horizontal={true}
                            style={{padding:20,paddingLeft:0}}
                        />
                </View>}
                {itm.category2.length > 0 &&this.state.cat2!=0&&
                <View style={{borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 2, paddingTop: 10}}>
                    <Text> Related To <Text style={{fontWeight: 'bold'}}>{itm.category2}</Text></Text>
                    <FlatList
                        data={this.state.cat2}
                        renderItem={({item})=>this._renderItem(item)}
                        keyExtractor={(item, index) => 'itemCat2_' + item.app_id}
                        ListFooterComponent={this._renderFooter}
                        horizontal={true}
                        style={{padding:20,paddingLeft:0}}
                    />
                </View>}
                {itm.category3.length > 0 &&this.state.cat3!=0&&
                <View style={{borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 2, paddingTop: 10}}>
                    <Text> Related To <Text style={{fontWeight: 'bold'}}>{itm.category3}</Text></Text>
                    <FlatList
                        data={this.state.cat3}
                        renderItem={({item})=>this._renderItem(item)}
                        keyExtractor={(item, index) => 'itemCat3_' + item.app_id}
                        ListFooterComponent={this._renderFooter}
                        horizontal={true}
                        style={{padding:20,paddingLeft:0}}
                    />
                </View>}
                {itm.category4.length > 0 &&this.state.cat4!=0&&
                <View style={{borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 2, paddingTop: 10}}>
                    <Text> Related To <Text style={{fontWeight: 'bold'}}>{itm.category4}</Text></Text>
                    <FlatList
                        data={this.state.cat4}
                        renderItem={({item})=>this._renderItem(item)}
                        keyExtractor={(item, index) => 'itemCat4_' + item.app_id}
                        ListFooterComponent={this._renderFooter}
                        horizontal={true}
                        style={{padding:20,paddingLeft:0}}
                    />
                </View>}

            </ScrollView>
        );
    }
};


