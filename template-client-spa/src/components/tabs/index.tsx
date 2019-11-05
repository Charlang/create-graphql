/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const Index = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(235, 236, 240);
      `}
    >
      <div>
        This is a test tabs
      </div>
    </div>
  );
};

export default Index;
