import 'vuetify/styles'
import '@/sass/variables.sass'
import '@/sass/overrides.sass'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
const app = createApp(App);

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: myCustomLightTheme
    }
})

app.use(vuetify)
app.mount('#app')
