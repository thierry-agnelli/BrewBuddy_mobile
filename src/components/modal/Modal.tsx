import { ReactElement } from "react";
import { Modal as RNModal, View, Image, Pressable } from "react-native";

import { styles } from "./Modal.styles.ts";
import { ModalContentProps } from "@models";
import { close } from "@assets";

/**
 * Reset password modal Props.
 */
type ModalProps = {
  isVisible: boolean;
  contentFactory: (props: ModalContentProps) => ReactElement;
  closeButton?: boolean;
  onClose: () => void;
};

/**
 * Reset password modal component.
 */
function Modal({
  isVisible,
  contentFactory,
  closeButton = true,
  onClose,
}: ModalProps) {
  const ModalChildren = contentFactory;

  return (
    <RNModal visible={isVisible} transparent={true} testID={"modal"}>
      <View style={styles.modal}>
        <View style={styles.closeIconBox}>
          {closeButton && (
            <Pressable
              style={styles.closeIcon}
              onPress={onClose}
              testID={"modal-close-button"}
            >
              <Image source={close} style={styles.closeIcon} />
            </Pressable>
          )}
        </View>
        <ModalChildren closeModal={onClose} />
      </View>
    </RNModal>
  );
}

/* Exports */
export { Modal };
