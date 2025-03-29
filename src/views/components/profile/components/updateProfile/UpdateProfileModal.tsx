import { useRef, useState } from "react";
import { View } from "react-native";

import { Button, Text, Modal, Input } from "@components";
import {
  BaseUser,
  ChangeTextEvent,
  ModalContentProps,
  UserRoles,
} from "@models";
import { premadeClasses } from "@helpers";
import { useAppContext, useAuthentication } from "@hooks";
import { circle } from "@assets";
import { updateUser } from "@services";

import { styles } from "./UpdateProfileModal.styles.ts";

/**
 * Reset password modal props.
 */
type ResetPasswordModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

/**
 * Update profile model.
 */
type UpdateProfileModel = Omit<BaseUser, "password"> & {
  pseudo: string;
};

/**
 * Reset password modal component.
 */
function UpdateProfileModal(props: ResetPasswordModalProps) {
  const { isVisible, onClose } = props;

  return (
    <Modal
      isVisible={isVisible}
      contentFactory={ModalContent}
      onClose={onClose}
    />
  );
}

/**
 * Modal content.
 */
function ModalContent(props: ModalContentProps) {
  const { closeModal } = props;

  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const userInfoRef = useRef<UpdateProfileModel>({
    email: "",
    pseudo: "",
  });

  const context = useAppContext();
  const { id } = useAuthentication();

  const { viewContent } = premadeClasses;

  return (
    <View
      style={[viewContent.formCard, styles.updateProfileModal]}
      testID={"update-profile-modal"}
    >
      <Text style={viewContent.title}>Modifier le profil</Text>
      <View style={styles.modalContent}>
        <Input
          label={"Email"}
          name={"email"}
          onChangeText={onInputChangeHandler}
          testID={"email-input"}
        />
        <Input
          label={"Pseudo"}
          name={"pseudo"}
          onChangeText={onInputChangeHandler}
          testID={"pseudo-input"}
        />
        <Text style={styles.errorMessage} testID={"error-message"}>
          {errorMessage}
        </Text>
        <Button
          title={!isRequesting ? "Mettre à jour" : undefined}
          icon={isRequesting ? circle : undefined}
          disabled={isRequesting}
          style={{ button: viewContent.bottomPageButton }}
          onPress={onUpdateButtonPressHandler}
          testID={"update-button"}
        />
      </View>
    </View>
  );

  /* Events */

  /**
   * on input change handler.
   */
  function onInputChangeHandler(event: ChangeTextEvent) {
    const { name, value } = event;
    const userInfo = userInfoRef.current;

    userInfo[name as keyof typeof userInfo] = value;
  }

  /**
   * On update profile button press handler.
   */
  function onUpdateButtonPressHandler() {
    setIsRequesting(true);
    updateUser(id, userInfoRef.current, context.authToken)
      .then((user) => {
        setErrorMessage("");
        context.user = {
          ...user,
          role: UserRoles[user.role],
          roleName: user.role,
        };
        closeModal();
      })
      .catch((error) => setErrorMessage(error))
      .finally(() => setIsRequesting(false));
  }
}

/* Exports */
export { UpdateProfileModal };
