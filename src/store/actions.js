export const changeLogin = ({commit},loginMsg) => {
    commit({
        type:'changeLogin',
        loginMsg
    })
}

export const refreshUserinfo = ({commit},loginMsg) =>{
    commit({
        type:'refreshUserinfo',
        loginMsg
    })
}

export const editPush = ({commit},drafts) =>{
    commit({
        type:'editPush',
        drafts
    })
}


// 设置groupID
export const setGroupID = ({commit},ID) =>{
    commit({
        type:'setGroupID',
        ID
    })
}