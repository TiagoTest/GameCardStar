import LoadingSpinner from '../LoadingSpinner';
import * as S from './styles';

interface ModalLoadingSpinnerProps {
	aberto: boolean;
}

export const ModalLoadingSpinner = ({ aberto }: ModalLoadingSpinnerProps) => {
	return (
		<S.ModalCentralizado open={aberto}>
			<>
				<LoadingSpinner />
			</>
		</S.ModalCentralizado>
	);
};
