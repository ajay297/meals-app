import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MealList from '../components/MealList'
import { MEALS } from '../data/dummy-data'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
const FavouritesScreen = (props) => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);
    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>
                    No favorite meals found. Start adding some!
                </DefaultText>
            </View>
        );
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    )
}
FavouritesScreen.navigationOptions = (navData) => {
    return {
        title: 'Your Favourites!',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>)
    }

}
export default FavouritesScreen

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
