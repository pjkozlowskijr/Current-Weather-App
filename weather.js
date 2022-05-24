const apiKey = '413980f3ad1d139d1f0b0a34652b15b3'

// Call required functions

buttonEventListener()

// API call

async function weatherAPI(location){
    const re = /^\d/
    if (re.test(location)){
        result = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${apiKey}&units=imperial`)
        }else{
            result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
        }
    console.log(result)
    const data = await result.json()

    let city = document.getElementsByTagName('h2')[0]
    city.innerText = data.name

    let weather = document.getElementsByTagName('h3')[0]
    weather.innerText = data.weather[0].description

    let img = document.getElementsByTagName('img')[0]
    img.alt = `Icon for ${data.weather[0].description}.`
    img.style = ''
    const atmos = /^7/
    switch(data.weather[0].main){
        case 'Thunderstorm':
            img.src = 'https://www.mercurynews.com/wp-content/uploads/2020/08/SJM-L-LIGHTNING-0817-11.jpg'
            break;
        case 'Drizzle':
            img.src = 'https://i.tribune.com.pk/media/images/698341-deadlyrain-1398055116/698341-deadlyrain-1398055116.jpg'
            break;
        case 'Rain':
            if (data.weather[0].description == 'freezing rain'){
                img.src = 'https://www.preferredmutual.com/images/default-source/default-album/gettyimages-467209717.tmb-article.jpg?sfvrsn=ac59137e_1'
            }else{
                img.src = 'https://blog.ambient-mixer.com/wp-content/uploads/2014/05/rain.jpg'
            }
            break;
        case 'Snow':
            img.src = 'https://www.sciencenewsforstudents.org/wp-content/uploads/2021/02/1030_LL_snow.jpg'
            break;
        case atmos.test(data.weather[0].main):
            img.src = 'https://www.peacearchnews.com/wp-content/uploads/2022/01/27915471_web1_220127-VMS-fog-advisory-1_1.jpg'
            break;
        case 'Clear':
            img.src = 'https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__480.jpg'
            break;
        case 'Clouds':
            if (data.weather[0].id == '801'){
                img.src = 'https://media.istockphoto.com/photos/few-little-fluffy-white-clouds-in-blue-sky-picture-id492866927?k=20&m=492866927&s=612x612&w=0&h=ArSvEGCADC0v7HCeGG0XGV9yl2edCrFLkaE9a9_cIHc='
            }else if(data.weather[0].id == '802'){
                img.src = 'https://media.istockphoto.com/photos/cirrocumulus-clouds-cloudscape-picture-id645173476?b=1&k=20&m=645173476&s=170667a&w=0&h=0wdytj1LA3mA1Jzp0j6_rgip60BxH9e5BAAE_vFlJQE='
            }else if(data.weather[0].id == '803'){
                img.src = 'https://4pyz335b69-flywheel.netdna-ssl.com/wp-content/uploads/2007/07/partlycloudy.jpg'
            }else{
                img.src = 'https://media.istockphoto.com/photos/storm-sky-rain-picture-id512218646?k=20&m=512218646&s=612x612&w=0&h=C-2Gn8nsMG-o7QNiXYPqu4FeJJFABhPpe4rTG0CIMWQ='
            }
    }

    let current = document.getElementById('current')
    current.innerText = Math.round(data.main.temp) + '\u00B0'
    
    let feels = document.getElementById('feels')
    feels.innerText = Math.round(data.main.feels_like) + '\u00B0'
    
    let high = document.getElementById('high')
    high.innerText = Math.round(data.main.temp_max) + '\u00B0'
    
    let low = document.getElementById('low')
    low.innerText = Math.round(data.main.temp_min) + '\u00B0'

    let directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    let direction = directions[Math.round(parseInt(data.wind.deg)/45) % 8];
    let wind = document.getElementById('wind')
    wind.innerText = Math.round(data.wind.speed)+' mph'+' '+direction
    
    let humidity = document.getElementById('humidity')
    humidity.innerText = data.main.humidity + '%'

    let pressure = document.getElementById('pressure')
    pressure.innerText = Math.round(parseInt(data.main.pressure)/33.863886666667*10)/10 + ' in'

    let visibility = document.getElementById('vis')
    visibility.innerText = Math.round(parseInt(data.visibility)/1000/1.609*10)/10 + ' mi'
}

// Handle submit function

function handleSubmit(event){
    event.stopPropagation();
    event.preventDefault();
    weatherAPI(document.getElementsByName('location')[0].value);
}

// Add event listener to submit button

function buttonEventListener(){
    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', (event) => handleSubmit(event));
}