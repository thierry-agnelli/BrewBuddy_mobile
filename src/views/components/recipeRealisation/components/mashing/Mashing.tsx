import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { Text } from "@components";
import { HeatingEventData } from "@models";
import { premadeClasses } from "@helpers";
import { useTemperatureSimulation } from "@simulation";

import { useRealisationContext } from "../../hooks/useRealisationContext.ts";

import { styles } from "./Mashing.style.ts";

/**
 * Mashing steps.
 */
function Mashing() {
  const [duration, setDuration] = useState<number | undefined>(0);

  const { getCurrentEvent } = useRealisationContext();
  const currentEvent = getCurrentEvent<HeatingEventData>();

  useEffect(() => {
    setDuration((currentEvent.event.data.duration || 0) * 60);
  }, [currentEvent.event.data.duration]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (duration)
      timeoutId = setTimeout(() => {
        setDuration(duration - 1);
      }, 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [duration]);

  const formattedDuration = useMemo(() => {
    if (!duration) return "00:00";

    const date = new Date(duration * 1000);
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [duration]);

  const control = useMemo(() => {
    const controlTemp =
      currentEvent.event.data.targetedTemp ||
      currentEvent.event.data.temperature ||
      0;

    return {
      temperature: controlTemp,
      min: controlTemp - 2,
      max: controlTemp + 2,
    };
  }, [
    currentEvent.event.data.targetedTemp,
    currentEvent.event.data.temperature,
  ]);

  const currentTemp = useTemperatureSimulation(control);

  const { viewContent } = premadeClasses;

  return (
    <View style={styles.mashing}>
      <View style={styles.temperaturesBox}>
        <View style={styles.temperatureElement}>
          <Text style={viewContent.text}>Actuelle</Text>
          <Text
            style={[
              styles.value,
              control.min < currentTemp && currentTemp < control.max
                ? styles.withinBounds
                : styles.outOfBounds,
            ]}
          >
            {currentTemp}°C
          </Text>
        </View>
        <View style={styles.temperatureElement}>
          <Text style={viewContent.text}>Cible</Text>
          <Text style={styles.value}>{control.temperature}°C</Text>
        </View>
      </View>
      {currentEvent.event.data.duration !== undefined && (
        <View style={styles.duration}>
          <Text>Durée :</Text>
          <Text style={styles.value}>{formattedDuration}</Text>
        </View>
      )}
    </View>
  );
}

/* Exports */
export { Mashing };
