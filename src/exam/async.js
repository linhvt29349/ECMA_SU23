function addCDN(callBack) {
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js";
    script.onload = function () {
        console.log("Load ok");
        callBack()
    }
    script.onerror = function () {
        console.log("Load lỗi");

    }
    document.head.append(script);
}
addCDN(function () {
    console.log(_.max([4, 2, 8, 6]));
})

// Async
function sett(callBack) {

    setTimeout(function () {
        console.log();
    })
}
setTimeout(function () {
    console.log(1);
});

setTimeout(function () {
    console.log(2);
}, 1000);

console.log(3);