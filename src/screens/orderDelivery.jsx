import { Component } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { sizes } from "../constants/sizes"
import { colors } from "../constants/theme"
import Icon from "react-native-vector-icons/FontAwesome"


class Delivery extends Component {
    constructor(props){
        super(props)
        this.state={
            currentLocation: [],
            data: this.props.route.params.data,
        }
    }
    renderDestination(){
        
        return(
            <View style={{position:"absolute", top:50, left:0, right:0, height:50, alignItems:"center", 
            justifyContent:"center"}}>
            <View style={{flexDirection:"row", alignItems:"center", width:sizes.width*0.9, paddingVertical:sizes.padding,
        paddingHorizontal:sizes.padding*2, borderRadius:sizes.radius, backgroundColor:colors.white
        }}>
            <Icon name="map-pin" size={30} color={"red"} style={{marginRight:sizes.padding}} />
            <View style={{flex:1}}>
                <Text style={{fontSize:20, fontWeight:"bold", marginLeft:sizes.padding2}}>{this.state.data.name}</Text>
            </View>
            <Text style={{fontSize:20, fontWeight:"bold"}}> 7 min </Text>
            </View>
        </View>
        )
    }
    renderDeliveryInfo(){
        return(
            <View style={{position:"absolute", bottom:50, left:0, right:0, alignItems:"center", 
            justifyContent:"center"}}>
                <View style={{ width:sizes.width*0.9, paddingVertical:sizes.padding*3,
                paddingHorizontal:sizes.padding*2, borderRadius:sizes.radius, backgroundColor:colors.white
                }}>
                    <View style={{flexDirection:"row", alignItems:"center", marginBottom:20}}>
                        <Image source={this.state.data?.courier.avatar} style={{width:50, height:50,borderRadius:25}}
                            resizeMode="cover"
                        />
                        
                            <View style={{flex:1, marginLeft:sizes.padding}}>
                                <View style={{flexDirection:"row", justifyContent:"space-btween"}}>
                                    <Text style={{fontSize:20, fontWeight:"bold", marginLeft:sizes.padding2}}> 
                                    {this.state.data?.courier.name} </Text>
                                    <View style={{flexDirection:"row", marginLeft:sizes.padding*12}}>
                                        <Icon name="star" size={20} style={{color:colors.primary}} />
                                        <Text style={{fontSize:20, fontWeight:"bold"}}> {this.state.data?.rating} </Text>
                                    </View>
                                </View>
                                <Text style={{fontSize:16, fontWeight:"500", color:colors.darkgray, paddingTop:10, marginLeft:sizes.padding2}}> {this.state.data?.name} </Text>
                            </View>                        
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:sizes.padding*2}}>
                        <TouchableOpacity style={{height:50, borderRadius:10, justifyContent:"canter", alignItems:"center", backgroundColor:colors.primary,
                    width:sizes.width*0.5 - sizes.padding*6, paddingVertical:10
                    }} onPress={() => this.props.navigation.navigate("Home")}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}> Call </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:50, borderRadius:10, justifyContent:"canter", alignItems:"center", backgroundColor:colors.darkgray,
                    width:sizes.width*0.5 - sizes.padding*6, paddingVertical:10
                    }} onPress={() => this.props.navigation.goBack()}>
                        <Text style={{fontSize:20, fontWeight:"bold", color:colors.black}}> Message </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
 
        )
    }
    renderButtons(){
        return(
            <View style={{width:60,height:130, bottom:sizes.height*0.35, position:"absolute", justifyContent:"space-between", right:sizes.padding*2}}>
                <TouchableOpacity style={{width:60,height:60, borderRadius:30, alignItems:"center", justifyContent:"center", backgroundColor:colors.white}}>
                    <Text style={{fontSize:20, fontWeight:"bold", color:colors.black}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:60,height:60, borderRadius:30, alignItems:"center", justifyContent:"center", backgroundColor:colors.white}}>
                <Text style={{fontSize:20, fontWeight:"bold", color:colors.black}}>-</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                {this.renderDestination()}
                {this.renderDeliveryInfo()}
                {this.renderButtons()}
            </View>
        )
    }
}
export default Delivery