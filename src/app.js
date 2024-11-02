import {Linking, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {iconsMap, iconsLoaded} from './assets/appicons';

import {registerScreens, appStore} from './Screens';

import UI from './assets/UI';
registerScreens();

iconsLoaded.then(() => {

    startTabBasedApplication();

});


const createTabs = () => {
    return [
        {
            label: 'Home',
            screen: 'Home',
            selectedIcon: iconsMap['md-home'],
            icon: iconsMap['md-home'],
            title: 'Home',
            navigatorStyle: {...UI.NAVIGATION_STYLE, drawUnderTabBar: false,navBarHidden: true},

            navigatorButtons: {}
        },
        {
            label: 'Assessment',
            screen: 'Questions',
            selectedIcon: iconsMap['md-paper'],
            icon: iconsMap['md-paper'],
            title: 'Questions',
            navigatorStyle: {...UI.NAVIGATION_STYLE, drawUnderTabBar: false, navBarHidden: true},
            navigatorButtons: {}

        },
        {
            label: 'Activities',
            screen: 'Activities',
            selectedIcon: iconsMap['list-ul'],
            icon: iconsMap['list-ul'],
            title: 'Activities',
            navigatorStyle: {...UI.NAVIGATION_STYLE, drawUnderTabBar: false, navBarHidden: true},
            navigatorButtons: {}

        },
        {
            label: 'Share',
            screen: 'Chat',
            icon: iconsMap['ios-people'],
            selectedIcon: iconsMap['ios-people'],
            title: 'Chat',
            navigatorStyle: {...UI.NAVIGATION_STYLE, drawUnderTabBar: false, navBarHidden: true},

            navigatorButtons: {}
        },

        {
            label: 'Profile',
            screen: 'Profile',
            selectedIcon: iconsMap['md-person'],
            icon: iconsMap['md-person'],
            title: 'Profile',
            navigatorStyle: {...UI.NAVIGATION_STYLE, drawUnderTabBar: false, navBarHidden: true},
            navigatorButtons: {}
        },
    ];
};

function startTabBasedApplication() {
    Navigation.startTabBasedApp({
        tabs: createTabs(),
        tabsStyle: {
            initialTabIndex: 0,
            tabBarBackgroundColor: 'white',
            tabBarButtonColor: UI.COLORS_HEX.gray,
            tabBarSelectedButtonColor: '#026374',
            shadowColor: 'rgba(197,43,44,0.7)',
            shadowOffset: {width: -2, height: -2},
            shadowOpacity: 0.7,
            tabBarTextFontSize: 12,

        },

        appStyle: {
            orientation: 'portrait',
            bottomTabBadgeTextColor: UI.COLORS_HEX.negative,
            bottomTabBadgeBackgroundColor: UI.COLORS_HEX.cream,
            backButtonImage: iconsMap['md-arrow-back'],
            hideBackButtonTitle: true,
            tabBarBackgroundColor: 'white',
            tabBarButtonColor: UI.COLORS_HEX.gray,
            tabBarSelectedButtonColor: '#026374',
            forceTitlesDisplay: true,
            tabFontSize: 12,

        },

        // drawer: {
        //     left: {
        //         screen: 'DrawerView'
        //     },
        //     style: {
        //         drawerShadow: true, // optional, add this if you want a side menu drawer shadow
        //         contentOverlayColor: 'rgba(0,0,0,0.3)', // optional, add this if you want a overlay color when drawer is open
        //         leftDrawerWidth: 70, // optional, add this if you want a define left drawer width (50=percent)
        //         shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
        //     },
        //     type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
        //     animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
        //     // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
        //     disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
        //
        // }
    });
}

export {startTabBasedApplication}