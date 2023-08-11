import { mockBasicOptions, mockTrims } from '@/assets/mock/mock';
import * as Icon from '../../assets/icons';
import BasicOptionBox from './BasicOptionBox';
import CarsImageBox from './CarsImageBox';
import CarsNameListBox from './CarsNameListBox';
import GuideModeButton from './GuideModeButton';
import MainOptionBox from './MainOptionBox';
import MakingCarButtonsBox from './MakingCarButtonsBox';
import TrimCarsBox from './TrimCardsBox';
import InternalColorBox from './InternalColorBox';
import ExteriorColorBox from './ExteriorColorBox';

const TEXT_MAKING_MY_CAR = '내 차 만들기';
const TEXT_PALISADE = 'PALISADE';
const TEXT_MAIN_DETAIL_COMPARE = '자세한 설명과 비교를 원한다면';

function Home() {
  const basicOptionLists = [
    mockBasicOptions,
    mockBasicOptions,
    mockBasicOptions,
    mockBasicOptions,
  ];
  return (
    <div>
      <div className="flex justify-center w-full h-screen bg-center bg-cover pt-85px bg-main-background-image">
        <div className="flex flex-col justify-between px-128px max-w-7xl py-16px">
          <div>
            <p className="text-white text-24px font-hsans-head tracking-[-0.96px] leading-[31.2px]">
              {TEXT_MAKING_MY_CAR}
            </p>
            <p className="font-medium text-white text-64px font-hsans-head leading-[83.2px]">
              {TEXT_PALISADE}
            </p>
          </div>

          <div>
            <TrimCarsBox trims={mockTrims} />
            <div className="flex flex-col items-center">
              <p className="text-white opacity-60 title mt-24px">
                {TEXT_MAIN_DETAIL_COMPARE}
              </p>

              <div className="relative flex flex-col items-center top-12px animate-bounce">
                <Icon.MainBelowArrow opacity={0.8} />
                <Icon.MainBelowArrow
                  opacity={0.4}
                  className="relative bottom-18px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mb-400px">
        <CarsNameListBox trims={mockTrims} />
        <div className="flex flex-col m-auto max-w-7xl pt-32px gap-60px px-128px">
          <CarsImageBox trims={mockTrims} />
          <div className="flex flex-col gap-48px">
            <MainOptionBox trims={mockTrims} />
            <ExteriorColorBox trims={mockTrims} />
            <InternalColorBox trims={mockTrims} />
            <BasicOptionBox basicOptionLists={basicOptionLists} />
            <MakingCarButtonsBox />
            <GuideModeButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
