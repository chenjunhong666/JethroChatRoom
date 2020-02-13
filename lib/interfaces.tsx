export const MsgType = {
    SYSTEM :'SYSTEM',
    MY : 'MY',
    OTHER : 'OTHER'
}

export interface MessageInfo{
    msgType : string;
    msgContent : string;
    userName : string;
    date : string
}