import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { DrawerScreenViewProps, Routes, UserRoles } from "@models";
import { Button, Text } from "@components";
import { useAppContext } from "@hooks";
import { profile, rightArrow, bookmark } from "@assets";
import { firstCharUpperCase } from "@utils";
import { premadeClasses } from "@helpers";

import {
  ResetPasswordModal,
  DeleteAccountModal,
  UpdateProfileModal,
} from "./components/";

import { styles } from "./Profile.style";

/**
 * Profile view.
 */
function Profile(props: DrawerScreenViewProps<Routes.PROFILE>) {
  const {
    user: { email, pseudo, role, roleName },
  } = useAppContext();

  const [isPasswordModalVisible, setIsPasswordModalVisible] =
    useState<boolean>(false);
  const [isUpdateProfileModalVisible, setIsUpdateProfileModalVisible] =
    useState<boolean>(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState<boolean>(false);

  const { layout, viewContent } = premadeClasses;

  return (
    <View style={[layout, styles.profile]} testID={"profile"}>
      <View style={styles.profileHeader}>
        <View style={styles.profileIconBox}>
          <Image source={profile} style={styles.profileIcon} />
        </View>
        <View style={styles.profileHeaderInfo}>
          <Text style={viewContent.title}>{firstCharUpperCase(pseudo)}</Text>
          <Text style={styles.role}>
            {role >= UserRoles.PREMIUM ? firstCharUpperCase(roleName) : null}
          </Text>
        </View>
      </View>
      <View style={styles.profileContent}>
        <ProfileSeparator />
        <ScrollView>
          <View style={styles.contentElement}>
            <Text style={styles.elementTitle}>Mes informations</Text>
            <Text>Email: {email}</Text>
          </View>
          <View style={styles.contentElement}>
            <View style={styles.updateProfile}>
              <Button
                title={"Réinitialiser le mot de passe"}
                style={{
                  button: styles.profileButton,
                  title: styles.profileButtonTitle,
                }}
                testID={"reset-password-modal-button"}
                onPress={() => setIsPasswordModalVisible(true)}
              />
              <Button
                title={"Modifier mon profil"}
                style={{
                  button: styles.profileButton,

                  title: styles.profileButtonTitle,
                }}
                testID={"update-profile-modal-button"}
                onPress={() => setIsUpdateProfileModalVisible(true)}
              />
            </View>
            <View style={styles.deleteProfile}>
              <Button
                title={"Supprimer mon compte"}
                style={{
                  button: styles.deleteButton,
                  title: styles.deleteButtonTitle,
                }}
                testID={"delete-account-modal-button"}
                onPress={() => setIsDeleteAccountModalVisible(true)}
              />
            </View>
          </View>
          <ProfileSeparator />
          <View style={styles.recipeElement}>
            <Text style={styles.elementTitle}>Mon historique de recettes</Text>
            <TouchableOpacity style={styles.recipeLinkBox}>
              <Image source={rightArrow} style={styles.recipeLinkIcon} />
              <Text>Ma recette 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recipeLinkBox}>
              <Image source={rightArrow} style={styles.recipeLinkIcon} />
              <Text>Ma recette 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recipeLinkBox}>
              <Image source={rightArrow} style={styles.recipeLinkIcon} />
              <Text>Ma recette 3</Text>
            </TouchableOpacity>
          </View>
          <ProfileSeparator />
          <View style={styles.recipeElement}>
            <Text style={styles.elementTitle}>Mes favoris</Text>
            <TouchableOpacity style={styles.recipeLinkBox}>
              <Image source={bookmark} style={styles.recipeBookmarkIcon} />
              <Text>Recette favorite 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recipeLinkBox}>
              <Image source={bookmark} style={styles.recipeBookmarkIcon} />
              <Text>Recette favorite 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recipeLinkBox}>
              <Image source={bookmark} style={styles.recipeBookmarkIcon} />
              <Text>Recette favorite 3</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ResetPasswordModal
        isVisible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
      />
      <UpdateProfileModal
        isVisible={isUpdateProfileModalVisible}
        onClose={() => setIsUpdateProfileModalVisible(false)}
      />
      <DeleteAccountModal
        isVisible={isDeleteAccountModalVisible}
        onClose={() => setIsDeleteAccountModalVisible(false)}
        navigation={props.navigation}
      />
    </View>
  );
}

/**
 * Profile Separator.
 */
function ProfileSeparator() {
  return <View style={styles.separator} />;
}

/* Exports */
export { Profile };
