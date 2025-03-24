import { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useAppContext } from "@hooks";
import { Button, CheckBox, Input, InputProps, Text } from "@components";
import { premadeClasses } from "@helpers";
import { storage } from "@utils";
import { authenticate } from "@services";
import {
  ChangeEvent,
  DrawerScreenViewProps,
  Form,
  FormErrorClasses,
  FormProps,
  Routes,
} from "@models";
import { circle } from "@assets";

import { styles } from "./Login.styles";

/**
 * login View.
 */
function Login(props: DrawerScreenViewProps<Routes.LOGIN>) {
  const { navigation } = props;
  const { layout, viewTitle } = premadeClasses;

  /* States */
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [formErrorClasses, setFormErrorClasses] = useState<FormErrorClasses>(
    {},
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  /* Refs */
  const formRef = useRef<Form>({});

  /* Context */
  const { setAuthToken } = useAppContext();

  /* Hooks */

  // Redirect
  useEffect(() => {
    // If authToken redirect to homepage
    storage.getItem("authToken").then((token) => {
      if (token) {
        setAuthToken(token);

        navigation.navigate(Routes.HOME, {});
      }
    });
  }, [navigation, setAuthToken]);

  // Input list
  const textInputs = useMemo<FormProps<InputProps<"default">>[]>(
    () => [
      {
        label: "Adresse email",
        name: "mail",
        placeholder: "Entrez votre email",
        autoCapitalize: "none",
        required: true,
        style: formErrorClasses.mail,
        onChangeText: onFormChangeHandler,
      },
      {
        label: "Mot de passe",
        name: "password",
        placeholder: "Mot de passe",
        secureTextEntry: true,
        autoCapitalize: "none",
        required: true,
        style: formErrorClasses.password,
        onChangeText: onFormChangeHandler,
      },
    ],
    [formErrorClasses],
  );

  const checkBoxProps = useMemo(
    () => ({
      label: "Se Souvenir de moi",
      name: "rememberMe",
      style: {
        label: styles.option,
      },
      onChange: onFormChangeHandler,
    }),
    [],
  );

  return (
    <View style={[layout, styles.layout]}>
      <View style={styles.title}>
        <Text style={viewTitle} testID="login-title">
          Bienvenue
        </Text>
      </View>
      <View style={styles.loginForm}>
        <View style={styles.loginFormInput}>
          {textInputs.map((inputProps) => (
            <Input key={inputProps.name} {...inputProps} testID="form-input" />
          ))}
        </View>
        <View style={styles.loginFormButton}>
          <Button
            title={!isBtnDisabled ? "Connexion" : undefined}
            icon={isBtnDisabled ? circle : undefined}
            disabled={isBtnDisabled}
            animationSpeed={1}
            onPress={onLoginPressHandler}
            testID="login-button"
          />
        </View>
        <View style={styles.loginFormBottom}>
          <CheckBox {...checkBoxProps} testID="remember-me" />
          <TouchableOpacity>
            <Text style={styles.option}>Mot de passe oublié</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.errorMessage} testID="error-message">
            {errorMessage}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onRegisterPressHandler}
          testID="register-button"
          style={styles.registerNavigationBox}
        >
          <Text style={styles.registerNavigation}>
            {"Je n'ai pas de compte"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  /* Handlers */

  /**
   * On form change
   */
  function onFormChangeHandler(e: ChangeEvent) {
    formRef.current[e.name!] = e.value;
  }

  /**
   * Login button pressed
   */
  function onLoginPressHandler() {
    // Form validation.
    const isValid = validateForm();

    if (!isValid) return;

    setIsBtnDisabled(true);

    const userLogin = {
      email: String(formRef.current.mail),
      password: String(formRef.current.password),
    };

    authenticate(userLogin)
      .then(async (token) => {
        if (formRef.current.rememberMe) {
          await storage.setItem("authToken", token);
        }
        setAuthToken(token);
        navigation.navigate(Routes.HOME, {});
      })
      .catch((error) => setErrorMessage(error))
      .finally(() => setIsBtnDisabled(false));
  }

  /**
   * Register navigation button pressed
   */
  function onRegisterPressHandler() {
    navigation.navigate(Routes.REGISTER, {});
  }

  /* Methods */

  function validateForm(): boolean {
    const formRefValues = formRef.current;

    const fieldsList = textInputs.map((inputProps) => inputProps.name);

    let validate = true;
    let error = { required: false, field: false };
    const errorClasses: FormErrorClasses = {};

    for (const field of fieldsList) {
      switch (field) {
        case "mail":
          // Check if undefined
          error = {
            field: !formRefValues[field],
            required: !formRefValues[field],
          };

          break;
        case "password":
          // Check if undefined
          error = {
            field: !formRefValues[field],
            required: !formRefValues[field],
          };
          break;
      }

      // Set error classes
      errorClasses[field] = {
        fieldError: error.field && premadeClasses.fieldError,
        requiredError: error.required && premadeClasses.requiredError,
      };

      validate &&= !error.field;
    }

    setErrorMessage("");
    setFormErrorClasses(errorClasses);

    return validate;
  }
}

/* Exports */
export { Login };
