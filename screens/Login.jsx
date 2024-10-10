import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { storeToken } from "../authentication/token";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import Toast from "react-native-simple-toast";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Login = () => {
  const navigation = useNavigation();
  const { user } = useSelector((store) => store.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigation.navigate("MainTabs");
    }
  }, [user, navigation]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const inputFieldHandler = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const formHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://social-media-webapp-2z2m.onrender.com/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(setAuthUser(res.data.user));
      navigation.navigate("MainTabs");

      Toast.showWithGravity(
        res.data.message || "Logged in successfully",
        Toast.LONG,
        Toast.BOTTOM
      );

      // Store token
      storeToken(res.data.token);

      // Clear inputs
      setInput({
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      Toast.showWithGravity(errorMessage, Toast.LONG, Toast.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-4 py-16 bg-gray-100">
      <View className="w-full max-w-lg">
        <Text className="text-center text-2xl font-bold text-indigo-600">
          Welcome Back!
        </Text>
        <Text className="text-center mt-4 text-gray-500">
          Sign in to your account and continue your journey. Discover new
          content, connect with your friends, and stay updated with the latest
          happenings.
        </Text>

        <View className="mt-6 space-y-4 p-4 bg-white rounded-lg shadow-lg">
          <Text className="text-center text-lg font-medium">
            Sign In to your account
          </Text>

          {/* Email Input */}
          <View className="relative">
            <TextInput
              placeholder="Enter email"
              value={input.email}
              onChangeText={(value) => inputFieldHandler("email", value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
            />
          </View>

          {/* Password Input */}
          <View className="relative">
            <TextInput
              placeholder="Enter password"
              value={input.password}
              secureTextEntry={passwordType}
              onChangeText={(value) => inputFieldHandler("password", value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm"
            />
            <TouchableOpacity
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onPress={() => setPasswordType(!passwordType)}
            >
              <Icon
                name={passwordType ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={formHandler}
            className="w-full bg-indigo-600 py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center text-white font-medium">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Link */}
          <Text className="text-center text-sm text-gray-500">
            Create a new account?{" "}
            <Text
              onPress={() => navigation.navigate("Signup")}
              className="text-blue-500 font-semibold"
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
