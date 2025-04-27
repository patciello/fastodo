import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useState, useEffect, useRef } from "react";
import { FlashList } from "@shopify/flash-list";

import { Participant } from "@/components/Participant";
import { ProgressBar } from "@/components/ProgressBar";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Definindo um tipo para as tarefas
type Task = {
  id: string;
  name: string;
  completeAt?: number;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  const flashListRef = useRef<FlashList<Task> | null>(null);

  const [completionStatus, setCompletionStatus] = useState<
    Record<string, boolean>
  >({});

  function handleTaskAdd() {
    if (taskName.trim() === "") {
      return;
    }

    // Gerar um ID único usando timestamp + número aleatório
    const newId =
      Date.now().toString() + Math.random().toString(36).substr(2, 5);

    const newTask = {
      id: newId,
      name: taskName,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setTaskName("");

    // Inicializar status de conclusão para nova tarefa
    setCompletionStatus((prev) => ({
      ...prev,
      [newId]: false,
    }));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newTimeLeft: Record<string, number> = {};

      tasks.forEach((task) => {
        if (task.completeAt) {
          const elapsedTime = (now - task.completeAt) / (1000 * 60 * 60);
          const hoursLeft = Math.max(0, Math.floor(10 - elapsedTime));
          newTimeLeft[task.id] = hoursLeft;

          if (hoursLeft === 0) {
            handleTaskRemove(task.id);
          }
        }
      });
      setTimeLeft(newTimeLeft);
    }, 600000);

    return () => clearInterval(interval);
  }, [tasks]);

  function handleTaskRemove(id: string) {
    // Remover a tarefa do array de tarefas imediatamente
    setTasks((prevState) => prevState.filter((task) => task.id !== id));

    // Remover do status de conclusão
    setCompletionStatus((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  function handleCompletionChange(id: string, isCompleted: boolean) {
    setCompletionStatus((prev) => {
      const newStatus = { ...prev, [id]: isCompleted };

      if (isCompleted) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completeAt: Date.now() } : task
          )
        );
      } else {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completeAt: undefined } : task
          )
        );
      }

      return newStatus;
    });
  }

  // Atualizar contagem de tarefas concluídas quando o status de conclusão muda
  useEffect(() => {
    const completed = Object.values(completionStatus).filter(
      (status) => status === true
    ).length;
    setCompletedCount(completed);
  }, [completionStatus]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#131313e6" }}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
            height: 170,
            backgroundColor: "#0f536ee6",
          }}
        >
          <MaterialIcons
            name="add-task"
            size={42}
            style={{ marginTop: 32, color: "white" }}
          />
          <Text style={styles.title}>To Do</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "#131313e6" }}>
          <View style={styles.container}>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Task name"
                placeholderTextColor={"#5c7685"}
                keyboardType="default"
                value={taskName}
                onChangeText={setTaskName}
              />
              <TouchableOpacity style={styles.button} onPress={handleTaskAdd}>
                <AntDesign name="pluscircleo" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <ProgressBar completed={completedCount} total={tasks.length} />
            <View style={{ flex: 1, width: "100%" }}>
              <FlashList
                data={tasks}
                estimatedItemSize={50}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Participant
                    name={item.name}
                    id={item.id}
                    onRemove={() => handleTaskRemove(item.id)}
                    onCompletionChange={(isCompleted) =>
                      handleCompletionChange(item.id, isCompleted)
                    }
                    initialCompleted={completionStatus[item.id] || false}
                    hoursLeft={
                      completionStatus[item.id] ? timeLeft[item.id] : undefined
                    }
                  />
                )}
                extraData={{ tasks, completionStatus }}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                ListEmptyComponent={() => (
                  <>
                    <FontAwesome6
                      name="list"
                      size={32}
                      color="#b5b5b5a4"
                      alignSelf="center"
                    />
                    <Text
                      style={{ ...styles.listEmptyText, color: "#b5b5b5a4" }}
                    >
                      There are no tasks yet. Add one above!
                    </Text>
                  </>
                )}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
