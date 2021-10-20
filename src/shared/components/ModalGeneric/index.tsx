import { IoMdCheckmark, IoMdClose, IoMdExit } from 'react-icons/io';
import { Colors } from '../../styles/colors';
import * as S from './styles';

type Icon = 'logout' | 'success' | 'fail';

interface IModalLogout {
  icon: Icon;
  title: string;
  subtitle: string;
  buttonCancel?: boolean;
  textButtonCancel?: string;
  textButtonConfirm?: string;
  actionButtonConfirm: () => void;
  actionButtonCancel?: () => void;
}

export const ModalGeneric = ({
  actionButtonConfirm,
  actionButtonCancel,
  icon,
  title,
  subtitle,
  buttonCancel = false,
  textButtonCancel,
  textButtonConfirm,
}: IModalLogout) => {
  const defineIcon = (type: Icon) => {
    if (type === 'success') {
      return <IoMdCheckmark size={60} color={Colors.primary} />;
    }
    if (type === 'fail') {
      return <IoMdClose size={60} color={Colors.strongRed} />;
    }
    if (type === 'logout') {
      return <IoMdExit size={60} color={Colors.strongRed} />;
    }
  };

  const iconSelected = defineIcon(icon);
  const textButtonCancelFormated = textButtonCancel ?? 'Cancelar';
  const textButtonConfirmFormated = textButtonConfirm ?? 'Confirmar';
  const xsButtonConfirm = buttonCancel ? 6 : 12;

  return (
    <S.Modal open={true}>
      <S.ContentModal>
        <S.DivIcon>{iconSelected}</S.DivIcon>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>
      </S.ContentModal>
      <S.CustomGridContainer container>
        {buttonCancel && (
          <S.CustomGridItem item xs={6}>
            <S.CustomButton colorname={Colors.gray3} onClick={actionButtonCancel} fullWidth>
              {textButtonCancelFormated}
            </S.CustomButton>
          </S.CustomGridItem>
        )}
        <S.CustomGridItem item xs={xsButtonConfirm}>
          <S.CustomButton colorname={Colors.gray1} onClick={actionButtonConfirm} fullWidth>
            {textButtonConfirmFormated}
          </S.CustomButton>
        </S.CustomGridItem>
      </S.CustomGridContainer>
    </S.Modal>
  );
};
