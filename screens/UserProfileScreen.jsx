import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  followFailure,
  followRequest,
  followSuccess,
  setAuthUser,
  unfollowSuccess,
} from "../redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { setSelectedUser } from "../redux/chatSlice";
import { setPosts } from "../redux/postsSlice";
import Toast from "react-native-simple-toast";

const UserProfileScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, userProfile } = useSelector((store) => store.auth);

  const [selectedTab, setSelectedTab] = useState("post");
  const { loading, refetch } = useGetUserProfile(id);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isLoggedUser = user?._id === userProfile?._id;

  useEffect(() => {
    if (!id) {
      navigation.goBack();
    }
  }, [id]);

  useEffect(() => {
    setIsFollowing(userProfile?.followers?.includes(user?._id) || false);
    setFollowerCount(userProfile?.followers?.length || 0);
  }, [userProfile, user, id]);

  const followOrUnfollowUser = async () => {
    if (isRequestInProgress) return;
    setIsRequestInProgress(true);
    dispatch(followRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        `https://social-media-webapp-2z2m.onrender.com/api/v1/user/followorunfollow/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        const { action, user: updatedUser } = res.data;

        if (action === "follow") {
          setIsFollowing(true);
          setFollowerCount((prev) => prev + 1);
          dispatch(followSuccess(updatedUser));
          Toast.showWithGravity("Following ", Toast.LONG, Toast.BOTTOM);
        } else if (action === "unfollow") {
          setIsFollowing(false);
          setFollowerCount((prev) => prev - 1);
          dispatch(unfollowSuccess(updatedUser));
          Toast.showWithGravity("Unfollowed ", Toast.LONG, Toast.BOTTOM);
        }
      }
    } catch (error) {
      dispatch(followFailure(error.message));
      Toast.showWithGravity(
        error.message || "Something went wrong",
        Toast.LONG,
        Toast.BOTTOM
      );
    } finally {
      setIsRequestInProgress(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // log out
  const logoutHandler = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await axios.get(
        "https://social-media-webapp-2z2m.onrender.com/api/v1/user/logout",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedUser(null));
        dispatch(setPosts([]));
        navigation.navigate("Login");
        Toast.showWithGravity(
          res.data.message || " Logout successfully",
          Toast.LONG,
          Toast.BOTTOM
        );
      } else {
        Toast.showWithGravity(
          error.message || "logout failed",
          Toast.LONG,
          Toast.BOTTOM
        );
      }
    } catch (error) {
      Toast.showWithGravity(
        error.message || "Something went wrong",
        Toast.LONG,
        Toast.BOTTOM
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView>
        {loading ? (
          <View className="flex-1 justify-center items-center my-4">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View className="space-y-4 p-3 relative">
            {/* Header */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row gap-x-6 items-center">
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={30} color="black" />
                </Pressable>
                <Text className="font-bold text-xl">
                  {userProfile?.userName}
                </Text>
              </View>
              {isLoggedUser ? (
                <View className="flex-row gap-x-6">
                  <Pressable onPress={() => navigation.navigate("Upload")}>
                    <Feather name="plus-square" size={26} color="black" />
                  </Pressable>
                  <Pressable onPress={logoutHandler}>
                    <SimpleLineIcons name="logout" size={24} color="black" />
                  </Pressable>
                </View>
              ) : null}
            </View>

            {/* Profile Details */}
            <View className="gap-x-3 flex-row items-center justify-evenly">
              {userProfile?.profilePicture !== "" ? (
                <Image
                  source={{ uri: userProfile?.profilePicture }}
                  resizeMode="stretch"
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <Image
                  source={require("../assets/avatar.jpg")}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  resizeMode="stretch"
                />
              )}
              <TouchableOpacity className="flex items-center">
                <Text className="font-bold text-base">
                  {userProfile?.posts?.length}
                </Text>
                <Text className="font-semibold">Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex items-center">
                <Text className="font-bold text-base">{followerCount}</Text>
                <Text className="font-semibold">Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex items-center">
                <Text className="font-bold text-base">
                  {userProfile?.following?.length}
                </Text>
                <Text className="font-semibold">Following</Text>
              </TouchableOpacity>
            </View>

            {/* Bio */}
            <View className="max-w-[60vw]">
              <Text className="font-semibold" numberOfLines={6}>
                {userProfile?.bio}
              </Text>
            </View>

            {/* Action Buttons */}
            {isLoggedUser ? (
              <View className="flex-row justify-evenly items-center gap-x-4">
                <TouchableOpacity
                  className="bg-slate-200 py-3 w-[35%] rounded-lg"
                  onPress={() => navigation.navigate("EditProfileScreen")}
                >
                  <Text className="font-bold text-center">Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-slate-200 py-3 w-[35%] rounded-lg">
                  <Text className="font-bold text-center">Share profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-slate-200 py-2 w-[15%] rounded-lg flex-row items-center justify-center">
                  <Feather name="user-plus" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row justify-evenly items-center gap-x-3">
                <TouchableOpacity
                  className={`${
                    isFollowing
                      ? "bg-gray-400 hover:bg-gray-300"
                      : "bg-blue-500 hover:bg-blue-300"
                  } py-3 w-[35%] rounded-lg`}
                  onPress={followOrUnfollowUser}
                  disabled={isRequestInProgress}
                >
                  <Text className="font-bold text-center">
                    {isFollowing ? "Following" : "Follow"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-slate-200 py-3 w-[35%] rounded-lg">
                  <Text className="font-bold text-center">Share profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-slate-200 py-2 w-[15%] rounded-lg flex-row items-center justify-center">
                  <MaterialIcons name="message" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}

            {/* Tabs */}
            <View className="flex-row justify-evenly items-center mt-6">
              <TouchableOpacity
                onPress={() => setSelectedTab("post")}
                className={`${
                  selectedTab === "post" ? "border-black" : "border-gray-300"
                } border-b-2 pb-2`}
              >
                <Octicons name="apps" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("reels")}
                className={`${
                  selectedTab === "reels" ? "border-black" : "border-gray-300"
                } border-b-2 pb-2`}
              >
                <Fontisto
                  name="spinner-rotate-forward"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("saved")}
                className={`${
                  selectedTab === "saved" ? "border-black" : "border-gray-300"
                } border-b-2 pb-2`}
              >
                <Feather name="bookmark" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("tagged")}
                className={`${
                  selectedTab === "tagged" ? "border-black" : "border-gray-300"
                } border-b-2 pb-2`}
              >
                <Feather name="tag" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View className="mt-6">
              {selectedTab === "post" && (
                <View className="mx-2">
                  {userProfile?.posts?.length > 0 &&
                    userProfile?.posts?.map((post, ind) => (
                      <View key={ind} className="flex-row flex-wrap  mb-4">
                        <Image
                          source={{ uri: post?.image }}
                          className="w-32 h-32 object-cover"
                        />
                      </View>
                    ))}
                </View>
              )}
              {selectedTab === "reels" && (
                <Text className="text-center">Reels Content</Text>
              )}
              {selectedTab === "saved" && (
                <Text className="text-center">Saved Content</Text>
              )}
              {selectedTab === "tagged" && (
                <Text className="text-center">Tagged Content</Text>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserProfileScreen;
