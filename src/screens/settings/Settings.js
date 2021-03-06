import React from 'react';
import {View, StyleSheet, SectionList} from 'react-native';

import {ListItem, Divider, SearchBar} from 'react-native-elements';
import listStyle from '../../styles/list';
import colors from '../../styles/colors';
import screenStyle from '../../styles/screen';

const ORANGE = '#FF9500';
const BLUE = '#007AFF';
const GREEN = '#4CD964';
const RED = '#FF3B30';
const GREY = '#8E8E93';
const PURPLE = '#5856D6';
const TEAL_BLUE = '#5AC8FA';

const sections = [
    {
        data: [
            {
                title: 'Airplane Mode',
                icon: 'ios-plane',
                backgroundColor: ORANGE,
                hideChevron: true,
                checkbox: true,
            },
            {
                title: 'Wi-Fi',
                backgroundColor: BLUE,
                icon: 'ios-wifi',
            },
            {
                title: 'Bluetooth',
                backgroundColor: BLUE,
                icon: 'ios-bluetooth',
                rightTitle: 'Off',
            },
            {
                title: 'Cellular',
                backgroundColor: GREEN,
                icon: 'ios-phone-portrait',
            },
            {
                title: 'Personal Hotspot',
                backgroundColor: GREEN,
                icon: 'ios-radio-outline',
                rightTitle: 'Off',
            },
        ],
    },
    {
        data: [
            {
                title: 'Notifications',
                icon: 'ios-notifications',
                backgroundColor: RED,
            },
            {
                title: 'Control Center',
                backgroundColor: GREY,
                icon: 'ios-switch',
            },
            {
                title: 'Do Not Disturb',
                backgroundColor: PURPLE,
                icon: 'ios-moon',
            },
        ],
    },
    {
        data: [
            {
                title: 'General',
                icon: 'ios-settings',
                backgroundColor: GREY,
            },
            {
                title: 'Display & Brightness',
                backgroundColor: BLUE,
                icon: 'ios-bulb',
            },
            {
                title: 'Wallpaper',
                backgroundColor: TEAL_BLUE,
                icon: 'ios-color-wand',
            },
            {
                title: 'Sounds',
                backgroundColor: RED,
                icon: 'ios-volume-up',
            },
            {
                title: 'Touch ID & Code',
                backgroundColor: RED,
                icon: 'ios-finger-print',
            },
            {
                title: 'Emergency Call',
                backgroundColor: ORANGE,
                icon: 'ios-medical',
            },
            {
                title: 'Battery',
                backgroundColor: GREEN,
                icon: 'ios-battery-full',
            },
            {
                title: 'Confidentiality',
                backgroundColor: GREY,
                icon: 'ios-hand',
            },
        ],
    },
    // Space at the bottom
    {data: []},
];

export default class Settings extends React.PureComponent {
    renderItem = ({
        item: {
            title,
            backgroundColor,
            icon,
            rightTitle,
            hideChevron,
            checkbox,
        },
    }) => (
        <ListItem
            containerStyle={{ paddingVertical: 8,backgroundColor:colors.purple}}//purple4
            titleStyle={{color:colors.grey4 }}
            switch={checkbox && { value: true }}
            onPress={() => this.onAbout()}
            key={title}
            chevron={!hideChevron}
            rightTitle={rightTitle}
            leftIcon={{
        type: 'ionicon',
        name: icon,
        size: 20,
        color: 'white',
        containerStyle: {
          backgroundColor,
          width: 28,
          height: 28,
          borderRadius: 6,
        },
      }}
            title={title}
        />
    );

    renderSectionHeader = () => <View style={[listStyle.headerSection,{backgroundColor:colors.purple}]}/>;//{backgroundColor:colors.purple4}

    ItemSeparatorComponent = () => (
        <View style={listStyle.separatorComponent}>
            <Divider style={listStyle.separator}/>
        </View>
    );

    keyExtractor = (item, index) => index

    onAbout = () => {
        this.props.navigation.push('About');
    };
    render() {
        //backgroundColor:'#7C7482'
        return (
            <View style={screenStyle.screenBgPurple}>
                <SectionList
                    keyExtractor={this.keyExtractor}
                    contentContainerStyle={[listStyle.listBgColor,{backgroundColor:colors.purple}]}//#7C7482
                    sections={sections}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                    SectionSeparatorComponent={Divider}
                    stickySectionHeadersEnabled={false}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFF4',
    },
    separatorComponent: {
        backgroundColor: 'white',
    },
    separator: {
        marginLeft: 58,
    },
    headerSection: {
        height: 30,
    },
});
