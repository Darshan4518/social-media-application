import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, setPosts } from "../redux/postsSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import SuggestedUsers from "../components/SuggestedUsers";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import Post from "../components/Post";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { posts } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, []);

  const getPosts = async (page = 1) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.showWithGravity(
          "No token found. Please login.",
          Toast.LONG,
          Toast.BOTTOM
        );
        return;
      }

      const res = await axios.get(
        `https://social-media-webapp-2z2m.onrender.com/api/v1/post/all?page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        if (page === 1) {
          dispatch(setPosts(res.data.posts));
        } else {
          dispatch(addPost(res.data.posts));
        }
        setTotalPages(res.data?.pagination?.totalPages || 1);
      }
    } catch (error) {
      Toast.showWithGravity(
        error.message || "Something went wrong",
        Toast.LONG,
        Toast.BOTTOM
      );
      navigation.navigate("Login");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    getPosts(1);
  };

  useEffect(() => {
    if (currentPage <= totalPages) {
      getPosts(currentPage);
    }
  }, [currentPage, dispatch, currentPage]);

  return (
    <SafeAreaView>
      {!loading && (
        <FlatList
          ListHeaderComponent={
            <View>
              <View className="my-4 flex-row items-center px-4 justify-between">
                <Text className=" text-xl font-bold text-gray-900">
                  D-Media
                </Text>
                <View className=" flex-row gap-x-6">
                  <Pressable
                    onPress={() => {
                      navigation.navigate("likeNotify");
                    }}
                  >
                    <MaterialIcons
                      name="favorite-border"
                      size={30}
                      color="black"
                    />
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate("Search")}>
                    <FontAwesome name="search" size={26} color="black" />
                  </Pressable>
                </View>
              </View>
              <SuggestedUsers />
            </View>
          }
          data={posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?._id.toString()}
          renderItem={({ item: post }) => (
            <Post post={post} loading={loading} />
          )}
          ListFooterComponent={() =>
            currentPage < totalPages && !loading ? (
              <View className="my-4 justify-center items-center">
                <TouchableOpacity onPress={handleLoadMore}>
                  <Text className="bg-blue-500 text-white px-4 py-2 rounded">
                    Load More
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          ListEmptyComponent={() =>
            !loading && posts?.length === 0 ? (
              <View className="justify-center items-center my-4">
                <Text>No posts available</Text>
              </View>
            ) : null
          }
          ListFooterComponentStyle={{ marginBottom: 20 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
      {loading && (
        <View className="justify-center items-center my-4">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
