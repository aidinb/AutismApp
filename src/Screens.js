import {Navigation} from 'react-native-navigation';
import { Provider } from 'mobx-react/native';
import AppState from './stores/AppState'
import AppDet from './screens/AppDet';
import Chat from './screens/Chat';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Questions from './screens/Questions';
import Result from './screens/Result';
import Suggestions from './screens/Suggestions';
import Video from './screens/Video';
import Answers from './screens/Answers';
import AppList from './screens/AppList';
import Activities from './screens/Activities';



const store=new AppState();
exports.appStore=store;

export function registerScreens() {

    Navigation.registerComponent('AppDet', () => AppDet, store, Provider);
    Navigation.registerComponent('Chat', () => Chat, store, Provider);
    Navigation.registerComponent('Home', () => Home, store, Provider);
    Navigation.registerComponent('Profile', () => Profile, store, Provider);
    Navigation.registerComponent('Questions', () => Questions, store, Provider);
    Navigation.registerComponent('Result', () => Result, store, Provider);
    Navigation.registerComponent('Suggestions', () => Suggestions, store, Provider);
    Navigation.registerComponent('Video', () => Video, store, Provider);
    Navigation.registerComponent('Answers', () => Answers, store, Provider);
    Navigation.registerComponent('AppList', () => AppList, store, Provider);
    Navigation.registerComponent('Activities', () => Activities, store, Provider);


}
