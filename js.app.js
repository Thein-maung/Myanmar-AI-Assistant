// Real Free APIs Configuration
const API_CONFIG = {
    weather: {
        url: 'https://api.openweathermap.org/data/2.5/weather',
        key: 'b1b15e88fa797225412429c1c50c122a1' // Free test API key
    },
    exchange: {
        url: 'https://api.exchangerate-api.com/v4/latest/USD'
    },
    joke: {
        url: 'https://official-joke-api.appspot.com/random_joke'
    },
    quote: {
        url: 'https://api.quotable.io/random'
    },
    news: {
        url: 'https://newsdata.io/api/1/news',
        key: 'pub_6ffc2d1e907241cf9253c3a8aa82f7e9' // Your news API key
    }
};

// Myanmar AI Chatbot - Real APIs Version
class AIAssistant {
    constructor() {
        this.services = {
            'weather': (input) => this.getRealWeather(input),
            'news': () => this.getRealNews(),
            'exchange': () => this.getRealExchangeRates(),
            'joke': () => this.getRealJoke(),
            'quote': () => this.getRealQuote(),
            'time': () => this.getTime(),
            'calc': (input) => this.calculate(input),
            'help': () => this.showHelp(),
            'info': () => this.showInfo()
        };

        this.myanmarCities = {
            'ရန်ကုန်': 'Yangon',
            'မန္တလေး': 'Mandalay', 
            'နေပြည်တော်': 'Naypyidaw',
            'ပဲခူး': 'Bago',
            'မော်လမြိုင်': 'Mawlamyine',
            'စစ်တွေ': 'Sittwe',
            'တောင်ကြီး': 'Taunggyi'
        };
    }

    understandCommand(input) {
        input = input.toLowerCase();
        
        if (input.includes('ရာသီဥတု') || input.includes('weather') || input.includes('မိုး')) {
            return 'weather';
        } else if (input.includes('သတင်း') || input.includes('news')) {
            return 'news';
        } else if (input.includes('ငွေလဲ') || input.includes('exchange') || input.includes('ဒေါ်လာ')) {
            return 'exchange';
        } else if (input.includes('ဟာသ') || input.includes('joke') || input.includes('ရီစရာ')) {
            return 'joke';
        } else if (input.includes('စကားစု') || input.includes('quote') || input.includes('အားတက်စရာ')) {
            return 'quote';
        } else if (input.includes('အချိန်') || input.includes('time')) {
            return 'time';
        } else if (input.includes('တွက်') || input.includes('calculate') || input.includes('+') || input.includes('-') || input.includes('*') || input.includes('/')) {
            return 'calc';
        } else if (input.includes('အကူ') || input.includes('help')) {
            return 'help';
        } else if (input.includes('အချက်') || input.includes('info')) {
            return 'info';
        } else {
            return 'unknown';
        }
    }

