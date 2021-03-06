import React, {Component} from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    Platform,
    ScrollView,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {Overlay, ListItem, Icon} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../styles/colors';
import sortableListStyle from '../styles/sortableList';


export default class SortablePlayList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            musicListVisible: false,
            musicList: this.props.musicData,
            // currentIndex: 0,
            activeIndex: 0
        };
    }

    deleteListItem = () => {
        var musicData = Object.values(this.state.musicList);
        var deleteIndex = this.state.deleteIndex;

        const foundIndex = Object.values(this.state.musicList).findIndex(function (item, index) {
            return index === deleteIndex;
        });

        musicData.splice(foundIndex, 1);
        this.setState({musicList: musicData});
    }

    showMusicPlayer = (data, index) => {
        this.setState({activeIndex: parseInt(index)})
        var musicData = [];
        musicData.push(data);
        this.props.navigate.push("MusicPlayer", {audio: musicData});//audioArray
    }

    _renderRow = ({data, active, index}) => {
        // const navigate = this.props.navigate;
        const {navigate} = this.props;
        let isCurrentIndex = (index === this.state.activeIndex) ? true : false;
        return <Row data={data} index={index} active={active} isCurrentIndex={isCurrentIndex} navigate={navigate}
                    dropMenu={this.onHandleDropMenu}/>
    }

    onHandleDropMenu = (value, deleteIndex) => {

        this.setState({musicListVisible: value, deleteIndex: deleteIndex});
    }

    componentWillReceiveProps(nextProps) {
        const {musicData} = nextProps;
        this.setState({musicList: musicData})
    }

    render() {
        const {musicList, musicListVisible} = this.state;
        const {type} = this.props;
        console.log('type is', type);
        return (
            <View style={sortableListStyle.container}>

                <SortableList
                    style={sortableListStyle.list}
                    contentContainerStyle={sortableListStyle.contentContainer}
                    data={musicList}
                    onPressRow={(key)=>{this.showMusicPlayer(musicList[key],key)}}
                    renderRow={this._renderRow}/>
                <Overlay
                    overlayBackgroundColor='rgba(255, 255, 255, .9)'
                    overlayStyle={{flex: 1,zIndex:99, position: 'absolute', bottom: 250, width: '100%', right: 0, height: 360}}
                    isVisible={this.state.musicListVisible}
                    borderRadius={0}
                    onBackdropPress={() => this.setState({musicListVisible: false})}
                >
                    <View style={{flex: 1,}}>
                        <View style={[sortableListStyle.navBarWrapper]}>
                            <Ionicons
                                name='ios-close'
                                color='gray'
                                size={30}
                                onPress={() => this.setState({musicListVisible: false})}
                            />
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={sortableListStyle.title}>{`Play List`}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1,  flexDirection: 'column'}}>
                            <ListItem
                                leftIcon={{name: 'ios-musical-note',type: 'ionicon',color: colors.purple3}}
                                title={`Next`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                            />
                            <ListItem
                                leftIcon={{name: 'ios-download-outline',type: 'ionicon',color: colors.purple3}}
                                title={`Download`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                            />
                            <ListItem
                                leftIcon={{name: 'ios-share-outline',type: 'ionicon',color: colors.purple3}}
                                title={`Share`}
                                titleStyle={{color: colors.purple3,}}
                                containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                bottomDivider
                            />
                            {type != 'playlist' ? <ListItem
                                    leftIcon={{name: 'ios-remove-circle-outline',type: 'ionicon',color: colors.purple3}}
                                    title={`Delete`}
                                    titleStyle={{color: colors.purple3,}}
                                    containerStyle={{backgroundColor:'transparent',paddingVertical: 10, marginVertical: 4,}}
                                    bottomDivider
                                    onPress={this.deleteListItem}
                                /> : null}

                        </View>


                    </View>
                </Overlay>

            </View>
        );
    }

}

class Row extends Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);
        this.state = {
            musicItem: this.props.data,
            musicItemIndex: this.props.index,
            isCurrentIndex: false,
        }

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps isCurrentIndex is ', nextProps.isCurrentIndex);
        this.setState({musicItem: nextProps.data, isCurrentIndex: nextProps.isCurrentIndex})//musicItemIndex: nextProps.index
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }


    showDropDownMenu = (index) => (e) => {
        console.log('index pass to menu', index);
        this.props.dropMenu(true, index);
    }


    renderListCards() {
        return list2.map((l, i) => (
            <ListItem
                leftIcon={{
            name: 'ios-musical-note',
                type: 'ionicon',
                color: colors.grey4
        }
    }

                leftAvatar={{size: 'medium', source: {uri: l.avatar_url}}}
                rightIcon={{
            name: 'ios-lock-outline',
                type: 'ionicon',
                color: colors.grey4
        }}
                key={i}
                title={l.name}
                titleStyle={{color: colors.grey4,}}
                containerStyle={{
                    backgroundColor:'transparent',
                    paddingVertical: 10,
                    marginVertical: 4,
        }}
                bottomDivider
            />
        ))
    }

    render() {
        const {musicItem, musicItemIndex, isCurrentIndex} = this.state;

        return (
            <Animated.View style={[
                sortableListStyle.row,
                this._style,
            ]}>
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf:'flex-start'}}
                    style={{width:30}}
                    name='ios-musical-note'
                    type='ionicon'
                    color={isCurrentIndex ? colors.green : colors.grey4}
                />
                <Image source={{uri: musicItem.imageDownloadUrl}} style={sortableListStyle.image}/>
                <View style={{flex:1,flexGrow:3}}>
                    <Text style={sortableListStyle.text}>{musicItem.audioType}-{musicItem.name}</Text>
                </View>
                <Icon
                    containerStyle={{flex: 1,}}
                    iconStyle={{alignSelf:'flex-end'}}
                    color={colors.grey4}
                    name='more-vert'
                    onPress={this.showDropDownMenu(musicItemIndex)}/>
            </Animated.View>
        );
    }
}
