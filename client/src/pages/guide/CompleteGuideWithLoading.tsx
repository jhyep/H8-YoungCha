import { useState, useEffect } from 'react';
import { LOADING_DURATION } from '../making/loading/constant';
import Loading from '../making/loading';
import CompleteGuide from './CompleteGuide';
import { keywordId } from './constant';
import { AllGuideOptionType } from '@/types/option';
import { get } from '@/service';
import useSelectOption from '@/hooks/useSelectOption';
import { optionTypeName } from '@/constant';
import { useLocation } from 'react-router-dom';
import { AgeType, GenderType } from './type';
import { setStorage } from '@/utils/optionStorage';

const TRIM_ID = 2;

function CompleteGuideWithLoading() {
  const [isTimerEnd, setIsTimerEnd] = useState(false);
  const [isRequestEnd, setIsRequestEnd] = useState(false);

  const {
    state: { selectedAge, selectedGender, selectedKeyword },
  }: {
    state: {
      selectedAge: AgeType | null;
      selectedGender: GenderType | null;
      selectedKeyword: string[];
    };
  } = useLocation();

  const { saveOptionData } = useSelectOption();

  function filterContextOptions(options: AllGuideOptionType[]) {
    const filteredOptions = options.filter((option) => option.checked);

    const newOptions = filteredOptions.map((option) => {
      return {
        name: option.name,
        price: option.price,
        imgUrl: option.images[0].imgUrl,
        categoryId: option.categoryId,
        type: optionTypeName[option.categoryId],
        id: option.id,
      };
    })[0];

    return newOptions;
  }

  async function getUserGuideOptions() {
    const params = {
      age: keywordId[selectedAge!],
      gender: keywordId[selectedGender!],
      keyword1Id: keywordId[selectedKeyword[0] as keyof typeof keywordId],
      keyword2Id: keywordId[selectedKeyword[1] as keyof typeof keywordId],
      keyword3Id: keywordId[selectedKeyword[2] as keyof typeof keywordId],
      exteriorColorId: '',
    };

    const exterirColorData = await get<AllGuideOptionType[]>({
      url: `/car-make/${TRIM_ID}/guide/exterior-color`,
      params: params,
    });
    params.exteriorColorId = String(
      exterirColorData?.filter((data) => data.checked)[0].id
    );

    const urls = [
      {
        url: `/car-make/${TRIM_ID}/guide/wheel`,
        params,
      },
      {
        url: `/car-make/${TRIM_ID}/guide/power-train`,
        params,
      },
      {
        url: `/car-make/${TRIM_ID}/guide/options`,
        params,
      },
      {
        url: `/car-make/${TRIM_ID}/guide/interior-color`,
        params,
      },
      {
        url: `/car-make/${TRIM_ID}/guide/driving-system`,
        params,
      },
      {
        url: `/car-make/${TRIM_ID}/guide/body-type`,
        params,
      },
    ];

    setStorage({
      key: 'keywords',
      value: params,
    });
    const options = await Promise.all(
      urls.map(({ url, params }) => get<AllGuideOptionType>({ url, params }))
    );
    return [...options, exterirColorData];
  }

  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setIsTimerEnd(true);
    }, LOADING_DURATION);

    (async () => {
      const userGuideOptions =
        (await getUserGuideOptions()) as AllGuideOptionType[][];

      userGuideOptions.forEach((option) => {
        const filteredOptions = filterContextOptions(option);
        saveOptionData({ newOption: filteredOptions });
      });
      setIsRequestEnd(true);
    })();
    return () => clearTimeout(loadingTime);
  }, []);

  return (
    <div className="flex flex-grow h-full">
      {isTimerEnd && isRequestEnd ? <CompleteGuide /> : <Loading />}
    </div>
  );
}

export default CompleteGuideWithLoading;
