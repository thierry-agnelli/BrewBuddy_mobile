import { View } from "react-native";

import { Button, Text, Modal } from "@components";
import { ModalContentProps } from "@models";
import { premadeClasses } from "@helpers";

import { styles } from "./ResetPasswordModal.styles.ts";
import { useEffect, useState } from "react";

type ResetPasswordModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

/**
 * Reset password modal component.
 */
function ResetPasswordModal(props: ResetPasswordModalProps) {
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

  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (isPasswordReset) {
        setIsPasswordReset(false);
      }
    };
  }, [isPasswordReset]);

  const { viewContent } = premadeClasses;
  return (
    <View
      style={[viewContent.formCard, styles.resetPasswordModal]}
      testID={"reset-password-modal"}
    >
      <Text style={viewContent.title}>Réinitialiser le mot de passe</Text>
      <View style={styles.modalContent}>
        {!isPasswordReset ? (
          <Button
            title={"Réinitialiser"}
            style={{ button: viewContent.bottomPageButton }}
            testID={"reset-button"}
            onPress={() => setIsPasswordReset(true)}
          />
        ) : (
          <>
            <View>
              <Text>Un email de réinitialisation</Text>
              <Text>vous a été envoyé.</Text>
              <Text>Vérifiez votre boîte mail</Text>
            </View>
            <Button
              title={"Fermer"}
              style={{ button: viewContent.bottomPageButton }}
              testID={"close-modal-button"}
              onPress={closeModal}
            />
          </>
        )}
      </View>
    </View>
  );
}

/* Exports */
export { ResetPasswordModal };
