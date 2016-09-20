# react-native-smart-toast

[![npm](https://img.shields.io/npm/v/react-native-smart-toast.svg)](https://www.npmjs.com/package/react-native-smart-toast)
[![npm](https://img.shields.io/npm/dm/react-native-smart-toast.svg)](https://www.npmjs.com/package/react-native-smart-toast)
[![npm](https://img.shields.io/npm/dt/react-native-smart-toast.svg)](https://www.npmjs.com/package/react-native-smart-toast)
[![npm](https://img.shields.io/npm/l/react-native-smart-toast.svg)](https://github.com/react-native-component/react-native-smart-toast/blob/master/LICENSE)

A android like toast for react-native apps, written in JS for cross-platform support.
It works on iOS and Android.

This component is compatible with React Native 0.25 and newer.

## Preview

![react-native-smart-toast-preview-ios][1]
![react-native-smart-toast-preview-android][2]

## Installation

```
npm install react-native-smart-toast --save
```

## Full Demo

see [ReactNativeComponentDemos][0]

## Usage

Install the toast from npm with `npm install react-native-smart-toast --save`.
Then, require it from your app's JavaScript files with `import toast from 'react-native-smart-toast'`.

```js

import React, {
    Component,
} from 'react'
import {
    View,
} from 'react-native'

import Button from 'react-native-smart-button'
import TimerEnhance from 'react-native-smart-timer-enhance'
import Toast from 'react-native-smart-toast'

class ToastText extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={{ marginTop: 64, flex: 1, backgroundColor: '#fff',}}>
                <Button
                    onPress={this._showTopToast}
                    touchableType={Button.constants.touchableTypes.fadeContent}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    show top (顶部显示)
                </Button>

                <Button
                    onPress={this._showCenterToast}
                    touchableType={Button.constants.touchableTypes.highlight}
                    underlayColor={'#C90000'}
                    style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    show center (中心显示)
                </Button>

                <Button
                    onPress={this._showBottomToast}
                    touchableType={Button.constants.touchableTypes.blur}
                    style={{margin: 10, justifyContent: 'center', height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17,  color: 'white'}}

                >
                    show bottom (底部显示)
                </Button>
                <Button
                    onPress={this._showFastToast}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    show fast (快速显示)
                </Button>
                <Button
                    onPress={this._showFastToastAndAnimatedHide}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    show fast immediate hide
                </Button>
                <Button
                    onPress={this._showImmediateToast}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    show immediate (立即显示)
                </Button>
                <Button
                    onPress={this._showImmediateToastAndAnimatedHide}
                    style={{margin: 10, height: 40, backgroundColor: 'red', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: 'red', justifyContent: 'center',}}
                    textStyle={{fontSize: 17, color: 'white'}}
                >
                    show immediate animated hide
                </Button>

                <Toast ref={ component => this._toast = component }>
                    Unable to connect to app store
                </Toast>
            </View>
        )
    }

    _showTopToast = () => {
        this._toast.show({
            position: Toast.constants.gravity.top,
        })
    }

    _showCenterToast = () => {
        this._toast.show({
            position: Toast.constants.gravity.center,
        })
    }

    _showBottomToast = () => {
        this._toast.show({
            position: Toast.constants.gravity.bottom,
        })
    }

    _showFastToast = () => {
        this._toast.show({
            position: Toast.constants.gravity.center,
            duration: 255,
        })
    }

    _showFastToastAndAnimatedHide = () => {
        this._toast.show({
            position: Toast.constants.gravity.center,
            duration: 255,
            animationEnd : () => {
                this._toast._toastAnimationToggle = this.setTimeout( () => {
                    this._toast.hide({
                        duration: 0,
                        animationEnd: () => {
                            //do sth...
                        }
                    })
                }, 3000)
            }
        })
    }

    _showImmediateToast = () => {
        this._toast.show({
            position: Toast.constants.gravity.center,
            duration: 0,
        })
    }
    _showImmediateToastAndAnimatedHide = () => {
        this._toast.show({
            position: Toast.constants.gravity.center,
            duration: 0,
            animationEnd : () => {
                this._toast._toastAnimationToggle = this.setTimeout( () => {
                    this._toast.hide({
                        animationEnd: () => {
                            //do sth...
                        }
                    })
                }, 3000)
            }
        })
    }

}


export default TimerEnhance(ToastText)
```

## Props

Prop        | Type   | Optional | Default          | Description
----------- | ------ | -------- | ---------------- | -----------
style       | style  | Yes      |                  | see [react-native documents][3]
textStyle   | style  | Yes      |                  | see [react-native documents][4]
spacing     | number | Yes      | 30               | determine the top or bottom spacing when the position is on the top or bottom
position    | style  | Yes      | constants.bottom | determine the position of toast
duration    | style  | Yes      | 510              | determine the duration of toast animation

## Method

* show({position, duration, easing, delay, animationEnd,})

    * position: determine the position of toast. enum(gravity.bottom, gravity.top, gravity.center)
    * duration: determine the duration of animation
    * easing: determine the easing of animation
    * delay: determine the delay of animation
    * animationEnd: determine the callback when animation is end

* hide({duration, easing, delay, animationEnd,})

    * duration: determine the duration of animation
    * easing: determine the easing of animation
    * delay: determine the delay of animation
    * animationEnd: determine the callback when animation is end

[0]: https://github.com/cyqresig/ReactNativeComponentDemos
[1]: http://cyqresig.github.io/img/react-native-smart-toast-preview-ios-v1.0.0.gif
[2]: http://cyqresig.github.io/img/react-native-smart-toast-preview-android-v1.0.0.gif
[3]: https://facebook.github.io/react-native/docs/style.html
[4]: http://facebook.github.io/react-native/docs/text.html#style

