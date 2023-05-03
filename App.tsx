import "react-native-gesture-handler";
import React from "react";
import { initializeApp } from "firebase/app";
import { StatusBar } from "react-native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "./src/infrastructure/theme/ThemeProvider";
import { AuthenticationContextProvider } from "./src/services/authentication/AuthenticationContext";
import { Navigation } from "./src/infrastructure/navigation/index";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBr1Ra3uDRpAnOJZWOZDVrAYbkNZMmfdjM",
  authDomain: "mealstogo-3b93d.firebaseapp.com",
  projectId: "mealstogo-3b93d",
  storageBucket: "mealstogo-3b93d.appspot.com",
  messagingSenderId: "784949645574",
  appId: "1:784949645574:web:628affab9f9dede4cf0e87",
};
initializeApp(firebaseConfig);

const App: React.FC = () => {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });
  const areFontsLoaded = oswaldLoaded && latoLoaded;

  if (!areFontsLoaded) return <></>;

  return (
    <>
      <ThemeProvider>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <StatusBar />
    </>
  );
};

export default App;
