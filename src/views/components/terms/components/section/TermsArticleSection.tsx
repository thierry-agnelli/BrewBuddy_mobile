import { View, Text } from "react-native";
import { styles } from "./TermArticleSection.style";

/**
 * Models
 */

type TermsArticleSectionProps = {
  title?: string;
  titleIndex: number;
  children: string;
};

/**
 * Article terms.
 *
 * @returns {JSX.Element} : The component.
 */
function TermsArticleSection({
  title,
  titleIndex,
  children,
}: TermsArticleSectionProps) {
  return (
    <View style={styles.articleSection}>
      {title ? (
        <Text
          style={styles.articleSubTitle}
          testID={"section-title"}
        >{`${titleIndex}. ${title}`}</Text>
      ) : null}
      <Text testID={"section-content"}>{children}</Text>
    </View>
  );
}

/* Exports */
export { TermsArticleSection };
