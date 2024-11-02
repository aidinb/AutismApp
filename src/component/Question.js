import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    Alert,
    Image
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import Answer from '../screens/Answers';
import Spinner from 'react-native-loading-spinner-overlay';
import DeviceInfo from 'react-native-device-info';
import {inject, observer} from 'mobx-react/native';

@inject("store") @observer
export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalVisible: false,
            shareAns: '',
            content: '',
            opt: [],
            refreshing: false,
            isLoading: false,
            answers: []


        }
        this.setModalVisible = this.setModalVisible.bind(this);
        this.likeShare = this.likeShare.bind(this);

    }

    setModalVisible(visible) {
        this.setState({ModalVisible: visible});
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


    render() {
        const {store, navigator} = this.props;

        const itm = this.props.itm;
        return (
            <View style={{flex: 1}}>



            </View>
        );
    }
};


