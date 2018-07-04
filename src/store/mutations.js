import { stat } from "fs";

export const changeLogin = (state,payload) =>{
    state.isLogin = !state.isLogin
    console.log('荷载' , payload)
    // console.log(payload)
    state.nowLoginUserID = payload.loginMsg._id
    state.nowLoginUsername = payload.loginMsg.username
    state.nowLoginName = payload.loginMsg.name
    state.userinfo = payload.loginMsg
}

export const refreshUserinfo = (state,payload) =>{
    state.userinfo = payload.loginMsg.userinfo    
}

export const editPush = (state,payload) =>{
    state.drafts = payload.drafts
}

// 设置groupID
export const setGroupID = (state,payload) =>{
    state.groupID = payload.ID
}

export const logOut = (state,payload)=>{
    state.isLogin = false
    // console.log('荷载' + payload)
    // console.log(payload)
    state.nowLoginUserID = ''
    state.nowLoginUsername = ''
    state.nowLoginName = ''
    state.userinfo = ''
}