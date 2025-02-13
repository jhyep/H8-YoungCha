import { ChevronRight } from '@/assets/icons';
import { Link } from 'react-router-dom';

function GuideModeButton() {
  return (
    <Link to="guide/age">
      <div className="flex justify-center">
        <div className="flex items-center justify-center gap-80px bg-grey-001 w-533px h-90px rounded-6px">
          <p className="title5 text-grey-black">
            무엇을 골라야 할 지 모르겠다면?
          </p>
          <div className="flex items-center gap-8px">
            <p className="text-32px font-hsans-head text-grey-black font-medium tracking-[-0.96px]">
              Guide Mode
            </p>
            <ChevronRight size={36} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GuideModeButton;
