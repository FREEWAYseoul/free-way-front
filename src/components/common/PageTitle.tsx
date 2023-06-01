type PageTitleProps = {
  upperLine: string;
  lowerLine: string;
};

const PageTitle = ({ upperLine, lowerLine }: PageTitleProps) => {
  return (
    <div id='pageTitle'>
      <h1>{upperLine}</h1>
      <h1>{lowerLine}</h1>
    </div>
  );
};

export default PageTitle;
