import Breadcrumb from '../components/Breadcrumb.tsx';
import ChartOne from '../components/ChartOne.tsx';

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
      </div>
    </>
  );
};

export default Chart;
