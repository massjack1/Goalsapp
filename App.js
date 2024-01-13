import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisable, setModalIsVisable] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisable(true);
  }
  function endAddGoalHandler() {
    setModalIsVisable(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setModalIsVisable(false);
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
      <>
        <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <View style={styles.btnContainer}>
          <Button title='Add New Goal' color="#00A1B5" onPress={startAddGoalHandler} />
        </View>
        <GoalInput visible={modalIsVisable} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
        <View style={styles.goalsContainer}>
          <FlatList
              data={courseGoals}
              renderItem={(itemData) => {
                return (
                    <GoalItem
                        text={itemData.item.text}
                        id={itemData.item.id}
                        onDeleteItem={deleteGoalHandler}
                    />
                )
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              alwaysBounceVertical={false}
          />
        </View>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#A3F0F9',
  },
  goalsContainer: {
    flex: 5,
  },
  btnContainer: {
    marginTop: 25,
  }
});