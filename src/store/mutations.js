export const changeLogin = (state,payload) =>{
    state.isLogin = !state.isLogin
    // console.log('荷载' + payload)
    // console.log(payload)
    state.nowLoginUserID = payload.loginMsg.userID
    state.nowLoginUsername = payload.loginMsg.username
    state.nowLoginName = payload.loginMsg.name
    state.userinfo = payload.loginMsg.userinfo
}

export const refreshUserinfo = (state,payload) =>{
    state.userinfo = payload.loginMsg.userinfo    
}

export const editPush = (state,payload) =>{
    state.drafts = payload.drafts
}