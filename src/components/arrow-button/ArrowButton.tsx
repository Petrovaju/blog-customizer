import clsx from 'clsx';

import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	onClick?: OnClick;
	isOpen?: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: TArrowButtonProps) => {
	const containerStyle = clsx(
		styles.container,
		isOpen && styles.container_open
	);
	const arrowStyle = clsx(styles.arrow, isOpen && styles.arrow_open);
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerStyle}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowStyle} />
		</div>
	);
};
