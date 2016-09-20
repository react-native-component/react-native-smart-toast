/*
 * A android like toast for android and ios, written in JS
 * https://github.com/react-native-component/react-native-smart-timer-enhance/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
    Component,
    PropTypes,
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
} from 'react-native'

import TimerEnhance from 'react-native-smart-timer-enhance'
import constants, { gravity } from './constants'

const {width: deviceWidth, height: deviceHeight,} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        borderRadius: 8,
        padding: 8,
        left: -9999,
        top: -9999,
        zIndex: 999,
    },
    text: {
        fontFamily: '.HelveticaNeueInterface-MediumP4',
        fontSize: 14,
        color: '#fff'
    }
})

class Toast extends Component {

    static constants = constants

    static defaultProps = {
        spacing: 30,
        position: gravity.bottom,
        duration: 3000,
    }

    static propTypes = {
        style: View.propTypes.style,
        textStyle: Text.propTypes.style,
        spacing: PropTypes.number,
        position: PropTypes.oneOf([gravity.top, gravity.bottom, gravity.center,]),
        duration: PropTypes.number,
    }

    constructor(props) {
        super(props)
        // 初始状态
        this.state = {
            position: props.position,
            visible: false,
            opacity: new Animated.Value(0),
        }
        this._toastShowAnimation = null
        this._toastHideAnimation = null
        this._toastAnimationToggle = null
    }

    render() {
        let children = React.Children.map(this.props.children, (child) => {
            if (!React.isValidElement(child)) {
                return (
                    <Text
                        style={[styles.text, this.props.textStyle,]}>
                        {child}
                    </Text>
                )
            }
            return child
        })
        return (
            this.state.visible ?
                <Animated.View
                    ref={ component => this._container = component }
                    onLayout={this._onToastLayout}
                    style={[styles.container, this.props.style, {opacity:this.state.opacity}]}>
                    {children}
                </Animated.View> : null
        )
    }

    show({position = this.state.position, duration = 510, easing = Easing.linear, delay = 0, animationEnd,}
        = {position: this.state.position, duration: 510, easing: Easing.linear, delay: 0,}) {

        this._toastShowAnimation && this._toastShowAnimation.stop()
        this._toastHideAnimation && this._toastHideAnimation.stop()
        this._toastAnimationToggle && this.clearTimeout(this._toastAnimationToggle)

        this.setState({
            position,
            visible: true,
        })
        this._toastShowAnimation = Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration,
                easing,
                delay,
            }
        )
        this._toastShowAnimation.start(() => {
            this._toastShowAnimation = null
            if(!animationEnd) {
                this._toastAnimationToggle = this.setTimeout( () => {
                    this.hide({duration, easing, delay})
                    this._toastAnimationToggle = null
                }, this.props.duration)
            }
            else {
                animationEnd()
            }
        })
    }

    hide({duration = 510, easing = Easing.linear, delay = 0, animationEnd,}
        = {duration: 510, easing: Easing.linear, delay: 0,}) {

        this._toastShowAnimation && this._toastShowAnimation.stop()
        this._toastHideAnimation && this._toastHideAnimation.stop()
        this.clearTimeout(this._toastAnimationToggle)

        this._toastHideAnimation = Animated.timing(
            this.state.opacity,
            {
                toValue: 0,
                duration,
                easing,
                delay,
            }
        )
        this._toastHideAnimation.start( () => {
            this._toastHideAnimation = null
            this.setState({
                visible: false,
            })
            animationEnd && animationEnd()
        })
    }

    _onToastLayout = (e) => {
        let { position, } = this.state
        let { spacing, } = this.props
        let left = (deviceWidth - e.nativeEvent.layout.width) / 2
        let top = position == gravity.top ? spacing :
                    position == gravity.center ? (deviceHeight - e.nativeEvent.layout.width) / 2 : null
        let bottom = position == gravity.bottom ? spacing : null
        this._container.setNativeProps({
            style: {
                left,
                top,
                bottom,
            }
        })
    }

}

export default TimerEnhance(Toast)