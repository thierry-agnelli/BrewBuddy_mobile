import { useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Banner,
  Button,
  CheckBox,
  CheckBoxProps,
  Input,
  InputProps,
  Text,
} from "@components";
import { register } from "@services";
import { premadeClasses, REGEXP } from "@helpers";
import {
  ChangeEvent,
  DrawerScreenViewProps,
  Form,
  FormErrorClasses,
  FormProps,
  Routes,
} from "@models";
import { fieldValidation } from "@utils";
import { circle } from "@assets";

import { styles } from "./Register.style";

/* Models */

/**
 * Successful register.
 */
type SuccessfullRegisterType = {
  onPress: () => void;
};

/**
 * Register View.
 */
function Register(props: DrawerScreenViewProps<Routes.REGISTER>) {
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

  // Input list
  const textInputsProps = useMemo<FormProps<InputProps<"default">>[]>(
    () => [
      {
        label: "Nom d'utilisateur",
        name: "username",
        placeholder: "Entrez votre nom d'utilisateur",
        autoCapitalize: "words",
        required: true,
        style: formErrorClasses.username,
        onChangeText: onFormChangeHandler,
      },
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
      {
        label: "Confirmation mot de passe",
        name: "confirmPassword",
        placeholder: "Confirmation du mot de passe",
        secureTextEntry: true,
        autoCapitalize: "none",
        required: true,
        style: formErrorClasses.confirmPassword,
        onChangeText: onFormChangeHandler,
      },
    ],
    [formErrorClasses],
  );

  const checkBoxProps = useMemo<FormProps<CheckBoxProps>>(
    () => ({
      label: "J'ai lu et j'accepte les CGU",
      name: "cgu",
      style: {
        // label: styles.cguText,
        ...formErrorClasses.cgu,
      },
      required: true,
      onChange: onFormChangeHandler,
    }),
    [formErrorClasses.cgu],
  );

  return (
    <View style={[layout, styles.layout]}>
      {errorMessage !== "Success" ? (
        <>
          <View style={styles.title}>
            <Text style={viewTitle} testID="register-title">
              Créer un compte
            </Text>
          </View>
          <View style={styles.form}>
            {textInputsProps.map((inputProps) => (
              <Input
                key={inputProps.name}
                {...inputProps}
                testID="form-input"
              />
            ))}
            <View style={styles.cgu}>
              <CheckBox {...checkBoxProps} testID="cgu-checkbox" />
              <TouchableOpacity
                style={styles.cguButton}
                onPress={onTermOfUsePressHander}
                testID={"terms-of-use-button"}
              >
                <Text>(</Text>
                <Text style={styles.cguText}>CGU</Text>
                <Text>)</Text>
              </TouchableOpacity>
            </View>
            <Button
              title={!isBtnDisabled ? "Créer un compte" : undefined}
              icon={isBtnDisabled ? circle : undefined}
              disabled={isBtnDisabled}
              animationSpeed={1}
              onPress={onValidatePressHandler}
              testID="register-button"
            />
            <Text style={styles.errorMessage} testID="error-message">
              {errorMessage}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.login}
            onPress={onLoginPressHandler}
            testID="login-button"
          >
            <Text style={styles.loginLink}>{"J'ai déjà un compte"}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <SuccessfulRegistration onPress={onLoginPressHandler} />
      )}
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
   * Login navigation button pressed
   */
  function onLoginPressHandler() {
    setErrorMessage("");
    navigation.navigate(Routes.LOGIN, {});
  }

  /**
   * Terms of use navigation pressed
   */
  function onTermOfUsePressHander() {
    navigation.navigate(Routes.TERMS_OF_USE, {});
  }

  /**
   * Create account button pressed
   */
  function onValidatePressHandler() {
    // Form validation.
    const isValid = validateForm();

    if (!isValid) return;

    setIsBtnDisabled(true);

    const formUser = {
      email: String(formRef.current.mail),
      password: String(formRef.current.password),
      pseudo: String(formRef.current.username),
    };

    register(formUser)
      .then((result) => {
        setErrorMessage(result);
      })
      .catch((error) => setErrorMessage(error))
      .finally(() => setIsBtnDisabled(false));
  }

  /* Methods */

  function validateForm(): boolean {
    const formRefValues = formRef.current;

    const fieldsList = [checkBoxProps, ...textInputsProps].map(
      (inputProps) => inputProps.name,
    );
    let validate = true;
    let error = { field: false, required: false };
    const errorClasses: FormErrorClasses = {};

    for (const field of fieldsList) {
      switch (field) {
        case "username":
          // Check error
          error = fieldValidation(formRefValues[field]);
          break;
        case "mail":
          // Check error
          error = fieldValidation(formRefValues[field], REGEXP.mail);
          break;
        case "password":
          // Check error
          error = fieldValidation(formRefValues[field], REGEXP.password);
          break;
        case "confirmPassword":
          // Check error
          error = {
            field:
              !formRefValues[field] ||
              formRefValues[field] !== formRefValues.password,
            required: !formRefValues[field],
          };
          break;
        case "cgu":
          // Check error
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

/* Sub-components*/
function SuccessfulRegistration(props: SuccessfullRegisterType) {
  const { onPress } = props;
  const { viewTitle } = premadeClasses;

  return (
    <View style={styles.successfulRegistrationLayout}>
      <View style={styles.successFulRegistrationBanner}>
        <Banner />
      </View>
      <View style={styles.successfulRegistration}>
        <Text style={viewTitle}> Félicitation !</Text>
        <Text>Votre compte a bien été crée.</Text>
        <Text>Un email de validation vous a été envoyé.</Text>
        <Button
          title={"Se connecter"}
          onPress={onPress}
          testID="successful-registration-btn"
        />
      </View>
    </View>
  );
}

/* Exports */
export { Register };
