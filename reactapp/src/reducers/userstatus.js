export default function(userstatus = "", action) {
    if(action.type === 'addStatus') {
        console.log("ADD STATUS REDUCER", action.status)
        return  userstatus = action.status      
    } else {
        return userstatus;
    }
}