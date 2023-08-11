export const updateOnLength = (
    target:EventTarget & HTMLInputElement,
    updateFunc:(arg0:string)=>void,
    alertFunc:(arg0:boolean)=>void
    ):void => {
    if (target.value.length < 30) {
        updateFunc(target.value);
    } else {
        updateFunc(target.value.slice(0,30));
        alertFunc(true);
        setTimeout(() => alertFunc(false), 3000)
    }
}