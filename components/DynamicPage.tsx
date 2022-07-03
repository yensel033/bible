import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "./Header";
import { Text, View } from "./Themed";
import React, { useState, useEffect, ComponentType } from "react";
import { useWindowDimensions } from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
  Route,
} from "react-native-tab-view";
import BooksContent from "../utils/BooksContent";

const getNumberOfChapters = (bookName: string): Route[] => {
  return BooksContent[bookName].map((a: any, index: any) => ({
    key: index,
    title: `Capitulo ${index + 1}`,
    content: a,
  }));
};

const Article = ({ route }: any) => {
  const { content } = route;
  //   React.useEffect(() => {
  //     console.log("================================");
  //     console.log("route.content: ", route.content[0]);
  //     console.log("================================");
  //   }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
    >
      {content.map((chapter: any, index: any) => (
        <Text style={styles.verse} key={index}>{`${
          index + 1
        }. ${chapter}`}</Text>
      ))}
    </ScrollView>
  );
};

const getScenes = (name: string): { [key: string]: ComponentType<unknown> } => {
  let obj: any = {};
  getNumberOfChapters(name).forEach((i, index) => {
    obj[index] = Article;
  });

  return obj;
};

const renderScene = (name: string) => SceneMap(getScenes(name));

function CustomTabView() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const name = "mateo";
  const [routes] = useState(getNumberOfChapters(name));

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
        tabStyle={styles.tabStyle}
      />
    );
  };

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene(name)}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default function DinamicPage(props: any) {
  const { navigation } = props;

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header {...{ navigation }} />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <CustomTabView />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabbar: {
    backgroundColor: "#607D8B",
  },
  indicator: {
    backgroundColor: "#f00",
  },
  label: {
    color: "#fff",
  },
  tabStyle: {
    width: "auto",
  },
  chapterContainer: {
    display: "flex",
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
    height: "100%",
  },
  verse: {
    marginVertical: 5,
    fontSize: 18,
  },
});
