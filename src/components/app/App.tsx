import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from '../../constants/articleProps';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export function App() {
	const [selectedStyles, setSelectedStyles] = useState({
		font: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		bgColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	const handleFormSubmit = (
		font: OptionType,
		fontSize: OptionType,
		fontColor: OptionType,
		bgColor: OptionType,
		contentWidth: OptionType
	) => {
		setSelectedStyles({
			font: font.value,
			fontSize: fontSize.value,
			fontColor: fontColor.value,
			bgColor: bgColor.value,
			contentWidth: contentWidth.value,
		});
	};

	const resetForm = () => {
		setSelectedStyles({
			font: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			bgColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': selectedStyles.font,
					'--font-size': selectedStyles.fontSize,
					'--font-color': selectedStyles.fontColor,
					'--container-width': selectedStyles.contentWidth,
					'--bg-color': selectedStyles.bgColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmitClick={handleFormSubmit}
				onResetClick={resetForm}
			/>
			<Article />
		</main>
	);
}
