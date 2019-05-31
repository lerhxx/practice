export default function wrapComponent() {
    return function component(Component) {
        class WrapComponent extends Component<any, any> {
            private isHide = false

            componentWillmount() {
                super.componentWillmount && super.componentWillmount()
                this.isHide = false
            }

            componentDidShow() {
                super.componentDidShow && super.componentDidShow()
                this.isHide = false
            }
        
            componentWillUnmount() {
                super.componentWillUnmount && super.componentWillUnmount()
                this.isHide = true
            }
        
            componentDidHide() {
                super.componentDidHide && super.componentDidHide()
                this.isHide = true
            }
        
            render() {
                return super.render()
            }
        }
        return WrapComponent
    } 
}
