import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from "react-native"
import { colors } from "../constants/theme"
import Icon from "react-native-vector-icons/Entypo"
import Awesome from "react-native-vector-icons/FontAwesome"
import { sizes } from "../constants/sizes"
import { useState } from "react"
import { categoryData } from "../constants/categoryData"
import { restaurantData } from "../constants/restaurantData"

function Home({navigation}){
    let catData = categoryData
    let restData = restaurantData
    let currentLocation = "Chipinge"
    const [categories, setCategories] = useState(catData)
    const [restaurant, setRestaurant] = useState(restData)
    const [selectedCategory, setSelectedCategory] = useState(null)
    function onSelectCategory(category){
        let restaurantList = restData.filter(a => a.categories.includes(category.id))
        setRestaurant(restaurantList)
        setSelectedCategory(category)
    }
    function getCategoryNameById(id){
        let category = categories.filter(a => a.id == id)
        if(category.length > 0)
            return category[0].name
        return ""
    }
    function renderHeader(){
        return(
            <View style={{flexDirection:"row", height:50, marginTop:10}}>
                <TouchableOpacity style={{width:50, justifyContent:"center", paddingLeft:sizes.padding*2}}>
                    <Icon size={30} name="location" color={colors.black} />
                </TouchableOpacity>
                <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
                    <View style={{
                        backgroundColor:colors.lightGray3, height:"100%", width:200,alignItems:"center", justifyContent:"center",
                        borderRadius:sizes.radius
                    }}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>1646 phase III</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width:40, justifyContent:"center", marginRight:sizes.padding*2}}>
                    <Awesome size={30} name="shopping-basket" color={colors.black} />
                </TouchableOpacity>
            </View>
        )
    }
    function renderCategory(){

        const renderItem = ({item}) => {
            return(
                <TouchableOpacity style={{
    padding:sizes.padding, paddingBottom:sizes.padding*2,backgroundColor:(selectedCategory?.id == item.id) ? colors.primary:colors.white,
    borderRadius:sizes.radius, alignItems:"center", justifyContent:"center", marginRight:sizes.padding,
                    ...styles.shadow
                }} onPress={() => onSelectCategory(item)}>
                    <View style={{
    width:50, height:50, borderRadius:25, backgroundColor:(selectedCategory?.id == item.id) ? colors.white:colors.lightGray4, alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <Image source={item.icon} style={{width:30, height:30, borderRadius:30}}
                         resizeMode="contain"  />
                    </View>
<Text style={{marginTop:sizes.padding, color:(selectedCategory?.id == item.id) ? colors.white:colors.black,fontWeight:"500", fontSize:14}}> {item.name} </Text>
                </TouchableOpacity>
            )
        }

        return(
            <View style={{padding:sizes.padding*2}}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>Main</Text>
                <Text style={{fontSize:20, fontWeight:"bold"}}>Categories</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical:sizes.padding*2}}
                    data={categories}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                />
            </View>
        )
    }
    function renderRestaurantList(){
        const renderItem = ({item}) => {
            return(
                <TouchableOpacity style={{marginBottom:sizes.padding*2}} onPress={() => navigation.navigate("Restaurant", { item , currentLocation})}>
                    <View style={{marginBottom:sizes.padding}}>
                        <Image source={item.photo} resizeMode="contain" style={{
                            height:200, width:"100%", borderRadius:sizes.radius
                        }} />
                        <View style={{position:"absolute", bottom:0,height:50, width:sizes.width*0.3, backgroundColor:colors.white,
                    alignItems:"center", justifyContent:"center", borderTopRightRadius:sizes.radius, borderBottomLeftRadius:sizes.radius,...styles.shadow
                    }}>
                        <Text style={{fontWeight:"600", fontSize:16}}> {item.duration} </Text>
                        </View>
                    </View>
                    <Text style={{fontSize:16, fontWeight:"500"}}> {item.name} </Text>
                    <View style={{flexDirection:"row", marginTop:sizes.padding}}>
                        <Icon size={20} color={colors.primary} style={{marginRight:10}} name="star" />
                        <Text style={{fontSize:16, fontWeight:"500"}}> {item.rating} </Text>
                        <View style={{marginLeft:10, flexDirection:"row"}}>
                            {
                                item.categories.map((categoryId) => {
                                    return(
                                        <View style={{flexDirection:"row"}} key={categoryId}>
                                            <Text style={{fontSize:16, fontWeight:"500"}}> {getCategoryNameById(categoryId)} </Text>
                                            <Text style={{fontSize:16, fontWeight:"500", color:colors.darkgray}}>.</Text>
                                        </View>
                                    )
                                })
                            }
                            {
                                [1,2,3].map((priceRating) => (
                                    <Text key={priceRating} style={{fontSize:16, fontWeight:"500", color:(priceRating <= item.priceRating) ? 
                                    colors.black : colors.darkgray
                                }}>
                                        $
                                    </Text>
                                ))
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return(
            <FlatList
                data={restaurant}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom:30,
                    paddingHorizontal:sizes.padding*2
                }}
            />
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderCategory()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
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
export default Home