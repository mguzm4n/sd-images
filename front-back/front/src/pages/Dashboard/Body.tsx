import CardEight from '../../components/Cards/CardEight.tsx';
import CardEleven from '../../components/Cards/CardEleven.tsx';
import CardFive from '../../components/Cards/CardFive.tsx';
import CardFour from '../../components/Cards/CardFour.tsx';
import CardNine from '../../components/Cards/CardNine.tsx';
import CardOne from '../../components/Cards/CardOne.tsx';
import CardSeven from '../../components/Cards/CardSeven.tsx';
import CardSix from '../../components/Cards/CardSix.tsx';
import CardTen from '../../components/Cards/CardTen.tsx';
import CardThree from '../../components/Cards/CardThree.tsx';
import CardTwelve from '../../components/Cards/CardTwelve.tsx';
import CardTwo from '../../components/Cards/CardTwo.tsx';
const Body = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
        <CardFive/>
        <CardSix/>
        <CardSeven/>
        <CardEight/>
        <CardNine/>
        <CardTen/>
        <CardEleven/>
        <CardTwelve/>
      </div>
    </>
  );
};

export default Body;
