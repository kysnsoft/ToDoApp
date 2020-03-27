import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import TodoApp from '../TodoApp'
import TaskDetails from '../TaskDetails'
import Header from '../Header'
import React from 'react'

const screens = {
    TodoApp: {
        screen: TodoApp,
        navigationOptions: {
            headerTitle: () => <Header title="ToDo" />
        }
    },
    TaskDetails: {
        screen: TaskDetails,
        navigationOptions: {
            headerTitle: () => <Header title="Task Details" />,
            headerShown: false,
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#3b191b',
            height: 65,
        },
        headerTintColor: 'white',
    }
})

export default createAppContainer(HomeStack)