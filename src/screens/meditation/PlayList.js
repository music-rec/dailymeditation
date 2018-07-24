import React, {Component} from 'react';
import {observer} from 'mobx-react';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    Icon,
} from 'react-native-elements';
import Player from '../../components/Player';
import playlistData from '../../config/playlist.json';

import PlayerStore from '../../stores/Player';

import playerListStyle from '../../styles/playerList';
@observer
export default class PlayList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            ]
        });
    }

    togglePlayback = async() => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack == null) {
            TrackPlayer.reset();
            await TrackPlayer.add(playlistData);
            TrackPlayer.play();
        } else {
            if (PlayerStore.playbackState === TrackPlayer.STATE_PAUSED) {
                TrackPlayer.play();
            } else {
                TrackPlayer.pause();
            }
        }
    }

    skipToNext = async() => {
        try {
            await TrackPlayer.skipToNext()
        } catch (_) {
            TrackPlayer.reset();
        }
    }

    skipToPrevious = async() => {
        try {
            await TrackPlayer.skipToPrevious()
        } catch (_) {
        }
    }
    seekTo = async(value) => {
        // await TrackPlayer.add(...)
        // await TrackPlayer.skip(...)
        console.log('seek to value ', value)
        TrackPlayer.seekTo(value)
    }


    goBack = () => {
        const {navigation} = this.props;
        navigation.goBack();
    }

    render() {
        return (
            <View style={playerListStyle.container}>
                <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 20,
                        marginTop: 30,
                    }}>
                    <Icon
                        name='close'
                        size={28}
                        onPress={this.goBack}
                    />

                </View>
                <View style={playerListStyle.playerContainer}>
                    <Text style={playerListStyle.description}>
                     7 Days of Calm Meditation
                    </Text>
                    <Player
                        style={playerListStyle.player}
                        onNext={() => this.skipToNext()}
                        onPrevious={() => this.skipToPrevious()}
                        onTogglePlayback={() => this.togglePlayback()}
                        onSeekTo={this.seekTo}
                    />
                    <Text style={playerListStyle.state}>{PlayerStore.playbackState}</Text>
                </View>

            </View>
        );
    }
}
