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
export default class Activities extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false,
            refreshing: false,
        }

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
        this.setState({isLoading: true});
        store.insert_user(DeviceInfo.getUniqueID()).then(() => {
            console.log('}}}}}}}')
            console.log(store.insertUser[0].id)
            store.get_activities(store.insertUser[0].id).then(() => {
                this.setState({isLoading: false})
                console.log(store.Activities)
            }).catch((e) => {
                console.log(e.response);
                this.setState({isLoading: false})
            })
        })
    }


    _renderItem = (itm) => {
        const {store, navigator} = this.props;
        return (
            <View style={{flex: 1, marginTop: 15}}>
                <View style={{
                    width: width - 20,
                    backgroundColor: itm.color,
                    borderRadius: 5,
                    shadowColor: UI.COLORS_HEX.darkgray,
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.7,
                }}>
                    <Image
                        style={{
                            width: width - 10,
                            height:  (width - 10)/2,
                            borderTopRightRadius:5,
                            borderTopLeftRadius:5,
                        }}
                        source={require('../assets/img/placeholder.gif')}
                        resizeMode={'cover'}
                    />

                    <View style={{ padding: 5,borderRadius:5}}>
                        <View style={{width: width - 40,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{
                                fontWeight: 'bold', fontSize: 15, backgroundColor: 'transparent', color: 'white'
                            }}>{itm.name}</Text>
                            <Text style={{fontWeight: 'bold',fontSize: 13, backgroundColor: 'transparent', color: 'white'
                            }}>{itm.date}</Text>
                        </View>
                        <Text style={{
                            fontSize: 14, fontWeight: 'bold', backgroundColor: 'transparent', color: 'white',marginLeft:5
                        }}>{itm.text}</Text>

                        </View>
                    <View style={{padding: 20, paddingTop: 0}}>

                    </View>

                </View>

            </View>

        )
    }
    refresh=()=>{
        const {store, navigator} = this.props;
this.setState({refreshing:true})
        store.insert_user(DeviceInfo.getUniqueID()).then(() => {
            console.log('}}}}}}}')
            console.log(store.insertUser[0].id)
            store.get_activities(store.insertUser[0].id).then(() => {
                console.log(store.Activities)
                this.setState({refreshing:false})

            }).catch((e) => {
                console.log(e.response);
                this.setState({refreshing:false})

            })
        })
    }
    _renderFooter = () => {
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
                <NavBar title={'Activities'}/>
                {store.Activities[0] != undefined ? <FlatList
                    data={store.Activities}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item, index) => 'item_' + item.Actid}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.refresh()}
                    ListFooterComponent={this._renderFooter}
                    ListEmptyComponent={<Spinner visible={true} textContent={"Loading"} textStyle={{color: '#FFF'}}/>}
                /> : <View/>}
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

