import { View, Text } from "react-native";
import { styles } from "./TermArticle.style";

/**
 * Models
 */

type TermsArticleProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

/**
 * Article terms.
 *
 * @returns {JSX.Element} : The component.
 */
function TermsArticle({ title, children }: TermsArticleProps) {
  return (
    <View style={styles.article}>
      <Text style={styles.articleTitle} testID={"article-title"}>
        {title}
      </Text>
      {children}
    </View>
  );
}

/* Exports */
export { TermsArticle };
