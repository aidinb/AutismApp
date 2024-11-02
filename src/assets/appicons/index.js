
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UI from '../UI';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    "md-home": [26, UI.COLORS_HEX.white],
    "md-calendar": [26, UI.COLORS_HEX.white],
    "md-search": [26, UI.COLORS_HEX.white],
    "md-person": [26, UI.COLORS_HEX.white],
    "md-pin": [26, UI.COLORS_HEX.white],
    "ios-megaphone": [26, UI.COLORS_HEX.white],
    "ios-home": [26, UI.COLORS_HEX.white],
    "ios-home-outline": [26, UI.COLORS_HEX.white],
    "md-close": [26, UI.COLORS_HEX.white],
    "md-arrow-back": [26, UI.COLORS_HEX.white],
    "md-more": [26, UI.COLORS_HEX.white],
    "md-heart": [26, "#F4494D"],
    "md-heart-outline": [26, UI.COLORS_HEX.white],
    "ios-contact": [26, "#bbb"],
    "ios-contact-outline": [26, UI.COLORS_HEX.white],
    "ios-heart": [26, "#bbb"],
    "ios-heart-outline": [26, UI.COLORS_HEX.white],
    "md-exit": [26, UI.COLORS_HEX.white],
    "md-log-in": [26, UI.COLORS_HEX.white],
    "ios-trash": [26, UI.COLORS_HEX.white],
    "ios-create": [26, UI.COLORS_HEX.white],
    "md-add-circle": [26, UI.COLORS_HEX.white],
    "ios-grid": [26, UI.COLORS_HEX.white],
    "md-notifications": [26, UI.COLORS_HEX.white],

    "md-menu": [26, UI.COLORS_HEX.white],
    "md-grid": [60, UI.COLORS_HEX.white],
    "md-list": [26, UI.COLORS_HEX.white],
    "md-paper": [26, UI.COLORS_HEX.white],
    "ios-people": [26, UI.COLORS_HEX.white],
    "ios-basket": [26, "#bbb"],
    "ios-basket-outline": [26, UI.COLORS_HEX.white],
    "md-settings": [26, "#bbb"],
    "ios-arrow-back": [22, "#bbb"],
    "ios-arrow-back-outline": [22, UI.COLORS_HEX.white],
    // Use other Icon provider, see the logic at L39
    "film": [20, "#bbb", FontAwesome],
    "list-ul": [20, "#bbb", FontAwesome],
    "film--active": [20, UI.COLORS_HEX.white, FontAwesome],
    "language": [20, "#bbb", FontAwesome],

    "television": [22, "#bbb", FontAwesome],
    "television--active": [22, UI.COLORS_HEX.white, FontAwesome],
}

const defaultIconProvider = Ionicons;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1]
            )
        })
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

        // Call resolve (and we are done)
        resolve(true);
    })
});

export {
    iconsMap,
    iconsLoaded
};
