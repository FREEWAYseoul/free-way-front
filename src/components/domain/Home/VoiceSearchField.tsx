import styled from 'styled-components';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';
import animationDatan from '../../../assets/lotties/purse.json';
import { useSearchContext } from '../Search/SearchContext';
import Lottie from 'lottie-react';

type VoiceSearchProps = {
  keywords: string;
};

const VoiceSearchField = () => {
  const { keywords } = useSearchContext();

  return (
    <VoiceSearchWrapper>
      <Lottie animationData={animationDatan} loop={true} />
      <MicContainer>
        {keywords ? (
          <VoiceSearchText keywords={keywords}>{keywords}</VoiceSearchText>
        ) : (
          <VoiceSearchText keywords={keywords}>듣고 있어요</VoiceSearchText>
        )}
        <MicIcon />
      </MicContainer>
    </VoiceSearchWrapper>
  );
};

export default VoiceSearchField;

const VoiceSearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 372px;
  top: 10%;
`;

const MicContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const VoiceSearchText = styled.div<VoiceSearchProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -300%);
  width: max-content;
  min-width: 120px;
  height: 35px;
  border-radius: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.keywords.length <= 0 ? '#595959' : 'black')};
  padding: 0 10px;
  color: white;
  font-size: 18px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
`;
