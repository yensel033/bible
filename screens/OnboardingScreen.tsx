import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header';
import { Text, View } from '../components/Themed';
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';

const Article = () => (
    <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        <Text> ratione aliquam obcaecati assumenda commodi provident? Deleniti saepe amet ut dignissimos optio voluptates perspiciatis eligendi eaque. Error.</Text>
    </ScrollView>
)

const renderScene = SceneMap({
    init: Article,
    favorite: Article,
    guide: Article,
});

function CustomTabView() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = useState([
        { key: 'init', title: 'Inicio' },
        { key: 'favorite', title: 'Favoritos' },
        { key: 'guide', title: 'Guia' },

    ]);

    const renderTabBar = (props: any) => {
        return <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
            tabStyle={styles.tabStyle}
        />
    }

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}

export default function OnboardingScreen({ navigation }: any) {
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
        backgroundColor: '#fff',
    },
    tabbar: {
        backgroundColor: '#607D8B',
    },
    indicator: {
        backgroundColor: '#f00',
    },
    label: {
        color: '#fff'
    },
    tabStyle: {
        width: 'auto',
    },
});
