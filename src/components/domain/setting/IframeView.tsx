import 'react-notion/src/styles.css';

import { NotionRenderer } from 'react-notion';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useNotionPage } from '../../../api/notion';
import ProgressBar from '../../common/ProgressBar';

const iframeData: { [key: string]: string } = {
  locationAgreement: '53817fd469a24dcb8ca2f1094002a39c',
  privacy: '077c4410b0964540b09bc735bdb93634',
  library: '2e50ba5f720b4d77a9a7c1e84b529867',
};

const IframeView = () => {
  const params = useParams();
  const name = params.tabname ?? '';

  const { data, isLoading } = useNotionPage(iframeData[name]);

  return (
    <>
      {isLoading || data === undefined ? (
        <ProgressBar />
      ) : (
        <StyledWrapper>
          <NotionRenderer blockMap={data} fullPage={true} hideHeader={true} />
        </StyledWrapper>
      )}
    </>
  );
};

export default IframeView;

const StyledWrapper = styled.div`
  height: 100%;
  padding: 0px 20px 80px;
  background-color: #fff;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
