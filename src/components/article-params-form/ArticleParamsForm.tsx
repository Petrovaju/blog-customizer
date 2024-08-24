import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	onResetClick: () => void;
	onSubmitClick: (
		f: OptionType,
		fs: OptionType,
		fc: OptionType,
		bg: OptionType,
		cw: OptionType
	) => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const [isMenuOpen, setisMenuOpen] = useState(false);
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
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		const handleOutsideClick = (evt: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(evt.target as Node)) {
				setisMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const handleArrowButtonClick = () => setisMenuOpen((prevState) => !prevState);
	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		props.onSubmitClick(font, fontSize, fontColor, bgColor, contentWidth);
	};

	const containerStyle = clsx(
		styles.container,
		isMenuOpen && styles.container_open
	);
	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleArrowButtonClick} />
			<aside className={containerStyle} ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={font}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) => {
							setFont(selected);
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name='radioFonts'
						options={fontSizeOptions}
						selected={fontSize}
						title='размер шрифта'
						onChange={(selected: OptionType) => {
							setFontSize(selected);
						}}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={(selected: OptionType) => {
							setFontColor(selected);
						}}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={bgColor}
						options={backgroundColors}
						onChange={(selected: OptionType) => {
							setBgColor(selected);
						}}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) => {
							setContentWidth(selected);
						}}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={props.onResetClick}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
