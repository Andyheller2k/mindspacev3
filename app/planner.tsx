// App.js
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function App() {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [planner, setPlanner] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask) return;
    const updated = { ...planner };
    if (!updated[selectedDay]) updated[selectedDay] = [];
    updated[selectedDay].push(newTask);
    setPlanner(updated);
    setNewTask("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weekly Planner</Text>

      {/* Days Row */}
      <FlatList
        horizontal
        data={daysOfWeek}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDay === item && styles.selectedDay,
            ]}
            onPress={() => setSelectedDay(item)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === item && styles.selectedDayText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      />

      {/* Planner Items */}
      <ScrollView style={styles.taskList}>
        {(planner[selectedDay] || []).map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskText}>• {task}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>＋ Add Task</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Task for {selectedDay}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task..."
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addTask}>
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  daysContainer: { marginVertical: 10 },
  dayButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  selectedDay: { backgroundColor: "#3b82f6" },
  dayText: { fontSize: 16, color: "#000" },
  selectedDayText: { color: "#fff", fontWeight: "bold" },
  taskList: { marginTop: 10 },
  taskItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  taskText: { fontSize: 16 },
  addButton: {
    marginTop: "auto",
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: { color: "#fff", fontSize: 18 },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: { color: "#fff", fontSize: 16 },
  cancelButton: {
    alignItems: "center",
  },
  cancelButtonText: { color: "red" },
});
