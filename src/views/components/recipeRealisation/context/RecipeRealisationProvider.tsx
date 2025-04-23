import {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DrawerScreenViewProps,
  RecipeModelResponse,
  Routes,
  RealisationEvent,
  EventData,
} from "@models";
import { getCurrentRealisation, getRecipe } from "@services";
import { useAppContext } from "@hooks";

import { RECIPE_REALISATION_STEP } from "./recipeRealisationStep.ts";

/**
 * Recipe realisation context provider props.
 */
type RecipeRealisationContextProviderProps = {
  children: ReactElement;
  recipe: RecipeModelResponse | undefined;
  navigation: DrawerScreenViewProps<Routes.RECIPE_REALISATION>["navigation"];
};

/**
 * Recipe realisation context values.
 */
type RecipeRealisationContextValues = {
  isRecipeStarted: boolean;
  setCurrentEvent: <D extends EventData>(event: RealisationEvent<D>) => void;
  getCurrentEvent: <D extends EventData>() => RealisationEvent<D>;
  stepTitle: string;
  isLastStep: boolean;
  StepComponent: () => ReactElement;
  nextStep: () => Promise<boolean>;
  setError: () => void;
  recipe: RecipeModelResponse | undefined;
  navigation: DrawerScreenViewProps<Routes.RECIPE_REALISATION>["navigation"];
};

const RecipeRealisationContext = createContext<RecipeRealisationContextValues>(
  {} as RecipeRealisationContextValues,
);

/**
 * Recipe realisation context provider.
 */
function RecipeRealisationProvider({
  children,
  navigation,
  recipe,
}: RecipeRealisationContextProviderProps) {
  const [currentRecipe, setCurrentRecipe] = useState<RecipeModelResponse>();
  const [currentEvent, setCurrentEvent] = useState<
    RealisationEvent<EventData> | null | undefined
  >(undefined);
  const { authToken } = useAppContext();

  // Check if a current realisation already in process,
  // or if a recipe was provided to start one.
  useEffect(() => {
    getCurrentRealisation(authToken)
      .then((current) => {
        if (!(current.length > 0 || recipe))
          navigation.navigate(Routes.RECIPES, {});

        if (current.length > 0) setCurrentEvent(current[0]);
      })
      .catch(() => {
        // setError();
        setCurrentEvent(null);
      });
    // Need to only execute at component mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentEvent) {
      getRecipe(currentEvent.event.recipeID)
        .then((recipeResponse) => setCurrentRecipe(recipeResponse))
        .catch(() => setError());
    } else setCurrentRecipe(recipe);
  }, [currentEvent, recipe]);

  const step = useMemo(() => {
    if (currentEvent === null) return RECIPE_REALISATION_STEP.length - 1;
    else if (currentEvent) return currentEvent.event.order + 1;

    return 0;
  }, [currentEvent]);

  const value: RecipeRealisationContextValues = {
    isRecipeStarted: !!currentEvent,
    setError,
    setCurrentEvent: setEvent,
    getCurrentEvent: getEvent,
    stepTitle: RECIPE_REALISATION_STEP[step].stepTitle,
    StepComponent: RECIPE_REALISATION_STEP[step].stepComponent,
    isLastStep: step === RECIPE_REALISATION_STEP.length - 2,
    nextStep,
    navigation,
    recipe: currentRecipe,
  };

  return (
    <RecipeRealisationContext.Provider value={value}>
      {children}
    </RecipeRealisationContext.Provider>
  );

  /* Methods */
  function setError() {
    setCurrentEvent(null);
  }

  /**
   * Set current realisation event.
   */
  function setEvent<D extends EventData>(event: RealisationEvent<D>) {
    setCurrentEvent(event);
  }

  /**
   * Get current realisation event.
   */
  function getEvent<D extends EventData>(): RealisationEvent<D> {
    return currentEvent as RealisationEvent<D>;
  }

  /**
   * Next realisation step.
   */
  async function nextStep(): Promise<boolean> {
    try {
      const event = await RECIPE_REALISATION_STEP[step].next(
        String(currentRecipe?._id),
        authToken,
      );

      if (event) setEvent(event as RealisationEvent<EventData>);

      return true;
    } catch (e) {
      setError();
      return false;
    }
  }
}

/* Exports */
export { RecipeRealisationProvider, RecipeRealisationContext };
