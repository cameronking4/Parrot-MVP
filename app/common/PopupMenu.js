import React, {
  Component,
  // PropTypes
   } from 'react'
import {
  View,
  Image,
  UIManager,
  findNodeHandle,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';
const Icon = require('react-native-vector-icons/Ionicons').default;
const ICON_SIZE = 24

export class PopupMenu extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      icon: null
    }
  }

  onError () {
    console.log('Popup Error')
  }

   onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress,
        
      )
    }
  }

  render () {
    return (
      <View style={[{flex:1}]}>
        <TouchableOpacity onPress={this.onPress} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
         <Icon name="md-more" size={29} color="black" style={{ width:15,height:30 ,alignItems:"flex-start"}} ref={this.onRef}/>
         
          {/*<Icon
            name='ellipsis-v'
            size={ICON_SIZE}
            color={'#ffffff'}
            ref={this.onRef} />*/}
        </TouchableOpacity>
      </View>
    )
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({icon})
    }
  }
}

module.exports = PopupMenu;
