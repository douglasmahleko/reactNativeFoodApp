import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Awesome from "react-native-vector-icons/FontAwesome"
import Icon from "react-native-vector-icons/MaterialIcons"
import { colors } from "../constants/theme"
import Home from "../screens/home"
import { View } from 'react-native';

const Tab = createBottomTabNavigator()
function BottomTab(){
    return(
        <Tab.Navigator screenOptions={{
            headerShown : false,
            tabBarShowLabel:false,
            style:{
                borderTopWidth:0,
                elevation:0,
                backgroundColor:"transparent"
            }
        }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={ focused ? {height:60,
                            width:60,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:colors.secondary,
                            borderColor:"coral",
                            borderWidth:2,
                            borderRadius:30,
                            top:-25,
                            elevation:5                        
                        } : {} }>
                            <Awesome name="cutlery" size={25} color={focused ? colors.primary : colors.secondary} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Search" component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={ focused ? {height:60,
                            width:60,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:colors.secondary,
                            borderColor:"coral",
                            borderWidth:2,
                            borderRadius:30,
                            top:-25,
                            elevation:5                        
                        } : {} }>
                            <Awesome name="search" size={25} color={focused ? colors.primary : colors.secondary} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Like" component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={ focused ? {height:60,
                            width:60,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:colors.secondary,
                            borderColor:"coral",
                            borderWidth:2,
                            borderRadius:30,
                            top:-25,
                            elevation:5                        
                        } : {} }>
                            <Icon name="favorite" size={25} color={focused ? colors.primary : colors.secondary} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="User" component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={ focused ? {height:60,
                            width:60,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:colors.secondary,
                            borderColor:"coral",
                            borderWidth:2,
                            borderRadius:30,
                            top:-25,
                            elevation:5                        
                        } : {} }>
                            <Awesome name="user" size={25} color={focused ? colors.primary : colors.secondary} />
                        </View>
                    )
                }}
            />
            
        </Tab.Navigator>
    )
}
export default BottomTab