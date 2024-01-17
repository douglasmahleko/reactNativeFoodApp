import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"
import { colors } from "../constants/theme"
import { sizes } from "../constants/sizes"
import Icon from "react-native-vector-icons/MaterialIcons"
import Awesome from "react-native-vector-icons/Foundation"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Component } from "react"
import { Animated } from "react-native"
import { Image } from "react-native"
// import Animated from "react-native-reanimated"

class Restaurant extends Component{
    constructor(props){
        super(props)
        this.state={
            data:this.props.route.params.item,
            currentLocation:this.props.route.params.item,
            scrollX: new Animated.Value(0),
            orderItems:[]
        }

    }
    editOrder(action, menuId, price){
        let orderList = this.state.orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)
        if(action == "+"){
            
            if(item.length > 0){
                let newQty = item[0].qty+1 
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            }else{
                const newItem = {
                    menuId:menuId,
                    qty:1,
                    price:price,
                    total:price
                }
                orderList.push(newItem)
            }
            this.setState({orderItems:orderList})
        }else{
            if(item.length > 0){
                if(item[0]?.qty > 0){
                    let newQty = item[0].qty-1 
                    item[0].qty = newQty
                    item[0].total = item[0].qty * price
                }
            }
            this.setState({orderItems:orderList})
        }
    }
    getOrderQty(menuId){
        let orderItem = this.state.orderItems.filter(a => a.menuId == menuId)
        if( orderItem.length > 0 ){
            return orderItem[0].qty
        }
        return 0
    }
    getBasketItemCount(){
        let itemCount = this.state.orderItems.reduce((a, b) => a + (b.qty || 0), 0)
        return itemCount
    }
    sumOrder(){
        let total = this.state.orderItems.reduce((a, b) => a + (b.total || 0), 0)
        return total.toFixed(2)
    }
    renderHeader(){
        return(
            <View style={{flexDirection:"row", height:50, marginTop:10}}>
                <TouchableOpacity style={{width:50, justifyContent:"center", paddingLeft:sizes.padding*2}}
                    onPress={this.props.navigation.goBack}
                >
                    <Icon size={30} name="arrow-back" color={colors.black} />
                </TouchableOpacity>
                <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
                    <View style={{
                        backgroundColor:colors.lightGray3, height:"100%", width:200,alignItems:"center", justifyContent:"center",
                        borderRadius:sizes.radius
                    }}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>{this.state.data.name}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width:40, justifyContent:"center", marginRight:sizes.padding*2}}>
                    <Awesome size={30} name="indent-more" color={colors.black} />
                </TouchableOpacity>
            </View>
        )
    }
    renderFoodInfo(){
        
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
                // onScroll={Animated.event([
                //     { nativeEvent : { contentOffset : { x : this.scrollX } } }
                // ], { useNativeDriver : false } ) }
            >
                {
                    this.state.data.menu.map((item, index) => (
                        <View style={{alignItems:"center"}} key={`menu-${index}`}>
                            <View style={{height:sizes.height*0.35}}>
                                <Image source={item.photo} style={{height:"100%", width:sizes.width}} resizeMode="contain" />
                                <View style={{height:50, bottom:-20, position:"absolute", width:sizes.width, justifyContent:"center",
                                flexDirection:"row"
                            }}>
                                    <TouchableOpacity style={{width:50, backgroundColor:colors.lightGray3, alignItems:"center",
                                    justifyContent:"center", borderBottomLeftRadius:25, borderTopLeftRadius:25
                                }} onPress={() => this.editOrder("-", item.menuId, item.price)}>
                                        <Text style={{fontSize:20, fontWeight:"bold"}}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{width:50,alignItems:"center",
                                    justifyContent:"center", backgroundColor:colors.lightGray3,}}>
                                        <Text style={{fontSize:20, fontWeight:"bold"}}> {this.getOrderQty(item.menuId)} </Text>
                                    </View>
                                    <TouchableOpacity style={{width:50, backgroundColor:colors.lightGray3, alignItems:"center",
                                    justifyContent:"center", borderBottomRightRadius:25, borderTopRightRadius:25
                                }} onPress={() => this.editOrder("+", item.menuId, item.price)}>
                                        <Text style={{fontSize:20, fontWeight:"bold"}}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                width:sizes.width, alignItems:"center", marginTop:15, paddingHorizontal:sizes.padding*2
                            }}>
                                <Text style={{marginVertical:10, textAlign:"center", fontSize:20,
                                fontWeight:"bold"
                            }}> {item.name} - {item.price.toFixed(2)}</Text>
                            <Text style={{fontSize:18, fontWeight:"500"}}> {item.description} </Text>
                            </View>
                            <View style={{flexDirection:"row", marginTop:10}}>
                                <Icon name="local-fire-department" size={20} color={colors.primary} style={{marginRight:10}} />
                                <Text style={{color:colors.darkgray, fontSize:18, fontWeight:"500"}}> {item.calories.toFixed(2)} cal </Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }
    renderDots(){
        const dotPosition = Animated.divide(this.state.scrollX, sizes.width)
        return(
            <View style={{height:30}}>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", height:sizes.padding}}>
                    {
                        this.state.data.menu.map((item, index) => {
                            const opacity = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate:"clamp"
                            })
                            const dotSize = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [sizes.base*0.8, 10, sizes.base*0.8],
                                extrapolate:"clamp"
                            })
                            const dotColor = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [colors.darkgray, colors.primary, colors.darkgray],
                                extrapolate:"clamp"
                            })
                            return(
                                <Animated.View
                                    key={`dot-${index}`}
                                    opacity={opacity}
                                    style={{
                                        backgroundColor:dotColor,
                                        height:dotSize,
                                        width:dotSize,
                                        marginHorizontal:6,
                                        borderRadius:sizes.radius
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    renderOrder(){
        return(
            <View>
                {this.renderDots()}
                <View style={{backgroundColor:colors.lightGray2, borderTopLeftRadius:40, borderTopRightRadius:40}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", borderBottomWidth:1,
                borderBottomColor:colors.darkgray, paddingHorizontal:sizes.padding*2, paddingVertical:sizes.padding*3
                }}>
                        <Text style={{fontSize:18, fontWeight:"500"}}> {this.getBasketItemCount()} Items In Cart</Text>
                        <Text style={{fontSize:18, fontWeight:"500"}}>${this.sumOrder()}</Text>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:'space-between', paddingVertical:sizes.padding*2, paddingHorizontal:sizes.padding*3}}>
                        <View style={{flexDirection:"row"}}>
                            <Icon size={20} name="person-pin-circle" color={colors.darkgray} />
                            <Text style={{fontSize:18, fontWeight:"500", marginLeft:sizes.padding}} >Location</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <FontAwesome name="cc-mastercard" size={20} color={colors.darkgray} />
                            <Text style={{fontSize:18, fontWeight:"500", marginLeft:sizes.padding}}>8888</Text>
                        </View>
                    </View>
                    <View style={{alignItems:"center", justifyContent:"center", padding:sizes.padding*2}}>
                        <TouchableOpacity style={{backgroundColor:colors.primary, alignItems:"center", padding:sizes.padding, width:sizes.width*0.9, 
                        borderRadius:sizes.radius
                    }} onPress={() => this.props.navigation.navigate("OrderDelivery", {data:this.state.data, currentLocation:this.currentLocation})} >
                            <Text style={{fontSize:20, fontWeight:"bold", marginLeft:sizes.padding}}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                {this.renderHeader()}
                {this.renderFoodInfo()}
                {this.renderOrder()}
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:"white"
    },
    shadow:{
        elevation:1,
        shadowRadius:3,
        shadowOpacity:0.1,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:3
        }
    }
})
export default Restaurant