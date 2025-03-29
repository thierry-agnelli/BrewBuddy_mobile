import { useEffect, useState } from "react";
import { View } from "react-native";

import { Button, Text, Modal } from "@components";
import {
  DrawerScreenViewProps,
  ModalContentProps,
  Routes,
  UserRoles,
} from "@models";
import { premadeClasses } from "@helpers";
import { deleteUser } from "@services";
import { useAppContext, useAuthentication } from "@hooks";
import { circle } from "@assets";

import { styles } from "./DeleteAccountModal.styles.ts";

type ResetPasswordModalProps = Omit<
  DrawerScreenViewProps<Routes.PROFILE>,
  "route"
> & {
  isVisible: boolean;
  onClose: () => void;
};

/**
 * Delete account modal component.
 */
function DeleteAccountModal(props: ResetPasswordModalProps) {
  const { isVisible, onClose, navigation } = props;

  return (
    <Modal
      isVisible={isVisible}
      contentFactory={ModalContent}
      closeButton={false}
      onClose={onClose}
    />
  );

  /**
   * Modal content.
   */
  // Need to render here to have access to navigation.
  // eslint-disable-next-line react/no-unstable-nested-components
  function ModalContent(modalProps: ModalContentProps) {
    const { closeModal } = modalProps;

    const context = useAppContext();
    const { id } = useAuthentication();

    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAccountDeleted, setIsAccountDeleted] = useState<boolean>(false);

    useEffect(() => {
      return () => {
        if (isAccountDeleted) {
          setIsAccountDeleted(false);
        }
      };
    }, [isAccountDeleted]);

    const { viewContent } = premadeClasses;
    return (
      <View
        style={[viewContent.formCard, styles.deleteAccountModal]}
        testID={"delete-account-modal"}
      >
        <Text style={[viewContent.title, styles.modalTitle]}>
          Supprimer le compte
        </Text>
        <View style={styles.modalContent}>
          {!isAccountDeleted ? (
            <>
              <View style={styles.modalMessage}>
                <Text style={styles.modalText}>
                  Attention vous êtes sur le point de
                </Text>
                <Text style={styles.modalText}>supprimer votre compte.</Text>
                <Text style={styles.errorMessage} testID={"error-message"}>
                  {errorMessage}
                </Text>
              </View>
              <View style={styles.modalButtonButtonsBox}>
                <Button
                  title={"Annuler"}
                  style={{ button: styles.modalButton }}
                  testID={"cancel-button"}
                  onPress={closeModal}
                />
                <Button
                  title={!isRequesting ? "Supprimer" : undefined}
                  icon={isRequesting ? circle : undefined}
                  disabled={isRequesting}
                  style={[
                    { button: styles.modalButton },
                    { button: styles.modalDeleteButton },
                  ]}
                  testID={"delete-button"}
                  onPress={onDeletePressHandler}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.modalMessage}>
                <Text>Nous sommes désolés de</Text>
                <Text>vous dire au revoir.</Text>
                <Text>A bientôt avec BrewBuddy</Text>
              </View>
              <Button
                title={"Fermer"}
                style={{ button: viewContent.bottomPageButton }}
                testID={"close-button"}
                onPress={onDeletedClosePressHandler}
              />
            </>
          )}
        </View>
      </View>
    );

    /* Events */

    /**
     * On delete press handler.
     */
    function onDeletePressHandler() {
      setIsRequesting(true);
      deleteUser(id, context.authToken)
        .then(() => {
          setErrorMessage("");
          setIsAccountDeleted(true);
        })
        .catch((error) => setErrorMessage(error))
        .finally(() => setIsRequesting(false));
    }

    /**
     * On close press handler.
     */
    function onDeletedClosePressHandler() {
      context.user = {
        id: 0,
        email: "",
        pseudo: "",
        role: UserRoles.USER,
        roleName: UserRoles[UserRoles.USER] as keyof typeof UserRoles,
        iat: 0,
      };
      context.setAuthToken(null);
      navigation.navigate(Routes.LOGIN, {});

      closeModal();
    }
  }
}

/* Exports */
export { DeleteAccountModal };
