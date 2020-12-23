## Getting Started

Install Ionic CLI

``` bash
npm install -g @ionic/cli
```

Install Capacitor CLI

``` bash
npm install @capacitor/cli --save-dev
```

Please read [this documentation](https://capacitor.ionicframework.com/docs/getting-started/) to get more idea.

Clone this repository locally :

``` bash
git clone https://github.com/renemadsen/eformapp.git
```

Install dependencies with npm :

``` bash
npm install
```

## To build for development

In the terminal window

Run on web browser:

``` bash
ionic serve
```

Build for mobile platforms 

``` bash
npx cap add ios
or
npx cap add android
```

``` bash
ionic build
```

``` bash
npx cap open ios
or
npx cap open android
```

After updating code

``` bash
- Run this when you updated any cordova plugin
npx cap sync
```

``` bash
ionic build
npx cap copy
```

Please read [this](https://capacitor.ionicframework.com/docs/basics/opening-native-projects) for more details.

