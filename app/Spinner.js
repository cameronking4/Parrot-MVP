//date:16/4/2018

var React = require('react');
var ReactNative = require('react-native');
var color = require('./style/color.js');

var {
  Text,
  View,
  ActivityIndicator
} = ReactNative; 

export class Spinner extends React.Component {
	render() { 
		return (
			<View style={{
				flex:1,
				alignItems:'center',justifyContent:'center'}}>
				<ActivityIndicator 
				animating={true} 
				size="small" 
				color={'#000000'}
				/>
			</View>
		);
	}
}

module.exports = Spinner;