    async getRealWeather(input) {
        try {
            // Extract city from input
            let city = 'Yangon';
            for (const [mmCity, engCity] of Object.entries(this.myanmarCities)) {
                if (input.includes(mmCity) || input.includes(engCity.toLowerCase())) {
                    city = engCity;
                    break;
                }
            }

            console.log(`Fetching weather for: ${city}`);
            
            // Try OpenWeatherMap API
            const response = await fetch(
                `${API_CONFIG.weather.url}?q=${city}&appid=${API_CONFIG.weather.key}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('Weather API failed');
            }
            
            const data = await response.json();
            console.log('Weather data received:', data);
            
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            const humidity = data.main.humidity;
            const feelsLike = Math.round(data.main.feels_like);
            
            // Get Myanmar city name
            const mmCityName = Object.keys(this.myanmarCities).find(
                key => this.myanmarCities[key] === city
            ) || city;

            // Weather translations
            const weatherTranslations = {
                'clear sky': '☀️ ကောင်းကင်ပြင့်',
                'few clouds': '⛅ တိမ်အနည်းငယ်',
                'scattered clouds': '☁️ တိမ်များပြားနေ',
                'broken clouds': '☁️ တိမ်ထူထပ်နေ',
                'overcast clouds': '☁️ တိမ်ဖုံးနေ',
                'light rain': '🌦️ မိုးအနည်းငယ်',
                'moderate rain': '🌧️ မိုးအသင့်အတင့်',
                'heavy intensity rain': '⛈️ မိုးသည်းထန်စွာ',
                'thunderstorm': '⛈️ မိုးကြိုးပစ်နေ'
            };

            const mmDesc = weatherTranslations[desc] || `🌤️ ${desc}`;

            return `<strong>🌤️ ${mmCityName} မြို့ ရာသီဥတု</strong>
<div class="api-result">
အပူချိန်: <strong>${temp}°C</strong><br>
ခံစားရအပူချိန်: <strong>${feelsLike}°C</strong><br>
ရာသီဥတု: ${mmDesc}<br>
စိုထိုင်းဆ: ${humidity}%<br>
<small>OpenWeatherMap မှ လက်ရှိဒေတာ</small>
</div>`;

        } catch (error) {
            console.error('Weather API error:', error);
            return this.getFallbackWeather(input);
        }
    }

    getFallbackWeather(input) {
        let city = 'ရန်ကုန်';
        for (const mmCity of Object.keys(this.myanmarCities)) {
            if (input.includes(mmCity)) {
                city = mmCity;
                break;
            }
        }

        const weatherData = {
            'ရန်ကုန်': { temp: 32, desc: '⛅ တိမ်အနည်းငယ်', humidity: 75 },
            'မန္တလေး': { temp: 35, desc: '☀️ နေရောင်ခြည်', humidity: 60 },
            'နေပြည်တော်': { temp: 33, desc: '☁️ တိမ်ထူ', humidity: 70 },
            'ပဲခူး': { temp: 31, desc: '🌦️ မိုးအနည်းငယ်', humidity: 80 },
            'မော်လမြိုင်': { temp: 30, desc: '🌧️ မိုးရွာ', humidity: 85 }
        };

        const data = weatherData[city] || weatherData['ရန်ကုန်'];

        return `<strong>🌤️ ${city} မြို့ ရာသီဥတု</strong>
<div class="api-result">
အပူချိန်: <strong>${data.temp}°C</strong><br>
ရာသီဥတု: ${data.desc}<br>
စိုထိုင်းဆ: ${data.humidity}%<br>
<small>ခန့်မှန်းခြေဒေတာ (API ချိတ်ဆက်မှုပြဿနာ)</small>
</div>`;
    }

    async getRealNews() {
        try {
            console.log('Fetching news...');
            
            // Try NewsData.io API
            const response = await fetch(
                `${API_CONFIG.news.url}?apikey=${API_CONFIG.news.key}&country=mm&language=my&category=technology`
            );
            
            if (!response.ok) {
                throw new Error('News API failed');
            }
            
            const data = await response.json();
            console.log('News data received:', data);
            
            if (!data.results || data.results.length === 0) {
                return this.getFallbackNews();
            }
            
            let newsHTML = '<strong>📰 နောက်ဆုံးရ မြန်မာသတင်းများ</strong><div class="api-result">';
            
            data.results.slice(0, 5).forEach((article, index) => {
                const title = article.title || 'သတင်းခေါင်းစဉ်';
                newsHTML += `• ${title}<br>`;
            });
            
            newsHTML += '<small>NewsData.io မှ လက်ရှိသတင်းများ</small>';
            newsHTML += '</div>';
            
            return newsHTML;
            
        } catch (error) {
            console.error('News API error:', error);
            return this.getFallbackNews();
        }
    }

    getFallbackNews() {
        return `<strong>📰 နောက်ဆုံးရ သတင်းများ</strong>
<div class="api-result">
• မြန်မာနိုင်ငံတွင် ဒစ်ဂျစ်တယ်စီးပွားရေး ကြီးထွား<br>
• နည်းပညာတက္ကသိုလ်များ ဖွံ့ဖြိုးတိုးတက်<br>
• AI နည်းပညာ မြန်မာပြည်တွင် စတင်အသုံးပြုလာ<br>
• မြို့ပြဖွံ့ဖြိုးရေး စီမံကိန်းများ ဆက်လက်<br>
<small>ခန့်မှန်းခြေသတင်းများ</small>
</div>`;
    }

    async getRealExchangeRates() {
        try {
            console.log('Fetching exchange rates...');
            
            // Try ExchangeRate API
            const response = await fetch(API_CONFIG.exchange.url);
            
            if (!response.ok) {
                throw new Error('Exchange API failed');
            }
            
            const data = await response.json();
            console.log('Exchange data received:', data);
            
            const rates = data.rates;
            const mmk = rates.MMK ? rates.MMK.toFixed(2) : 'N/A';
            const eur = rates.EUR ? rates.EUR.toFixed(2) : 'N/A';
            const sgd = rates.SGD ? rates.SGD.toFixed(2) : 'N/A';
            const thb = rates.THB ? rates.THB.toFixed(2) : 'N/A';
            const jpy = rates.JPY ? rates.JPY.toFixed(2) : 'N/A';
            
            return `<strong>💱 လက်ရှိ ငွေလဲနှုန်းများ (USD 1 ဒေါ်လာအတွက်)</strong>
<div class="api-result">
မြန်မာကျပ်: <strong>${mmk} MMK</strong><br>
ယူရို: ${eur} EUR<br>
စင်္ကာပူဒေါ်လာ: ${sgd} SGD<br>
ထိုင်းဘတ်: ${thb} THB<br>
ဂျပန်ယန်း: ${jpy} JPY<br>
<small>ExchangeRate-API မှ လက်ရှိဒေတာ</small>
</div>`;

        } catch (error) {
            console.error('Exchange API error:', error);
            return this.getFallbackExchangeRates();
        }
    }

    getFallbackExchangeRates() {
        return `<strong>💱 ငွေလဲနှုန်းများ</strong>
<div class="api-result">
USD to MMK: <strong>2,100 ကျပ်</strong><br>
USD to EUR: 0.92 ယူရို<br>
USD to SGD: 1.35 ဒေါ်လာ<br>
USD to THB: 35.50 ဘတ်<br>
<small>ခန့်မှန်းခြေနှုန်းထား</small>
</div>`;
    }

    async getRealJoke() {
        try {
            console.log('Fetching joke...');
            
            // Try Joke API
            const response = await fetch(API_CONFIG.joke.url);
            
            if (!response.ok) {
                throw new Error('Joke API failed');
            }
            
            const joke = await response.json();
            console.log('Joke received:', joke);

            // Joke translations
            const jokeTranslations = {
                "Why did the chicken cross the road?": "ဘာကြောင့် ကြက်တွေက လမ်းကိုဖြတ်ကြတာလဲ?",
                "To get to the other side!": "အခြားဘက်ခြမ်းကိုရောက်ဖို့ပါ!",
                "Why was the math book sad?": "ဘာကြောင့် သင်္ချာစာအုပ်က ဝမ်းနည်းနေတာလဲ?",
                "Because it had too many problems.": "ဘာလို့လဲဆိုတော့ ပြဿနာတွေအများကြီးရှိနေလို့ပါ။"
            };

            const setup = jokeTranslations[joke.setup] || joke.setup;
            const punchline = jokeTranslations[joke.punchline] || joke.punchline;

            return `<strong>😄 ဟာသ</strong>
<div class="api-result">
"${setup}"<br><br>
<strong>${punchline}</strong><br>
<small>Official Joke API မှ</small>
</div>`;

        } catch (error) {
            console.error('Joke API error:', error);
            return this.getFallbackJoke();
        }
    }

    getFallbackJoke() {
        const jokes = [
            "ဘာကြောင့် ကွန်ပျူတာတွေက ဘာသာစကားအသစ်တွေ သင်ရတာ ကြောက်တာလဲ? \nဘာလို့လဲဆိုတော့... သူတို့မှာ ဘာဂါ(bug)တွေ ရှိနေလို့ပါ!",
            "ပရိုဂရမ်မာတစ်ယောက် ရေခဲသေတ္တာထဲမှာ ဘာကြောင့်ဝင်နေတာလဲ? \nဘာလို့လဲဆိုတော့... သူက console.log() လုပ်ချင်နေလို့ပါ!"
        ];

        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        const [setup, punchline] = joke.split('\n');

        return `<strong>😄 ဟာသ</strong>
<div class="api-result">
"${setup}"<br><br>
<strong>${punchline}</strong>
</div>`;
    }

    async getRealQuote() {
        try {
            console.log('Fetching quote...');
            
            // Try Quotable API
            const response = await fetch(API_CONFIG.quote.url);
            
            if (!response.ok) {
                throw new Error('Quote API failed');
            }
            
            const quote = await response.json();
            console.log('Quote received:', quote);

            // Quote translations
            const quoteTranslations = {
                "The way to get started is to quit talking and begin doing.": "စတင်ခြင်းရဲ့နည်းလမ်းက စကားပြောတာရပ်ပြီး လက်တွေ့လုပ်ဖို့ပါ",
                "The future belongs to those who believe in the beauty of their dreams.": "အနာဂတ်က သူတို့ရဲ့အိပ်မက်တွေရဲ့ အလှတရားကို ယုံကြည်သူတွေအတွက်ပါ",
                "It's during our darkest moments that we must focus to see the light.": "အမှောင်ဆုံးအချိန်တွေမှာပဲ အလင်းကိုမြင်နိုင်ဖို့ အာရုံစိုက်ဖို့လိုပါတယ်"
            };

            const myanmarQuote = quoteTranslations[quote.content] || quote.content;

            return `<strong>💫 စိတ်ဓာတ်တက်ကြွစေသော စကားစု</strong>
<div class="api-result">
"${myanmarQuote}"<br><br>
- <strong>${quote.author}</strong><br>
<small>Quotable API မှ</small>
</div>`;

        } catch (error) {
            console.error('Quote API error:', error);
            return this.getFallbackQuote();
        }
    }

    getFallbackQuote() {
        const quotes = [
            { text: "စတင်ခြင်းရဲ့နည်းလမ်းက စကားပြောတာရပ်ပြီး လက်တွေ့လုပ်ဖို့ပါ", author: "ဒေါ်လာ" },
            { text: "အနာဂတ်က သူတို့ရဲ့အိပ်မက်တွေရဲ့ အလှတရားကို ယုံကြည်သူတွေအတွက်ပါ", author: "အီလီနာ ရုစဗဲ့" }
        ];

        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        return `<strong>💫 စိတ်ဓာတ်တက်ကြွစေသော စကားစု</strong>
<div class="api-result">
"${quote.text}"<br><br>
- <strong>${quote.author}</strong>
</div>`;
    }

    getTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Yangon'
        };
        
        const myanmarTime = now.toLocaleDateString('my-MM', options);
        return `<strong>⏰ မြန်မာစံတော်ချိန်</strong><br>${myanmarTime}`;
    }

    calculate(input) {
        try {
            const expression = input.replace(/[^0-9+\-*/().]/g, '');
            if (expression) {
                const result = eval(expression);
                return `<strong>🧮 တွက်ချက်မှုရလဒ်</strong><br>${expression} = <strong>${result}</strong>`;
            }
            return "🧮 ကျေးဇူးပြု၍ တွက်ချက်မှုတစ်ခုပေးပါ (ဥပမာ: ၁၅×၃)";
        } catch (e) {
            return "🧮 ကျေးဇူးပြု၍ မှန်ကန်သော တွက်ချက်မှုပေးပါ";
        }
    }

    showHelp() {
        return `<strong>🤖 ကျွန်တော် ကူညီပေးနိုင်တာတွေ:</strong>
<div class="api-result">
🌤️ <strong>ရာသီဥတု</strong> - "ရန်ကုန်ရာသီဥတု", "မန္တလေးမိုး"<br>
📰 <strong>သတင်းများ</strong> - "သတင်းတွေပြောပါ", "နောက်ဆုံးရသတင်း"<br>
💱 <strong>ငွေလဲနှုန်း</strong> - "ဒေါ်လာကျပ် ငွေလဲနှုန်း"<br>
😄 <strong>ဟာသများ</strong> - "ဟာသတစ်ခုပြောပါ"<br>
💫 <strong>စကားစုများ</strong> - "စကားစုပြောပါ"<br>
⏰ <strong>လက်ရှိအချိန်</strong> - "အချိန်ဘယ်လောက်ရှိပြီလဲ"<br>
🧮 <strong>တွက်ချက်မှုများ</strong> - "၁၅×၃ တွက်ပေးပါ"<br>
<br>
<small>Real APIs များဖြင့် ချိတ်ဆက်ထားပါသည်</small>
</div>`;
    }

    showInfo() {
        return `<strong>ℹ️ အချက်အလက်များ</strong>
<div class="api-result">
<strong>မြန်မာစာ AI Chatbot</strong><br>
Version: 2.0.0<br>
Status: Real APIs Connected<br>
Features: Real Weather, News, Exchange Rates<br>
APIs Used: OpenWeatherMap, ExchangeRate, NewsData.io<br>
Language: Myanmar (Unicode)<br><br>
<small>Real-time data with fallback support</small>
</div>`;
    }

    async process(input) {
        const command = this.understandCommand(input);
        
        if (command in this.services) {
            // Add loading delay for real API feel
            await new Promise(resolve => setTimeout(resolve, 1000));
            return await this.services[command](input);
        } else {
            return this.showHelp();
        }
    }
}

// Chat Application
class ChatApp {
    constructor() {
        this.ai = new AIAssistant();
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick questions
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.askQuestion(question);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Clear chat
        document.getElementById('clearChat').addEventListener('click', () => this.clearChat());
        
        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => this.askQuestion('help'));
        
        // Info button
        document.getElementById('infoBtn').addEventListener('click', () => this.askQuestion('info'));
        
        this.setupPWA();
        this.loadTheme();
    }
    
    askQuestion(question) {
        this.userInput.value = question;
        this.sendMessage();
    }
    
    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.userInput.value = '';
        this.sendButton.disabled = true;
        
        this.showTyping();
        
        try {
            const response = await this.ai.process(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTyping();
            this.addMessage("<div class='error-message'>တောင်းပန်ပါတယ်၊ အမှားတစ်ခုဖြစ်သွားပါတယ်။</div>", 'bot');
        }
        
        this.sendButton.disabled = false;
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = text;
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.getCurrentTime();
        
        content.appendChild(bubble);
        content.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('my-MM', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    clearChat() {
        if (confirm('စကားပြောခွင်အားလုံးကို ရှင်းမှာသေချာပါသလား?')) {
            this.chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <div class="message-bubble">
                            <strong>မင်္ဂလာပါ! 👋</strong><br>
                            ကျွန်တော်က မြန်မာစာပါ AI Chatbot ပါ။ ရာသီဥတု၊ သတင်း၊ ငွေလဲနှုန်း၊ တွက်ချက်မှုတွေ ကူညီပေးနိုင်ပါတယ်။
                        </div>
                        <div class="message-time">ခုနက</div>
                    </div>
                </div>
            `;
        }
    }
    
    setupPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('Service Worker registered'))
                .catch(() => console.log('Service Worker registration failed'));
        }
        
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            const installPrompt = document.getElementById('installPrompt');
            
            setTimeout(() => {
                installPrompt.style.display = 'block';
            }, 5000);
            
            document.getElementById('installButton').onclick = () => {
                installPrompt.style.display = 'none';
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(() => deferredPrompt = null);
            };
            
            document.getElementById('cancelInstall').onclick = () => {
                installPrompt.style.display = 'none';
            };
        });
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
    console.log('🇲🇲 Myanmar AI Chatbot with Real APIs started successfully!');
});