import { useState, useEffect } from 'react';
import Loading from '../loading';
import { LOADING_DURATION } from '../loading/constant';
import CompleteOptionPage from './CompleteOptionPage';

function CompleteOptionPageWithLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION);
  }, []);

  return (
    <div className="complete-option-page-wrapper h-full">
      {isLoading ? <Loading /> : <CompleteOptionPage />}
    </div>
  );
}

export default CompleteOptionPageWithLoading;
