import { useState, useRef, useEffect, FormEvent } from 'react';
import cn from 'classnames';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	font: OptionType;
	setFont: (a: OptionType) => void;

	fontSize: OptionType;
	setFontSize: (a: OptionType) => void;

	fontColor: OptionType;
	setFontColor: (a: OptionType) => void;

	bgColor: OptionType;
	setBgColor: (a: OptionType) => void;

	contentWidth: OptionType;
	setContentWidth: (a: OptionType) => void;

	onResetClick: () => void;
	onSubmitClick: () => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const [isOpened, setIsOpened] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleOutsideClick = (evt: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(evt.target as Node)) {
				setIsOpened(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const handleArrowButtonClick = () => setIsOpened((prevState) => !prevState);
	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		props.onSubmitClick();
	};

	const setSelected = (
		selected: OptionType,
		setStateCb: (o: OptionType) => void
	) => {
		setStateCb(selected);
	};

	const containerStyle = cn(
		styles.container,
		isOpened ? styles.container_open : styles.container
	);
	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={handleArrowButtonClick} />
			<aside className={containerStyle} ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={props.font}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) => {
							setSelected(selected, props.setFont);
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name='radioFonts'
						options={fontSizeOptions}
						selected={props.fontSize}
						title='размер шрифта'
						onChange={(selected: OptionType) => {
							setSelected(selected, props.setFontSize);
						}}
					/>
					<Select
						selected={props.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) => {
							setSelected(selected, props.setFontColor);
						}}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.bgColor}
						options={backgroundColors}
						onChange={(selected: OptionType) => {
							setSelected(selected, props.setBgColor);
						}}
						title='цвет фона'
					/>
					<Select
						selected={props.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) => {
							setSelected(selected, props.setContentWidth);
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
