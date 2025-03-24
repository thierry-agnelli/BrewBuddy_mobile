import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "@components";

import { TermsArticle } from "./article/TermsArticle";
import { TermsArticleSection } from "./section/TermsArticleSection";
import { premadeClasses } from "@helpers";
import { styles } from "./Terms.style";
import { terms } from "./models/terms";
import { TermsData } from "./models/terms";
import { DrawerScreenViewProps, Routes } from "@models";
import { useAppContext } from "@hooks";

type TermsProps = DrawerScreenViewProps<
  Routes.TERMS_OF_USE | Routes.TERMS_OF_SALE
> & { term: keyof TermsData };

/**
 * Terms of uses View.
 */
function Terms(props: TermsProps) {
  const { navigation, term } = props;
  const { layout, viewContent } = premadeClasses;

  /* Context */
  const { goBackNavigation } = useAppContext();

  return (
    <View style={layout} testID={"terms"}>
      <TouchableOpacity
        style={styles.goBackBox}
        onPress={goBackPressHandler}
        testID={"goBack-button"}
      >
        <Text style={styles.goBack}>Retour</Text>
      </TouchableOpacity>
      <View style={viewContent.titleBox}>
        <Text style={viewContent.title}>{terms[term].viewTitle}</Text>
      </View>
      <View style={styles.scroll}>
        <ScrollView>
          {terms[term].content.map((article, articleIndex) => (
            <TermsArticle
              title={`Article ${articleIndex + 1} - ${article.title}`}
              key={`article-${articleIndex}`}
            >
              {article.sections.map((section, sectionIndex) => (
                <TermsArticleSection
                  title={section.title}
                  titleIndex={sectionIndex + 1}
                  key={`section-${sectionIndex + 1}`}
                >
                  {section.content}
                </TermsArticleSection>
              ))}
            </TermsArticle>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  /**
   * Go back handler.
   */
  function goBackPressHandler() {
    goBackNavigation(navigation);
  }
}

/* Exports */
export { Terms };
