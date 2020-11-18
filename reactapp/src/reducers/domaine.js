export default function(domaine = '', action){
    if(action.type === 'addDomaine'){
        console.log("ADD TOKEN REDUCER", action.domaine)
        return action.domaine
    } else {
        return domaine
    }
}