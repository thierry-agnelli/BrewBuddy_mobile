import { useEffect } from "react";
import { Image, View } from "react-native";

import { DrawerScreenViewProps, Routes, UserRoles } from "@models";
import { Banner, Button, Text } from "@components";
import { premadeClasses } from "@helpers";
import { getUser } from "@services";
import { tank } from "@assets";
import { useAuthentication, useAppContext } from "@hooks";

/**
 * Home View.
 *
 * @param {DrawerScreenViewProps} props : View props.
 *
 * @returns {JSX.Element} : The component.
 */
function Home(props: DrawerScreenViewProps<Routes.HOME>) {
  const { navigation } = props;

  const context = useAppContext();
  const { id } = useAuthentication();

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(id, context.authToken || "");
        context.user = {
          ...user,
          role: UserRoles[user.role],
          roleName: user.role,
        };
      } catch (e) {}
    })();
  }, [context, context.authToken, id]);

  const { layout, viewContent } = premadeClasses;

  /* Render */
  return (
    <View style={layout} testID="home-view">
      <Banner />
      <View style={viewContent.layout}>
        <View style={viewContent.titleBox}>
          <Text style={viewContent.title}>Découvrez notre kit de brassage</Text>
        </View>
        <View style={viewContent.pictureBox}>
          <Image source={tank} style={viewContent.picture} />
        </View>
        <View style={viewContent.textBox}>
          <Text style={viewContent.text}>
            Notre boîtier IoT est l&apos;outil essentiel pour les brasseurs à
            domicile.
          </Text>
          <Text style={viewContent.text}>
            Conçu pour faciliter et optimiser le processus de brassage de la
            bière, il intègre des capteurs qui mesurent précisément les
            conditions essentielles telles que la température et le temps.
          </Text>
          <Text style={viewContent.text}>
            Le boîtier communique avec votre application mobile pour offrir des
            conseils et des alertes en temps réel, assurant ainsi une précision
            parfaite à chaque étape, de l&apos;empâtage à la fermentation.
          </Text>
          <Text style={viewContent.text}>
            Cet outil s&apos;adresse aussi bien aux novices qu&apos;aux
            brasseurs expérimentés désireux de perfectionner leur artisanat.
          </Text>
        </View>
        <View style={viewContent.bottomPageButtonBox}>
          <Button
            title="Plus d'informations"
            onPress={onPressHandler}
            testID="navigate-button"
            style={{ button: viewContent.bottomPageButton }}
          />
        </View>
      </View>
    </View>
  );

  /* Handlers */

  /**
   * Button pressed handler.
   */
  function onPressHandler() {
    navigation.navigate(Routes.LEXICON, {});
  }
}

/* Exports */
export { Home };
