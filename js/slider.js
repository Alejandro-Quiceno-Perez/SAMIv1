const containerImg = document.querySelector("#containerImg");
const listImg = ["./img/amb1.jpg", "./img/amb2.jpg", "./img/amb3.jpg", "./img/amb4.jpg","./img/amb5.jpg","./img/amb6.jpg"];

setInterval(() => {
    printImg(nRandom(listImg.length))
}, 6000);

function nRandom(max) {
    const n = Math.floor(Math.random() * max);
    return parseInt(n);
}

function printImg(n) {
    containerImg.innerHTML = `
        <img src="${listImg[n]}" class="" alt="">
    `;
}

