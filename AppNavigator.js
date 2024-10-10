import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";

import { useSelector } from "react-redux";
import { Image, TouchableOpacity } from "react-native";

import CommentsModal from "./screens/CommentModal";
import HomeScreen from "./screens/HomeScreen";
import ChatUsersList from "./screens/ChatUsersListScreen";
import UploadScreen from "./screens/UploadScreen";
import SearchScreen from "./screens/SearchScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import EditProfile from "./screens/EditProfileScreen";
import MessageScreen from "./screens/MessageScreen";
import UserPosts from "./screens/UserPosts";
import LikeNotificationScreen from "./screens/LikeNotificationScreen";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  const { user } = useSelector((store) => store.auth);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "chat") {
            return (
              <FontAwesome5
                name="facebook-messenger"
                size={28}
                color="black"
                style={{ marginTop: 6 }}
              />
            );
          } else if (route.name === "Upload") {
            return (
              <Feather
                name="plus-square"
                size={30}
                color="black"
                style={{ marginTop: 6 }}
              />
            );
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "UserProfile") {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserProfile", { id: user?._id })
                }
              >
                {user?.profilePicture !== "" ? (
                  <Image
                    source={{ uri: user?.profilePicture }}
                    resizeMode="stretch"
                    style={{ width: 35, height: 35, borderRadius: 20 }}
                  />
                ) : (
                  <Image
                    source={require("./assets/avatar.jpg")}
                    style={{ width: 35, height: 35, borderRadius: 20 }}
                    resizeMode="stretch"
                  />
                )}
              </TouchableOpacity>
            );
          }

          return (
            <Icon
              name={iconName}
              size={30}
              color={color}
              style={{ marginTop: 6 }}
            />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "", headerShown: false }}
      />
      <Tab.Screen
        name="chat"
        component={ChatUsersList}
        options={{ tabBarLabel: "", headerShown: false }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{ tabBarLabel: "", headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: "", headerShown: false }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ tabBarLabel: "", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommentModal"
          component={CommentsModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="message"
          component={MessageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userposts"
          component={UserPosts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="likeNotify"
          component={LikeNotificationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
