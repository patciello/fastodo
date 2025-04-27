import { styles } from "./styles";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useState, useRef, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Reanimated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type Props = {
  name: string;
  id: string;
  onRemove: () => void;
  onCompletionChange?: (completed: boolean) => void;
  initialCompleted?: boolean;
  hoursLeft?: number;
};

export function Participant({
  name,
  id,
  onRemove,
  onCompletionChange,
  initialCompleted = false,
  hoursLeft,
}: Props) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const swipeableRef = useRef<SwipeableMethods>(null);

  const handleRemove = () => {
    // Chamar onRemove diretamente sem atrasos
    onRemove();
  };

  useEffect(() => {
    return () => {
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
    };
  }, []);

  const safeRemove = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
    // Pequeno atraso para garantir que a animação de fechamento termine
    setTimeout(() => {
      onRemove();
    }, 100);
  };

  const toggleComplete = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    if (onCompletionChange) {
      onCompletionChange(newState);
    }
  };
  const renderRightActions = (
    progress: SharedValue<number>,
    drag: SharedValue<number>,
    swipeable: SwipeableMethods
  ) => {
    const rStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + 50 }],
    }));

    return (
      <View style={styles.container}>
        <Reanimated.View>
          <TouchableOpacity onPress={handleRemove}></TouchableOpacity>
        </Reanimated.View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={(progress, drag) =>
          renderRightActions(progress, drag, swipeableRef.current!)
        }
        rightThreshold={40}
        overshootRight={false}
        onSwipeableOpen={(direction) => {
          if (direction === "right") {
            // Remover o item quando o swipe for aberto para a direita
            handleRemove();
          }
        }}
      >
        <TouchableOpacity
          style={[
            styles.cardContainer,
            isCompleted && styles.completedCardContainer,
          ]}
          onPress={toggleComplete}
        >
          <View style={styles.cardContent}>
            <View style={styles.checkboxContainer}>
              {isCompleted ? (
                <AntDesign
                  name="checkcircle"
                  size={24}
                  color={Colors.dark.tabIconSelected}
                />
              ) : (
                <Entypo
                  name="circle"
                  size={24}
                  style={{ color: Colors.light.tint }}
                />
              )}
            </View>

            <View style={[styles.textContainer]}>
              <Text
                style={isCompleted ? styles.completedName : styles.nameText}
              >
                {name}
              </Text>

              {isCompleted && hoursLeft !== undefined && (
                <Text style={styles.timeLeftText}>
                  {hoursLeft > 0
                    ? `${hoursLeft} in remaining`
                    : "Deleting done in 10 hours"}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
