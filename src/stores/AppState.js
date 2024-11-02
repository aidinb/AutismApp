import {observable, action} from 'mobx';
import axios from 'react-native-axios'
import lstore from 'react-native-simple-store';
import {Dimensions} from "react-native";

let {height, width} = Dimensions.get('window');

axios.defaults.baseURL = 'http://yuu.ir/';
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
exports.site = "http://yuu.ir/";

exports.isLogin = false;

class AppState {

    @observable Questions;
    @observable InsertRes;
    @observable Categories;
    @observable Suggestion;
    @observable Category;
    @observable ShareRes;
    @observable Shares;
    @observable ShareAnsRes;
    @observable ShareAns;
    @observable ShareAnsCount;
    @observable AnsLikes;
    @observable QuestionCat;
    @observable ProfileAns;
    @observable Result;
    @observable AppList;
    @observable DeleteUserAns;
    @observable DeleteSingleAns;
    @observable finalRes;
    @observable QuestionsNo;
    @observable insertUser;
    @observable Activities;


    constructor() {
        this.Questions = [];
        this.InsertRes = [];
        this.Categories = [];
        this.Suggestion = [];
        this.Category = [];
        this.ShareRes = [];
        this.Shares = [];
        this.ShareAnsRes = [];
        this.ShareAns = [];
        this.ShareAnsCount = [];
        this.AnsLikes = [];
        this.QuestionCat = [];
        this.ProfileAns = [];
        this.Result = [];
        this.AppList = [];
        this.DeleteUserAns = [];
        this.DeleteSingleAns = [];
        this.finalRes = [];
        this.QuestionsNo = [];
        this.insertUser = [];
        this.Activities = [];
    }

    // @action setWebService(data) {
    //     this.WebService = data;
    // }

    async insert_user(deviceId) {
        let dvId = deviceId.replace(/-/g, ' ');
        console.log(dvId)
        let {data} = await axios.get('aidin/insertUsers.php/', {params: {deviceId: dvId}}).catch(e => {
            console.log(']]]e.response]]]]')
            console.log(e.response)
        });
        console.log('insert USer')
        console.log(data)

        this.insertUser = data;
        console.log(this.insertUser[0].id)
    }

    async app_list(name) {
        let {data} = await axios.get('aidin/AppList.php/', {params: {name: name}}).catch(e => {
            console.log(']]]e.response]]]]')
            console.log(e.response)
        });
        this.AppList = data;
    }

    async question_list(userId) {
        console.log('===userId===')
        console.log(userId)
        let {data} = await axios.get('aidin/Questions.php/?userId=' + userId)
        console.log('===questions===')
        console.log(data)
        this.Questions = data;
    }

    async insert_res(res) {
        console.log(res)
        let {data} = await axios.post('aidin/insertRes.php/', JSON.stringify({res: res})).catch(e => console.log(e));
        console.log(data)

        this.InsertRes = data;
    }

    async get_categories(deviceId) {
        let {data} = await axios.get('aidin/get_categories.php/', {params: {deviceId: deviceId}});
        this.Categories = data;
    }

    async get_suggestion(res) {
        let {data} = await axios.post('aidin/suggestion.php/', JSON.stringify({res: res})).catch(e => console.log(e.response));
        this.Suggestion = data;
    }

    async get_category() {
        let {data} = await axios.get('aidin/get_category.php/');
        this.Category = data;
    }

    async insert_share(res) {
        console.log('share params')
        console.log(res)
        let {data} = await axios.post('aidin/insertShare.php/', JSON.stringify({res: res})).catch(e => console.log(e.response));
        this.ShareRes = data;
    }

    async get_share() {
        let {data} = await axios.get('aidin/get_share.php/');
        this.Shares = data;
    }

    async insert_shareAns(res) {
        let {data} = await axios.post('aidin/insertShareAns.php/', JSON.stringify({res: res})).catch(e => console.log(e.response));
        this.ShareAnsRes = data;
    }

    async get_shareAns(qId) {
        let params = {qId: qId};
        let {data} = await axios.get('aidin/get_shareAns.php/', {params: params});
        this.ShareAns = data;
    }

    async get_shareAnsCount(qId) {
        let {data} = await axios.get('aidin/get_shareAnsCount.php/', {params: {qId: qId}});
        this.ShareAnsCount = data;
    }

    async add_likes(qId) {
        let params = {qId: qId};
        console.log(params)
        let {data} = await axios.get('aidin/insertLikes.php/', {params: params});
        console.log('-----likes----')
        console.log(data)
        this.ShareAnsCount = data;
    }

    async add_AnsLikes(aId) {
        let {data} = await axios.get('aidin/insertAnsLikes.php/', {params: {aId: aId}});
        this.AnsLikes = data;
    }

    async get_questionCat() {
        let {data} = await axios.get('aidin/get_questionCat.php/');
        this.QuestionCat = data;
    }

    async get_profileAns(deviceId) {
        let {data} = await axios.get('aidin/get_profileAns.php/', {params: {deviceId: deviceId}});
        this.ProfileAns = data;
    }

    async get_result(deviceId) {
        let {data} = await axios.get('aidin/get_result.php/', {params: {deviceId: deviceId}});
        this.Result = data;
    }

    async delete_userAns(deviceId) {
        let {data} = await axios.post('aidin/delete_userAns.php/', {deviceId: deviceId});
        this.DeleteUserAns = data;
    }

    async delete_singleAns(andId, devId) {
        let {data} = await axios.post('aidin/delete_singleAns.php/', {questId: andId, devId: devId});
        this.DeleteSingleAns = data;
    }

    async insert_finalRes(deviceId) {
        let {data} = await axios.get('aidin/insertFinalRes.php/', {params: {deviceId: deviceId}});
        this.finalRes = data;
    }

    async AllQuestionsNo(deviceId) {
        let {data} = await axios.get('aidin/AllQuestionNo.php/', {params: {deviceId: deviceId}});
        this.QuestionsNo = data;
    }

    async get_activities(userId) {
        console.log('userID')
        console.log(userId)
        let {data} = await axios.get('aidin/get_activities.php/', {params: {userId: userId}});
        console.log('get_activities')
        console.log(data)
        this.Activities = data;
    }
}

export default function createStore() {
    return new AppState()
}