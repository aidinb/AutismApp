import React, {Component} from 'react';
import {View, Platform, Image, Dimensions,Text,TouchableOpacity} from 'react-native';
import UI from '../assets/UI';
import LinearGradient from 'react-native-linear-gradient';

let {height, width} = Dimensions.get('window');

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {height: 100, width: 100}
    }

    render() {
        return (

            <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress} style={[{
                justifyContent: 'center',
                alignItems: 'center',
                padding:10,
                width:this.props.width,backgroundColor:UI.COLORS_HEX.reviewBack},this.props.style]}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: 'rgba(186,33,123,0.5)',
                    shadowOffset: {width: 0, height: 8},
                    shadowOpacity: 0.7,
                    borderRadius: this.props.borderRadius?this.props.borderRadius:4,
                    elevation: 5,
                    position: "absolute",
                    right: 15,
                    left: 15,
                    bottom: 10,
                    top:10
                }}/>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: 'rgba(186,33,123,0.5)',
                    shadowOffset: {width: 0, height: -8},
                    shadowOpacity: 0.7,
                    borderRadius: this.props.borderRadius?this.props.borderRadius:4,
                    elevation: 5,
                    position: "absolute",
                    right: 15,
                    left: 15,
                    bottom: 10,
                    top:10
                }}/>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: 'rgba(186,33,123,0.5)',
                    shadowOffset: {width: 8, height: 0},
                    shadowOpacity: 0.7,
                    elevation: 5,
                    borderRadius: this.props.borderRadius?this.props.borderRadius:4,
                    position: "absolute",
                    right: 15,
                    left: 15,
                    bottom: 10,
                    top:10
                }}/>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: 'rgba(186,33,123,0.5)',
                    shadowOffset: {width: -8, height: 0},
                    shadowOpacity: 0.7,
                    elevation: 5,
                    borderRadius: this.props.borderRadius?this.props.borderRadius:4,
                    position: "absolute",
                    right: 15,
                    left: 15,
                    bottom: 10,
                    top:10

                }}/>
                <View style={{
                    width: this.props.width-30,
                    height: this.props.height?this.props.height:50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: this.props.borderRadius?this.props.borderRadius:5,
                }}>

                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        locations={[0, 0.5, 1.0]}
                        colors={['#FF2EA9', '#BA217B', '#A41167']}
                        style={{
                            position: "absolute",
                            right: 0,
                            left: 0,
                            bottom: 0,
                            elevation: 4,
                            borderRadius: this.props.borderRadius?this.props.borderRadius:5,
                            top:0
                        }}/>
                    <Text style={{
                        fontSize: this.props.fontSize?this.props.fontSize:16,
                        color: UI.COLORS_HEX.default,
                        backgroundColor: 'transparent'
                    }}>{this.props.title}</Text>
                </View>

            </TouchableOpacity>

        );
    }


}

