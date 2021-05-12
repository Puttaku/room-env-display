config = {
    'apiKey': "AIzaSyBSbcU6uznd3KVHxly5YqUC519dRaFK99I",
    'authDomain': "room-env-display.firebaseapp.com",
    'databaseURL': "https://room-env-display-default-rtdb.asia-southeast1.firebasedatabase.app",
    'projectId': "room-env-display",
    'storageBucket': "room-env-display.appspot.com",
    'messagingSenderId': "289271514931",
    'appId': "1:289271514931:web:2919312d6e9311ed296046",
    'measurementId': "G-M85TD25ZSW"
}
firebase.initializeApp(config)
let database = firebase.database()
const ref = database.ref("/")
const time = () => {
    var header = document.getElementById("greeting-msg")
    var clock = document.getElementById("clock")
    const time = new Date()
    var hdmsg = partOfDays(time.getHours())
    var msg = `${twoDigit(time.getHours()) + ":" + twoDigit(time.getMinutes()) + ":" + twoDigit(time.getSeconds())}`
    console.log(hdmsg, msg)
    header.innerHTML = hdmsg
    clock.innerHTML = msg
}

const dht = async() => {
    var temp = document.getElementById("temp")
    var humid = document.getElementById("humid")
    let temperature = 0
    let humidity = 0
    await ref.once("value", data => {
        temperature = data.val().temperature
        humidity = data.val().humidity
    })
    temp.innerHTML = temperature + "°C"
    humid.innerHTML = humidity + "%"
    if(temperature < 28){
        temp.style.background = "#00aaff"
    }
    else if(temperature < 30){
        temp.style.background = "#00ff99"
    }
    else if(temperature < 35){
        temp.style.background = "#ffe100"
    }
    else{
        temp.style.background = "#ff0f0f"
    }
    if(humidity < 20){
        humid.style.background = "#5c0000"
    }
    else if(humidity < 40){
        humid.style.background = "#ffa600"
    }
    else if(humidity < 60){
        humid.style.background = "#c3ff00"
    }
    else if(humidity < 80){
        humid.style.background = "#369400"
    }
    else{
        humid.style.background = "#59ff00"
    }
}

const twoDigit = (num) => num >= 10? num : `0${num}`
const range = (num, l, r) => num >= l && num <= r ? true : false
const partOfDays = (hour) => range(hour, 5, 11)? "Good morning" : range(hour, 12, 16)? "Good afternoon" : "Good evening"

setInterval(() => {
    time()
    dht()
}, 1000)