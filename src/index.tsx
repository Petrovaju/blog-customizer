import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [font, setFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [bgColor, setBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const [selectedStyles, setSelectedStyles] = useState({
		font: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		bgColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	const handleFormSubmit = () => {
		setSelectedStyles({
			font: font.value,
			fontSize: fontSize.value,
			fontColor: fontColor.value,
			bgColor: bgColor.value,
			contentWidth: contentWidth.value,
		});
	};

	const resetForm = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setFontSize(defaultArticleState.fontSizeOption);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		setSelectedStyles({
			font: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			bgColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
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
				setFont={setFont}
				font={font}
				setFontColor={setFontColor}
				fontColor={fontColor}
				setFontSize={setFontSize}
				fontSize={fontSize}
				setContentWidth={setContentWidth}
				contentWidth={contentWidth}
				setBgColor={setBgColor}
				bgColor={bgColor}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
