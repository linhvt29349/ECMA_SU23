//Promise chain
const cv1 = new Promise((resolve, rejected) => {
    setTimeout(() => {
        resolve('CV1');
    }, 1000)
})
const cv2 = new Promise((resolve, rejected) => {
    setTimeout(() => {
        resolve('CV2');
    }, 5000)
})
const cv3 = new Promise((resolve, rejected) => {
    setTimeout(() => {
        resolve('CV3');
    }, 100)
})
cv1.then((data) => {
    console.log(data);
    return cv2;
})
    .then((data) => {
        console.log(data);
        return cv3;
    })
    .then((data) => {
        console.log(data);
    })


//Promise
const cdnPromise = new Promise((resolve, rejected) => {
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js";
    script.onload = function () {
        resolve('Load ok')
    }
    script.onerror = function () {
        rejected('Load lỗi')
    }
    document.head.append(script);
})
cdnPromise.then((data) => {
    console.log(data);
})
    .catch((data) => {
        console.log(data);
    })


//Async/Await
async function call() {
    const data3 = await cdnPromise;
    console.log(data3);
}
call();