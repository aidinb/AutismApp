import React, {Component} from 'react';
import {View, Platform,Image,Dimensions,Text} from 'react-native';
import UI from '../assets/UI'
var {height, width} = Dimensions.get('window');

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                width: this.props.width?this.props.width:width,
                height: this.props.height?this.props.height:60,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: UI.COLORS_HEX.transparent,
                shadowColor: UI.COLORS_HEX.darkgray,
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.7,
            }}>
                <Image
                    style={{
                        width: this.props.width?this.props.width:width,
                        height: this.props.height?this.props.height:60,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        opacity:0.8
                    }}
                    source={require('../assets/img/gradient-texture-cubes-copy.jpg')}
                    resizeMode={'cover'}
                />
                <Text style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                    color: 'white',
                    maxWidth:220
                }} numberOfLines={1}>{this.props.title}</Text>
            </View>

        );
    }


}

